import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import BackToTop from "@/components/BackToTop";
import Pagination from "@/components/Pagination";
import LoadingSpinner from "@/components/LoadingSpinner";
import useProductsActions from "@/hooks/products/useProductsActions";
import useProductsFilterSort from "@/hooks/products/useProductsFilterSort";
import useProductsQueryState from "@/hooks/products/useProductsQueryState";
import ProductCard from "@/components/front/products/ProductCard";
import ProductCategoryFilter from "@/components/front/products/ProductCategoryFilter";
import ProductsHero from "@/components/front/products/ProductsHero";
import ProductsToolbar from "@/components/front/products/ProductsToolbar";

import {
  createAsyncGetAllProducts,
  createAsyncGetProducts,
} from "@/slice/productsSlice";
import { toggleWishlistItem } from "@/slice/wishlistSlice";

const ALL_CATEGORY = "全部商品";
const TAG_CANDIDATES = ["菩提子", "無患子", "松果", "青櫟"];

export default function Products() {
  const dispatch = useDispatch();
  const [animatingId, setAnimatingId] = useState(null);
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
  const {
    sortType,
    randomSeed,
    selectedTags,
    pendingCategory,
    handleCategoryChange,
    handlePageChange,
    handleSortChange,
    handleToggleTag,
    handleViewDetail,
    handleAddCart,
  } = useProductsActions({
    setCategoryAndResetPage,
    setPageWithinRange,
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

  const handleToggleWishlist = (productId) => {
    dispatch(toggleWishlistItem(productId));
    setAnimatingId(productId);
    setTimeout(() => {
      setAnimatingId(null);
    }, 350);
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
      <ProductsHero />
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
                <LoadingSpinner height={80} width={80} />
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
