function ProductSpecRow({ label, value, className = "mb-2" }) {
  if (!value) return null;

  return (
    <p className={`single-product-tab-spec-content ${className}`}>
      <strong>{label}</strong>：{value}
    </p>
  );
}

export default function ProductSpecList({ spec }) {
  const sizeText = [
    spec?.size?.macadamiaShell
      ? `夏威夷豆果殼款：${spec.size.macadamiaShell}`
      : "",
    spec?.size?.walnutShell ? `核桃殼款：${spec.size.walnutShell}` : "",
    spec?.size?.note ? `備註：${spec.size.note}` : "",
  ]
    .filter(Boolean)
    .join("，");

  return (
    <>
      <h3 className="single-product-faq-title">
        <i className="bi bi-chat-left-text-fill"></i> 規格說明
      </h3>
      <ProductSpecRow label="商品分類" value={spec?.category} />
      <ProductSpecRow label="販售單位" value={spec?.unit} />
      <ProductSpecRow
        label="主要材質"
        value={Array.isArray(spec?.materials) ? spec.materials.join("、") : ""}
      />
      <ProductSpecRow label="掛帶材質" value={spec?.strapMaterial} />
      <ProductSpecRow label="尺寸" value={sizeText} />
      <ProductSpecRow
        label="商品特色"
        value={Array.isArray(spec?.features) ? spec.features.join("、") : ""}
        className="mb-0"
      />
    </>
  );
}
