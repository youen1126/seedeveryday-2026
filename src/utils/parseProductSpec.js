const SPEC_LABELS = [
  { source: "商品分類", key: "category" },
  { source: "販售單位", key: "unit" },
  { source: "主要材質", key: "materials" },
  { source: "掛帶材質", key: "strapMaterial" },
  { source: "尺寸說明", key: "size" },
  { source: "商品特色", key: "features" },
];

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function cleanValue(value) {
  return (value || "").replace(/\r/g, "").trim();
}

function getSectionValue(rawText, label, nextLabels) {
  const safeText = cleanValue(rawText);

  if (!safeText) return "";

  const nextLabelPattern = nextLabels.length
    ? `(?=\\n?\\s*(?:${nextLabels.map(escapeRegExp).join("|")})\\s*[：:])`
    : "";
  const pattern = new RegExp(
    `${escapeRegExp(label)}\\s*[：:]\\s*([\\s\\S]*?)${nextLabelPattern || "$"}`,
  );
  const match = safeText.match(pattern);

  return cleanValue(match?.[1]);
}

function parseMaterials(materialsText) {
  if (!materialsText) return [];

  return materialsText
    .split("、")
    .map((item) => cleanValue(item))
    .filter(Boolean);
}

function parseFeatures(featuresText) {
  if (!featuresText) return [];

  const normalizedText = featuresText
    .replace(/[；;]/g, "\n")
    .replace(/(?:\r?\n)+/g, "\n");
  const lines = normalizedText
    .split("\n")
    .map((item) => cleanValue(item.replace(/^[•●▪■\-－\d.、)\s]+/, "")))
    .filter(Boolean);

  if (lines.length > 1) return lines;

  return normalizedText
    .split("、")
    .map((item) => cleanValue(item.replace(/^[•●▪■\-－\d.、)\s]+/, "")))
    .filter(Boolean);
}

function parseSize(sizeText) {
  const size = {
    macadamiaShell: "",
    walnutShell: "",
    note: "",
  };

  if (!sizeText) return size;

  const noteMatch = sizeText.match(/[（(]([^）)]+)[）)]/);
  if (noteMatch?.[1]) {
    size.note = cleanValue(noteMatch[1]);
  }

  const sizeTextWithoutNote = cleanValue(
    sizeText.replace(/[（(][^）)]*[）)]/g, ""),
  );

  const macadamiaMatch = sizeTextWithoutNote.match(
    /夏威夷豆果殼款\s*[：:]\s*([\s\S]*?)(?=\n?\s*核桃殼款\s*[：:]|$)/,
  );
  const walnutMatch = sizeTextWithoutNote.match(
    /核桃殼款\s*[：:]\s*([\s\S]*?)$/,
  );

  size.macadamiaShell = cleanValue(macadamiaMatch?.[1]);
  size.walnutShell = cleanValue(walnutMatch?.[1]);

  return size;
}

export function parseProductSpec(rawText) {
  const result = {
    category: "",
    unit: "",
    materials: [],
    strapMaterial: "",
    size: {
      macadamiaShell: "",
      walnutShell: "",
      note: "",
    },
    features: [],
  };

  if (typeof rawText !== "string" || !rawText.trim()) {
    return result;
  }

  const sections = SPEC_LABELS.reduce((accumulator, currentLabel, index) => {
    const nextLabels = SPEC_LABELS.slice(index + 1).map((item) => item.source);

    accumulator[currentLabel.key] = getSectionValue(
      rawText,
      currentLabel.source,
      nextLabels,
    );

    return accumulator;
  }, {});

  result.category = sections.category || "";
  result.unit = sections.unit || "";
  result.materials = parseMaterials(sections.materials);
  result.strapMaterial = sections.strapMaterial || "";
  result.size = parseSize(sections.size);
  result.features = parseFeatures(sections.features);

  return result;
}

/*
範例呼叫：

const rawText = `
商品分類：吊飾
販售單位：1 入
主要材質：夏威夷豆果殼、核桃殼、棉線
掛帶材質：蠟繩
尺寸說明：夏威夷豆果殼款：約 3～4 cm
核桃殼款：約 4～5.5 cm（天然材質，尺寸會有些微差異）
商品特色：天然果殼紋理
手工製作
每件皆有些微不同
`;

console.log(parseProductSpec(rawText));

console.log 結果：
{
  category: "吊飾",
  unit: "1 入",
  materials: ["夏威夷豆果殼", "核桃殼", "棉線"],
  strapMaterial: "蠟繩",
  size: {
    macadamiaShell: "約 3～4 cm",
    walnutShell: "約 4～5.5 cm",
    note: "天然材質，尺寸會有些微差異"
  },
  features: ["天然果殼紋理", "手工製作", "每件皆有些微不同"]
}
*/
