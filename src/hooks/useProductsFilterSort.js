import { useMemo } from "react";

function getDeterministicRank(value, seed) {
  const input = `${value}-${seed}`;
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function getProductKeywordText(item) {
  return `${item?.title || ""} ${item?.description || ""}`;
}

export default function useProductsFilterSort({
  products,
  allProducts,
  pagination,
  selectedTags,
  sortType,
  randomSeed,
  tagCandidates,
}) {
  const sortedProducts = useMemo(() => {
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
  }, [products, sortType, randomSeed]);

  const availableTags = useMemo(() => {
    const sourceProducts =
      Array.isArray(allProducts) && allProducts.length > 0
        ? allProducts
        : products || [];

    return tagCandidates.filter((keyword) =>
      sourceProducts.some((item) => getProductKeywordText(item).includes(keyword)),
    );
  }, [allProducts, products, tagCandidates]);

  const filteredProducts = useMemo(() => {
    if (selectedTags.length === 0) {
      return sortedProducts;
    }
    return sortedProducts.filter((item) =>
      selectedTags.some((tag) => getProductKeywordText(item).includes(tag)),
    );
  }, [sortedProducts, selectedTags]);

  const displayPagination = useMemo(() => {
    const pageSize = Number(pagination?.per_page) || products?.length || 1;
    const shouldForceSinglePage =
      selectedTags.length > 0 && filteredProducts.length <= pageSize;

    if (!shouldForceSinglePage) {
      return pagination;
    }

    return {
      ...pagination,
      current_page: 1,
      total_pages: 1,
      has_pre: false,
      has_next: false,
    };
  }, [
    pagination,
    products?.length,
    selectedTags.length,
    filteredProducts.length,
  ]);

  return {
    sortedProducts,
    availableTags,
    filteredProducts,
    displayPagination,
  };
}
