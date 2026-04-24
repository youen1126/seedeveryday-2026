import { useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import {
  createNextSearchParams,
  getCategoryFromSearchParams,
  getPageFromSearchParams,
  isValidPageQuery,
  resolveCategoryFromQuery,
} from "@/utils/productsQuery.utils";

export default function useProductsQueryState({
  categories,
  allCategory,
  totalPages,
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryFromQuery = useMemo(
    () => getCategoryFromSearchParams(searchParams),
    [searchParams],
  );
  const currentPage = useMemo(
    () => getPageFromSearchParams(searchParams),
    [searchParams],
  );
  const hasInvalidPageQuery = useMemo(
    () => !isValidPageQuery(searchParams),
    [searchParams],
  );
  const activeCategory = useMemo(
    () => resolveCategoryFromQuery(categoryFromQuery, categories, allCategory),
    [categoryFromQuery, categories, allCategory],
  );
  const hasInvalidCategory = useMemo(
    () =>
      Boolean(categoryFromQuery) &&
      categories.length > 0 &&
      !categories.includes(categoryFromQuery),
    [categoryFromQuery, categories],
  );

  const setCategoryAndResetPage = useCallback(
    (category) => {
      const nextParams = createNextSearchParams(searchParams, {
        category,
        page: 1,
        allCategory,
      });

      if (nextParams.toString() === searchParams.toString()) {
        return false;
      }

      setSearchParams(nextParams);
      return true;
    },
    [searchParams, allCategory, setSearchParams],
  );

  const setPageWithinRange = useCallback(
    (page) => {
      const nextPage = Math.max(1, Number(page) || 1);
      const safeTotalPages = Number(totalPages) || 1;
      const safePage = Math.min(nextPage, safeTotalPages);

      setSearchParams(
        createNextSearchParams(searchParams, {
          category: activeCategory,
          page: safePage,
          allCategory,
        }),
      );
    },
    [searchParams, activeCategory, allCategory, totalPages, setSearchParams],
  );

  useEffect(() => {
    if (!hasInvalidPageQuery) {
      return;
    }

    setSearchParams(
      createNextSearchParams(searchParams, {
        category: activeCategory,
        page: 1,
        allCategory,
      }),
    );
  }, [
    hasInvalidPageQuery,
    searchParams,
    activeCategory,
    allCategory,
    setSearchParams,
  ]);

  useEffect(() => {
    const normalizedTotalPages = Number(totalPages) || 0;
    if (!normalizedTotalPages || currentPage <= normalizedTotalPages) {
      return;
    }

    setSearchParams(
      createNextSearchParams(searchParams, {
        category: activeCategory,
        page: normalizedTotalPages,
        allCategory,
      }),
    );
  }, [
    totalPages,
    currentPage,
    searchParams,
    activeCategory,
    allCategory,
    setSearchParams,
  ]);

  return {
    categoryFromQuery,
    currentPage,
    activeCategory,
    hasInvalidCategory,
    setCategoryAndResetPage,
    setPageWithinRange,
  };
}
