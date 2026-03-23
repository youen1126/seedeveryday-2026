import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
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

export default function Products() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showSuccess } = useMessage();
  //收藏清單存器
  const [wishList, setWishList] = useState(() => {
    const initWishList = localStorage.getItem("wishList")
      ? JSON.parse(localStorage.getItem("wishList"))
      : {};
    return initWishList;
  });

  //收藏和取消收藏切換功能e.preventDefault();
  const tooggleWishListItem = (e, product_id) => {
    e.preventDefault();
    setWishList((prev) => {
      const newWishList = {
        ...prev,
        [product_id]: !prev[product_id],
      };

      localStorage.setItem("wishList", JSON.stringify(newWishList));
      return newWishList;
    });
  };

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
        className="position-relative d-flex align-items-center justify-content-center"
        style={{ minHeight: "150px" }}
      >
        <div
          className="position-absolute"
          style={{
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
            backgroundImage:
              "url(https://images.unsplash.com/photo-1592150621744-aca64f48394a?q=80&w=2382&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            opacity: "0.5",
          }}
        ></div>
        <h4 className="fw-bold">把祝福帶進每一天</h4>
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
              {loading && (
                <div className="login-loading">
                  <Oval
                    height={50}
                    width={50}
                    color="#ff7a15ff"
                    secondaryColor="#ccc"
                    strokeWidth={4}
                  />
                </div>
              )}
              {products?.map((item) => {
                return (
                  <div className="col-md-6 card-hover" key={item.id}>
                    <div className="card img-hover border-0 mb-4 position-relative position-relative">
                      <img
                        src={item.imageUrl}
                        className="card-img-top rounded-0"
                        alt={item.title}
                        style={{
                          height: "350px",
                          objectFit: "cover",
                        }}
                        onClick={(e) => handleViewDetail(e, item.id)}
                      />
                      <a href="#" className="text-dark border-none">
                        <i
                          className={`fa-${wishList[item.id] ? "solid " : "regular"} fa-heart position-absolute`}
                          style={{
                            right: "16px",
                            top: "16px",
                            fontSize: "18px",
                          }}
                          onClick={(e) => tooggleWishListItem(e, item.id)}
                        ></i>
                      </a>
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
