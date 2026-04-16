import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";

import CheckoutFlow from "@/components/front/CheckoutFlow";
import EmptyCart from "@/components/front/EmptyCart";
import CartThresholdNotice from "@/components/front/CartThresholdNotice";
import OrderSavingsNotice from "@/components/front/OrderSavingsNotice";
import YoumaylikeSwiper from "@/components/front/YoumaylikeSwiper";
import useMessage from "@/hooks/useMessage";
import { DelAllCartApi } from "@/services/carts";
import { getProductAllApi } from "@/services/product";
import {
  createAsyncAddCart,
  createAsyncDelCart,
  createAsyncGetCart,
  createAsyncUpdataItemNum,
  selectCartTotal,
} from "@/slice/cartSlice";
import { toggleWishlistItem } from "@/slice/wishlistSlice";
import { scrollToTop } from "@/utils/scrollToTop";

export default function Cart() {
  const carts = useSelector((state) => state.cart.carts);
  const total = useSelector(selectCartTotal);
  const wishList = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();
  const { loadingItem } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const { showSuccess, showError } = useMessage();
  const [activeTab, setActiveTab] = useState("cart");
  const [wishListProducts, setWishListProducts] = useState([]);

  useEffect(() => {
    const getWishListProducts = async () => {
      try {
        const res = await getProductAllApi();
        setWishListProducts(res.data.products || []);
      } catch (error) {
        console.error(error.response || error);
      }
    };

    getWishListProducts();
    scrollToTop();
  }, []);

  const collectedItems = wishListProducts.filter((item) => wishList[item.id]);

  //刪除單一商品
  const handleDelItem = (e, id) => {
    e.preventDefault();
    dispatch(createAsyncDelCart(id));
    showSuccess("刪除成功");
  };

  //刪除全部
  const deleteAll = async () => {
    try {
      const res = await DelAllCartApi();
      dispatch(createAsyncGetCart());
      showSuccess(res.data.data, "成功");
    } catch (error) {
      console.error(error.respones);
      showError("刪除失敗，請聯繫客服");
    }
  };
  //更改購物車數量
  const handleUpdateNum = (cartId, productId, qty) => {
    if (qty < 1) return;
    dispatch(
      createAsyncUpdataItemNum({
        cartId,
        productId,
        qty,
      }),
    );
    showSuccess("更改成功");
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

  //進入資料填寫頁
  const handleSubmitCart = (e) => {
    e.preventDefault();
    if (carts.length === 0) return;
    navigate(`/checkout`);
  };

  return (
    <>
      <div className="container">
        <CheckoutFlow currentStep={1} />
        <div className="row justify-content-center">
          <div
            className="col-md-8 bg-white py-5"
            style={{
              minHeight: "min-height: calc(100vh - 56px - 76px)",
            }}
          >
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <div>
                <h2 className="mt-2 mb-3 font-zh-display fw-bold">購物車</h2>
                <div
                  className="btn-group"
                  role="tablist"
                  aria-label="購物車頁籤"
                >
                  <button
                    type="button"
                    className={`btn ${
                      activeTab === "cart" ? "btn-dark" : "btn-outline-dark"
                    }`}
                    onClick={() => setActiveTab("cart")}
                  >
                    購物車
                  </button>
                  <button
                    type="button"
                    className={`btn ${
                      activeTab === "wishlist" ? "btn-dark" : "btn-outline-dark"
                    }`}
                    onClick={() => setActiveTab("wishlist")}
                  >
                    你的收藏
                  </button>
                </div>
              </div>
              <div className="text-end mt-4">
                {activeTab === "cart" && (
                  <button
                    type="button"
                    className="btn btn-outline-danger font-zh-display"
                    onClick={deleteAll}
                    disabled={!carts || carts.length === 0}
                  >
                    清空購物車
                  </button>
                )}
              </div>
            </div>
            {activeTab === "cart" ? (
              <>
                {carts.length === 0 ? (
                  <EmptyCart />
                ) : (
                  <>
                    {carts.map((item) => {
                      return (
                        <div className="d-flex mt-3 bg-light " key={item.id}>
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.title}
                            className="img-size-sm3"
                          />
                          <div className="w-100 p-3 position-relative">
                            <a
                              href="#"
                              onClick={(e) => handleDelItem(e, item.id)}
                              className="position-absolute"
                              style={{
                                top: "16px",
                                right: "16px",
                              }}
                            >
                              <i className="fas fa-times"></i>
                            </a>
                            <p className="mb-0 fw-bold font-zh-display">
                              {item.product.title}
                            </p>
                            <div className="d-flex justify-content-between align-items-center w-100">
                              <div className="input-group w-50 align-items-center p-1">
                                <div
                                  className="input-group input-group-sm"
                                  style={{ width: "120px" }}
                                >
                                  <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() =>
                                      handleUpdateNum(
                                        item.id,
                                        item.product_id,
                                        item.qty - 1,
                                      )
                                    }
                                    disabled={
                                      loadingItem === item.id || item.qty <= 1
                                    }
                                  >
                                    -
                                  </button>

                                  <span className="form-control text-center">
                                    {loadingItem === item.id ? (
                                      <div
                                        className="spinner-border spinner-border-sm"
                                        role="status"
                                      >
                                        <span className="visually-hidden">
                                          Loading...
                                        </span>
                                      </div>
                                    ) : (
                                      item.qty
                                    )}
                                  </span>

                                  <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() =>
                                      handleUpdateNum(
                                        item.id,
                                        item.product_id,
                                        item.qty + 1,
                                      )
                                    }
                                    disabled={loadingItem === item.id}
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                              <p className="mb-0 ms-auto font-zh-display">
                                NT${item.product.price * item.qty}{" "}
                                <span className="text-muted">
                                  <del>
                                    NT$
                                    {item.product.origin_price * item.qty}
                                  </del>
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
                <table className="table mt-4 text-muted"></table>
                <div className="d-flex justify-content-between mt-4">
                  <p className="mb-0 h4 fw-bold font-zh-display">總金額</p>
                  <p className="mb-0 h4 fw-bold font-zh-display">NT${total}</p>
                </div>
                <OrderSavingsNotice carts={carts} total={total} />
                <CartThresholdNotice total={total} />
                <button
                  type="button"
                  className={`btn btn-block mt-4 rounded-0 py-3 ${
                    carts.length === 0 ? "btn-secondary" : "btn-dark"
                  }`}
                  onClick={handleSubmitCart}
                  disabled={!carts || carts.length === 0}
                >
                  送出購物車
                </button>
              </>
            ) : (
              <div className="mt-4">
                {collectedItems.length === 0 ? (
                  <div className="text-center py-5">
                    <h1>
                      <i className="fa-sharp fa-regular fa-heart text-secondary"></i>
                    </h1>
                    <p>目前還沒有收藏任何商品</p>
                    <Link to="/product" className="btn btn-dark mt-3">
                      去逛逛
                    </Link>
                  </div>
                ) : (
                  <div className="row">
                    {collectedItems.map((item) => (
                      <div className="col-md-6 mb-4" key={item.id}>
                        <div className="card h-100 position-relative border-0 bg-light">
                          <button
                            type="button"
                            className="p-0 border-0 bg-transparent text-danger position-absolute"
                            onClick={() =>
                              dispatch(toggleWishlistItem(item.id))
                            }
                            style={{
                              top: "16px",
                              right: "16px",
                              zIndex: 2,
                            }}
                            aria-label="移除收藏"
                          >
                            <i className="fa-solid fa-heart"></i>
                          </button>
                          <div className="row g-0 h-100">
                            <div className="col-4">
                              <Link to={`/product/${item.id}`}>
                                <img
                                  src={item.imageUrl}
                                  alt={item.title}
                                  className="img-fluid h-100 w-100"
                                  style={{ objectFit: "cover" }}
                                />
                              </Link>
                            </div>
                            <div className="col-8">
                              <div className="card-body d-flex flex-column h-100">
                                <h5 className="card-title pe-4">
                                  {item.title}
                                </h5>

                                <p className="card-text mb-0">
                                  NT${item.price}{" "}
                                  <span className="text-muted ">
                                    <del>NT${item.origin_price}</del>
                                  </span>
                                </p>
                                <div className="mt-auto d-flex gap-2 flex-wrap">
                                  <Link
                                    to={`/product/${item.id}`}
                                    className="btn btn-outline-dark"
                                  >
                                    查看商品
                                  </Link>
                                  <button
                                    type="button"
                                    className="btn btn-dark"
                                    onClick={(e) => handleAddCart(e, item.id)}
                                  >
                                    加入購物車
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <YoumaylikeSwiper />
    </>
  );
}
