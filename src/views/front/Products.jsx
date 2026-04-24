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
  // 介面狀態：愛心點擊動畫
  const dispatch = useDispatch();
  const [animatingId, setAnimatingId] = useState(null);
  const wishList = useSelector((state) => state.wishlist.items);

  // Redux 狀態：商品列表、分類資訊、載入狀態與分頁
  const {
    products,
    allProducts,
    pagination,
    categories,
    categoryCounts,
    loading,
  } = useSelector((state) => state.products);

  // Query 狀態：分類與頁碼和 URL 同步
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

  // 互動行為：頁面事件處理與本地篩選/排序狀態
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

  // 初始資料：先抓全部商品，提供標籤/篩選使用
  useEffect(() => {
    dispatch(createAsyncGetAllProducts());
  }, [dispatch]);

  // 分頁資料：當 URL 對應的頁碼或分類改變時重抓資料
  useEffect(() => {
    dispatch(
      createAsyncGetProducts({
        page: currentPage,
        category: activeCategory === ALL_CATEGORY ? "" : activeCategory,
      }),
    );
  }, [dispatch, activeCategory, currentPage]);

  // 收藏清單切換：供 ProductCard 使用
  const handleToggleWishlist = (productId) => {
    dispatch(toggleWishlistItem(productId));
    setAnimatingId(productId);
    setTimeout(() => {
      setAnimatingId(null);
    }, 350);
  };

  // 衍生資料：排序結果、可用標籤、篩選後商品與分頁顯示
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
          {/* 左側：分類 */}
          <div className="col-md-4">
            <ProductCategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              categoryCounts={categoryCounts}
              pendingCategory={pendingCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>
          {/* 右側：工具列 + 商品列表 + 分頁 */}
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
              {/* 商品列表 */}
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
            {/* 分頁 */}
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
