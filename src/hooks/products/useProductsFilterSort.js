import { useMemo } from "react";
import {
  getProductKeywordText,
  sortProductsByType,
} from "@/utils/products/productsFilter.utils";

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
    return sortProductsByType(products, sortType, randomSeed);
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
