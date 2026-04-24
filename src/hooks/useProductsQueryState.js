import { useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";

const CATEGORY_QUERY_KEY = "category";
const PAGE_QUERY_KEY = "page";

function getCategoryFromSearchParams(searchParams) {
  return searchParams.get(CATEGORY_QUERY_KEY)?.trim() || "";
}

function getPageFromSearchParams(searchParams) {
  const rawPage = searchParams.get(PAGE_QUERY_KEY);
  const parsedPage = Number(rawPage);
  if (!Number.isInteger(parsedPage) || parsedPage < 1) {
    return 1;
  }
  return parsedPage;
}

function isValidPageQuery(searchParams) {
  const rawPage = searchParams.get(PAGE_QUERY_KEY);
  if (rawPage === null) {
    return true;
  }
  return /^[1-9]\d*$/.test(rawPage);
}

function resolveCategoryFromQuery(categoryFromQuery, categories, allCategory) {
  if (!categoryFromQuery) {
    return allCategory;
  }
  return categories.includes(categoryFromQuery) ? categoryFromQuery : allCategory;
}

function createNextSearchParams(searchParams, { category, page, allCategory }) {
  const nextParams = new URLSearchParams(searchParams);
  if (category && category !== allCategory) {
    nextParams.set(CATEGORY_QUERY_KEY, category);
  } else {
    nextParams.delete(CATEGORY_QUERY_KEY);
  }

  if (page > 1) {
    nextParams.set(PAGE_QUERY_KEY, String(page));
  } else {
    nextParams.delete(PAGE_QUERY_KEY);
  }

  return nextParams;
}

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
