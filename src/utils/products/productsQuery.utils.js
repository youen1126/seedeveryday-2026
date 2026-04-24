const CATEGORY_QUERY_KEY = "category";
const PAGE_QUERY_KEY = "page";

export function getCategoryFromSearchParams(searchParams) {
  return searchParams.get(CATEGORY_QUERY_KEY)?.trim() || "";
}

export function getPageFromSearchParams(searchParams) {
  const rawPage = searchParams.get(PAGE_QUERY_KEY);
  const parsedPage = Number(rawPage);
  if (!Number.isInteger(parsedPage) || parsedPage < 1) {
    return 1;
  }
  return parsedPage;
}

export function isValidPageQuery(searchParams) {
  const rawPage = searchParams.get(PAGE_QUERY_KEY);
  if (rawPage === null) {
    return true;
  }
  return /^[1-9]\d*$/.test(rawPage);
}

export function resolveCategoryFromQuery(
  categoryFromQuery,
  categories,
  allCategory,
) {
  if (!categoryFromQuery) {
    return allCategory;
  }
  return categories.includes(categoryFromQuery) ? categoryFromQuery : allCategory;
}

export function createNextSearchParams(
  searchParams,
  { category, page, allCategory },
) {
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
