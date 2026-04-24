export function getDeterministicRank(value, seed) {
  const input = `${value}-${seed}`;
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function getProductKeywordText(item) {
  return `${item?.title || ""} ${item?.description || ""}`;
}

export function sortProductsByType(products, sortType, randomSeed) {
  const productList = [...(products || [])];

  if (sortType === "highToLow") {
    return productList.sort((a, b) => b.price - a.price);
  }

  if (sortType === "lowToHigh") {
    return productList.sort((a, b) => a.price - b.price);
  }

  return productList.sort(
    (a, b) =>
      getDeterministicRank(a.id, randomSeed) -
      getDeterministicRank(b.id, randomSeed),
  );
}
