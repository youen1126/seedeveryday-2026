import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { createAsyncAddCart } from "../../slice/cartSlice";
import BackToTop from "@/components/BackToTop";
import {
  createAsyncGetAllProducts,
  createAsyncGetProducts,
} from "../../slice/productsSlice";
import { setCategory } from "../../slice/productsSlice";
import Pagination from "../../components/Pagination";
import useMessage from "../../hooks/useMessage";
import { Oval } from "react-loader-spinner";
import { toggleWishlistItem } from "../../slice/wishlistSlice";

export default function Products() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showSuccess } = useMessage();
  const [animatingId, setAnimatingId] = useState(null);
  const wishList = useSelector((state) => state.wishlist.items);

  const { products, pagination, currentCategory, categories, loading } =
    useSelector((state) => state.products);

  useEffect(() => {
    dispatch(createAsyncGetAllProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      createAsyncGetProducts({
        page: 1,
        category: currentCategory === "全部商品" ? "" : currentCategory,
      }),
    );
  }, [dispatch, currentCategory]);

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

  return (
    <>
      <div
        className="position-relative d-flex align-items-center justify-content-center overflow-hidden"
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
          <h4 className="fw-bold position-relative z-1 mb-0">
            把祝福帶進每一天
          </h4>
          <p className="position-relative z-1 mb-0">
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
                            className={`py-2 d-block text-muted icon-hover ${currentCategory === category ? "text-dark fw-bold" : "text-muted"}`}
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(setCategory(category));
                            }}
                          >
                            {category}
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
            <div className="row">
              {/* 產品列表 */}
              {loading ? (
                <div className="login-loading">
                  <Oval
                    height={50}
                    width={50}
                    color="#ff7a15ff"
                    secondaryColor="#ccc"
                    strokeWidth={4}
                  />
                </div>
              ) : (
                <>
                  {products?.map((item) => {
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
                            <h4 className="mb-0 mt-3">
                              <a
                                href="#"
                                onClick={(e) => handleViewDetail(e, item.id)}
                              >
                                {item.title}
                              </a>
                            </h4>
                            <div className="py-3">
                              <button
                                type="button"
                                className="text-nowrap btn btn-dark w-20 p-2"
                                onClick={(e) => handleAddCart(e, item.id)}
                              >
                                加入購物車
                              </button>
                            </div>
                          </div>
                          <p className="card-text mb-0">
                            NT${item.price}{" "}
                            <span className="text-muted ">
                              <del>NT${item.origin_price}</del>
                            </span>
                          </p>
                          <p className="text-muted mt-3">{item.description}</p>
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
              onChangePage={(page) =>
                dispatch(
                  createAsyncGetProducts({
                    page,
                    category:
                      currentCategory === "全部商品" ? "" : currentCategory,
                  }),
                )
              }
            />
          </div>
        </div>
      </div>
      <BackToTop />
    </>
  );
}
