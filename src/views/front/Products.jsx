import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router";

import BackToTop from "@/components/BackToTop";
import Pagination from "@/components/Pagination";
import useMessage from "@/hooks/useMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import ProductCategoryFilter from "@/components/front/ProductCategoryFilter";
import ProductCard from "@/components/front/products/ProductCard";
import ProductsToolbar from "@/components/front/products/ProductsToolbar";

import { createAsyncAddCart } from "@/slice/cartSlice";
import {
  createAsyncGetAllProducts,
  createAsyncGetProducts,
} from "@/slice/productsSlice";
import { toggleWishlistItem } from "@/slice/wishlistSlice";

const ALL_CATEGORY = "全部商品";
const CATEGORY_QUERY_KEY = "category";
const PAGE_QUERY_KEY = "page";
const TAG_CANDIDATES = ["菩提子", "無患子", "松果", "青櫟"];

function getDeterministicRank(value, seed) {
  const input = `${value}-${seed}`;
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

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

function resolveCategoryFromQuery(categoryFromQuery, categories) {
  if (!categoryFromQuery) {
    return ALL_CATEGORY;
  }
  return categories.includes(categoryFromQuery)
    ? categoryFromQuery
    : ALL_CATEGORY;
}

function createNextSearchParams(searchParams, { category, page }) {
  const nextParams = new URLSearchParams(searchParams);
  if (category && category !== ALL_CATEGORY) {
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

function getProductKeywordText(item) {
  return `${item?.title || ""} ${item?.description || ""}`;
}

export default function Products() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { showSuccess } = useMessage();
  const [animatingId, setAnimatingId] = useState(null);
  const [sortType, setSortType] = useState("highToLow");
  const [randomSeed, setRandomSeed] = useState(1);
  const [pendingCategory, setPendingCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const wishList = useSelector((state) => state.wishlist.items);

  const {
    products,
    allProducts,
    pagination,
    categories,
    categoryCounts,
    loading,
  } = useSelector((state) => state.products);
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
    () => resolveCategoryFromQuery(categoryFromQuery, categories),
    [categoryFromQuery, categories],
  );
  const hasInvalidCategory = useMemo(
    () =>
      Boolean(categoryFromQuery) &&
      categories.length > 0 &&
      !categories.includes(categoryFromQuery),
    [categoryFromQuery, categories],
  );

  useEffect(() => {
    dispatch(createAsyncGetAllProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      createAsyncGetProducts({
        page: currentPage,
        category: activeCategory === ALL_CATEGORY ? "" : activeCategory,
      }),
    );
  }, [dispatch, activeCategory, currentPage]);

  useEffect(() => {
    if (!pendingCategory) {
      return;
    }

    const timer = setTimeout(() => {
      setPendingCategory("");
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [pendingCategory]);

  const handleCategoryChange = (category) => {
    const nextParams = createNextSearchParams(searchParams, {
      category,
      page: 1,
    });

    if (nextParams.toString() === searchParams.toString()) {
      return;
    }

    setPendingCategory(category);
    setSearchParams(nextParams);
  };

  const handlePageChange = (page) => {
    const nextPage = Math.max(1, Number(page) || 1);
    const totalPages = pagination?.total_pages || 1;
    const safePage = Math.min(nextPage, totalPages);

    setSearchParams(
      createNextSearchParams(searchParams, {
        category: activeCategory,
        page: safePage,
      }),
    );
  };

  useEffect(() => {
    if (!hasInvalidPageQuery) {
      return;
    }
    setSearchParams(
      createNextSearchParams(searchParams, {
        category: activeCategory,
        page: 1,
      }),
    );
  }, [hasInvalidPageQuery, searchParams, activeCategory, setSearchParams]);

  useEffect(() => {
    const totalPages = pagination?.total_pages || 0;
    if (!totalPages || currentPage <= totalPages) {
      return;
    }

    setSearchParams(
      createNextSearchParams(searchParams, {
        category: activeCategory,
        page: totalPages,
      }),
    );
  }, [
    currentPage,
    pagination?.total_pages,
    searchParams,
    activeCategory,
    setSearchParams,
  ]);

  const handleSortChange = (value) => {
    setSortType(value);
    if (value === "random") {
      setRandomSeed((prev) => prev + 1);
    }
  };

  const handleToggleTag = (tag) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((item) => item !== tag);
      }
      return [...prev, tag];
    });
  };

  const handleToggleWishlist = (productId) => {
    dispatch(toggleWishlistItem(productId));
    setAnimatingId(productId);
    setTimeout(() => {
      setAnimatingId(null);
    }, 350);
  };

  //進入商品詳細頁
  const handleViewDetail = (e, id) => {
    e.preventDefault();
    navigate(`/product/${id}`);
  };
  //將商品加入購物車
  const handleAddCart = (e, id, qty = 1) => {
    e.preventDefault();
    dispatch(
      createAsyncAddCart({
        id,
        qty,
      }),
    );
    showSuccess("成功加入購物車");
  };

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

    return TAG_CANDIDATES.filter((keyword) =>
      sourceProducts.some((item) =>
        getProductKeywordText(item).includes(keyword),
      ),
    );
  }, [allProducts, products]);

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

  return (
    <>
      <div
        className="position-relative d-flex align-items-center justify-content-center overflow-hidden mt-2"
        style={{ minHeight: "200px" }}
      >
        <div
          className="position-absolute w-100 h-100"
          style={{
            backgroundImage:
              "url(https://i.pinimg.com/1200x/7d/6b/90/7d6b90ef382a67ec60646a95feab02ec.jpg)",
            backgroundRepeat: "repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            opacity: 0.8,
            filter: "blur(4px)",
            transform: "scale(1.08)",
            zIndex: 0,
          }}
        />
        <div className="text-center" style={{ opacity: 0.7 }}>
          <h4 className="position-relative z-1 mb-0 font-zh-display fw-bold">
            把祝福帶進每一天
          </h4>
          <p className="position-relative z-1 mb-0 font-zh-display">
            Bring blessings into every day
          </p>
        </div>
        <nav
          aria-label="breadcrumb"
          className="position-absolute bottom-0 end-0 me-4 mb-3 z-1"
        >
          <ol
            className="breadcrumb bg-transparent mb-0 py-0 font-zh-display hero-breadcrumb"
            style={{
              "--bs-breadcrumb-divider-color": "rgba(255, 255, 255, 0.85)",
            }}
          >
            <li className="breadcrumb-item">
              <Link
                className="text-white text-decoration-none breadcrumb-home-link"
                to="/"
              >
                回到首頁
              </Link>
            </li>
            <li
              className="breadcrumb-item active text-white"
              aria-current="page"
            >
              商品列表
            </li>
          </ol>
        </nav>
      </div>
      <div className="container mt-md-5 mt-3 mb-7">
        <div className="row">
          {/* 分類區 */}
          <div className="col-md-4">
            <ProductCategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              categoryCounts={categoryCounts}
              pendingCategory={pendingCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>
          <div className="col-md-8">
            <ProductsToolbar
              hasInvalidCategory={hasInvalidCategory}
              categoryFromQuery={categoryFromQuery}
              availableTags={availableTags}
              selectedTags={selectedTags}
              onToggleTag={handleToggleTag}
              sortType={sortType}
              onSortChange={handleSortChange}
            />
            <div className="row">
              {/* 產品列表 */}
              {loading ? (
                <LoadingSpinner
                  height={80}
                  width={80}
                  color="#333"
                  secondaryColor="#ddd"
                />
              ) : (
                <>
                  {filteredProducts?.map((item) => (
                    <ProductCard
                      key={item.id}
                      item={item}
                      isWished={Boolean(wishList[item.id])}
                      isAnimating={animatingId === item.id}
                      onViewDetail={handleViewDetail}
                      onToggleWishlist={handleToggleWishlist}
                      onAddCart={handleAddCart}
                    />
                  ))}
                  {!filteredProducts?.length && (
                    <div className="col-12">
                      <p className="text-muted mt-4 font-zh-display">
                        目前篩選條件下沒有商品，請取消部分關鍵字再試試。
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
            {/* 頁碼區 */}
            <div className="mt-3">
              <Pagination
                pagination={displayPagination}
                onChangePage={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
      <BackToTop />
    </>
  );
}
