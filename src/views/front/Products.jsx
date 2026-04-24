import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";

import BackToTop from "@/components/BackToTop";
import Pagination from "@/components/Pagination";
import useMessage from "@/hooks/useMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import useProductsFilterSort from "@/hooks/products/useProductsFilterSort";
import useProductsQueryState from "@/hooks/products/useProductsQueryState";
import ProductCard from "@/components/front/products/ProductCard";
import ProductCategoryFilter from "@/components/front/products/ProductCategoryFilter";
import ProductsToolbar from "@/components/front/products/ProductsToolbar";

import { createAsyncAddCart } from "@/slice/cartSlice";
import {
  createAsyncGetAllProducts,
  createAsyncGetProducts,
} from "@/slice/productsSlice";
import { toggleWishlistItem } from "@/slice/wishlistSlice";

const ALL_CATEGORY = "全部商品";
const TAG_CANDIDATES = ["菩提子", "無患子", "松果", "青櫟"];

export default function Products() {
  const navigate = useNavigate();
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
  const {
    categoryFromQuery,
    currentPage,
    activeCategory,
    hasInvalidCategory,
    setCategoryAndResetPage,
    setPageWithinRange,
  } = useProductsQueryState({
    categories,
    allCategory: ALL_CATEGORY,
    totalPages: pagination?.total_pages,
  });

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
    const hasChanged = setCategoryAndResetPage(category);
    if (hasChanged) {
      setPendingCategory(category);
    }
  };

  const handlePageChange = (page) => {
    setPageWithinRange(page);
  };

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

  const { availableTags, filteredProducts, displayPagination } =
    useProductsFilterSort({
      products,
      allProducts,
      pagination,
      selectedTags,
      sortType,
      randomSeed,
      tagCandidates: TAG_CANDIDATES,
    });

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
