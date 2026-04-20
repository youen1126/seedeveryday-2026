import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";

import BackToTop from "@/components/BackToTop";
import AddToCartButton from "@/components/front/AddToCartButton";
import Pagination from "@/components/Pagination";
import useMessage from "@/hooks/useMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import ProductSortSelect from "@/components/front/ProductSortSelect";

import { createAsyncAddCart } from "@/slice/cartSlice";
import {
  createAsyncGetAllProducts,
  createAsyncGetProducts,
} from "@/slice/productsSlice";
import { toggleWishlistItem } from "@/slice/wishlistSlice";

const ALL_CATEGORY = "全部商品";
const CATEGORY_QUERY_KEY = "category";
const PAGE_QUERY_KEY = "page";

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

export default function Products() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { showSuccess } = useMessage();
  const [animatingId, setAnimatingId] = useState(null);
  const [sortType, setSortType] = useState("highToLow");
  const [randomSeed, setRandomSeed] = useState(1);
  const wishList = useSelector((state) => state.wishlist.items);

  const { products, pagination, categories, categoryCounts, loading } = useSelector(
    (state) => state.products,
  );
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

  const handleCategoryChange = (category) => {
    setSearchParams(
      createNextSearchParams(searchParams, {
        category,
        page: 1,
      }),
    );
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
              "url(https://i.pinimg.com/1200x/84/51/d6/8451d67354799415e49c1f0217269403.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            opacity: 0.8,
            filter: "blur(6px)",
            transform: "scale(1.08)",
            zIndex: 0,
          }}
        ></div>
        <div className="flex text-center" style={{ opacity: 0.7 }}>
          <h4 className="fw-bold position-relative z-1 mb-0 font-zh-display fw-bold ">
            把祝福帶進每一天
          </h4>
          <p className="position-relative z-1 mb-0 font-zh-display">
            Bring blessings into every day
          </p>
        </div>
      </div>
      <div className="container mt-md-5 mt-3 mb-7">
        <div className="row">
          {/* 分類區 */}
          <div className="col-md-4">
            <div
              className="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3"
              id="accordionExample"
            >
              <div className="card border-0">
                <div className="card-body py-0">
                  <ul className="list-unstyled">
                    {categories?.map((category) => {
                      return (
                        <li key={category}>
                          <a
                            href="#"
                            className={`py-2 d-block text-muted icon-hover ${activeCategory === category ? "text-dark fw-bold font-zh-display" : "text-muted font-zh-display"}`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleCategoryChange(category);
                            }}
                          >
                            {`${category} (${categoryCounts?.[category] ?? 0})`}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            {hasInvalidCategory && (
              <p className="text-muted mb-3 font-zh-display">
                查無分類「{categoryFromQuery}」，以下顯示全部商品。
              </p>
            )}
            <ProductSortSelect value={sortType} onChange={handleSortChange} />
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
                  {sortedProducts?.map((item) => {
                    return (
                      <div className="col-md-6 card-hover" key={item.id}>
                        <div className="card img-hover border-0 mb-4 position-relative position-relative">
                          <img
                            src={item.imageUrl}
                            className="card-img-top img-size-large"
                            alt={item.title}
                            onClick={(e) => handleViewDetail(e, item.id)}
                          />
                          <button
                            type="button"
                            className="p-0 border-0 bg-transparent text-dark"
                            onClick={() => {
                              dispatch(toggleWishlistItem(item.id));

                              setAnimatingId(item.id);

                              setTimeout(() => {
                                setAnimatingId(null);
                              }, 350);
                            }}
                          >
                            <i
                              className={`fa-${
                                wishList[item.id] ? "solid" : "regular"
                              } fa-heart position-absolute ${
                                animatingId === item.id ? "is-animating" : ""
                              }`}
                              style={{
                                right: "16px",
                                top: "35px",
                                fontSize: "18px",
                              }}
                            ></i>
                          </button>
                          <div className="card-body p-0">
                            <h4 className="mb-0 mt-3  font-zh-display fw-bold ">
                              <a
                                href="#"
                                onClick={(e) => handleViewDetail(e, item.id)}
                              >
                                {item.title}
                              </a>
                            </h4>
                            <div className="py-3">
                              <AddToCartButton
                                className="text-nowrap btn btn-dark w-20 p-2"
                                onClick={(e) => handleAddCart(e, item.id)}
                              >
                                加入購物車
                              </AddToCartButton>
                            </div>
                          </div>
                          <p className="card-text mb-0  font-zh-display">
                            NT${item.price}{" "}
                            <span className="text-muted ">
                              <del>NT${item.origin_price}</del>
                            </span>
                          </p>
                          {/* <p className="text-muted mt-3">{item.description}</p> */}
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
            <br />
            {/* 頁碼區 */}
            <Pagination
              pagination={pagination}
              onChangePage={handlePageChange}
            />
          </div>
        </div>
      </div>
      <BackToTop />
    </>
  );
}
