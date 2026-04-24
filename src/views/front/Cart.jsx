import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";

import AddToCartButton from "@/components/front/cart/AddToCartButton";
import CartThresholdNotice from "@/components/front/cart/CartThresholdNotice";
import EmptyCart from "@/components/front/cart/EmptyCart";
import OrderSavingsNotice from "@/components/front/cart/OrderSavingsNotice";
import CheckoutFlow from "@/components/front/checkout/CheckoutFlow";
import YoumaylikeSwiper from "@/components/front/singleProduct/YoumaylikeSwiper";
import ViewProductButton from "@/components/front/ViewProductButton";
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
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
  const [isDeletingAll, setIsDeletingAll] = useState(false);
  const MAX_QTY = 10;

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
  const handleDelItem = async (e, id) => {
    e.preventDefault();
    setDeletingItemId(id);
    await dispatch(createAsyncDelCart(id));
    setDeletingItemId(null);
    showSuccess("刪除成功");
  };

  //刪除全部
  const deleteAll = async () => {
    try {
      setIsDeletingAll(true);
      const res = await DelAllCartApi();
      dispatch(createAsyncGetCart());
      showSuccess(res?.data?.message || "已清空購物車");
      setShowDeleteAllModal(false);
    } catch (error) {
      console.error(error.respones);
      showError("刪除失敗，請聯繫客服");
    } finally {
      setIsDeletingAll(false);
    }
  };

  const openDeleteAllModal = () => {
    if (!carts || carts.length === 0) return;
    setShowDeleteAllModal(true);
  };

  const closeDeleteAllModal = () => {
    if (isDeletingAll) return;
    setShowDeleteAllModal(false);
  };
  //更改購物車數量
  const handleUpdateNum = (cartId, productId, qty) => {
    if (qty < 1 || qty > MAX_QTY) return;
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
            className="col-md-8 bg-white py-5 cart-page-panel"
            style={{
              minHeight: "calc(100vh - 56px - 76px)",
            }}
          >
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 cart-page-header">
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
              <div className="text-end">
                {activeTab === "cart" && (
                  <button
                    type="button"
                    className="btn btn-outline-danger font-zh-display"
                    onClick={openDeleteAllModal}
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
                        <div
                          className="cart-item-row d-flex flex-column flex-sm-row mt-3 bg-light"
                          key={item.id}
                        >
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.title}
                            className="img-size-sm3 cart-item-image"
                          />
                          <div className="w-100 p-3 position-relative">
                            <button
                              type="button"
                              onClick={(e) => {
                                handleDelItem(e, item.id);
                              }}
                              className="position-absolute cart-item-delete-btn"
                              disabled={deletingItemId === item.id}
                              aria-label="刪除商品"
                            >
                              {deletingItemId === item.id ? (
                                <span
                                  className="spinner-border spinner-border-sm text-secondary"
                                  role="status"
                                >
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </span>
                              ) : (
                                <i className="fa-regular fa-trash-can"></i>
                              )}
                            </button>
                            <p className="mb-0 fw-bold font-zh-display cart-item-title">
                              {item.product.title}
                            </p>
                            <div className="d-flex justify-content-between align-items-center w-100 flex-wrap">
                              <div className="input-group cart-item-qty-wrap align-items-center p-1">
                                <div className="input-group input-group-sm cart-item-qty-control">
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
                                    disabled={
                                      loadingItem === item.id ||
                                      item.qty >= MAX_QTY
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                              <p className="mb-0 ms-auto font-zh-display cart-item-total">
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
                    <div className="fs-1 mb-2" aria-hidden="true">
                      <i className="fa-sharp fa-regular fa-heart text-secondary"></i>
                    </div>
                    <p className="font-zh-display">目前還沒有收藏任何商品</p>
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
                            className="p-0 border-0 bg-transparent text-danger position-absolute cart-wishlist-remove-btn"
                            onClick={() =>
                              dispatch(toggleWishlistItem(item.id))
                            }
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
                                  className="img-fluid h-100 w-100 cart-wishlist-image"
                                />
                              </Link>
                            </div>
                            <div className="col-8">
                              <div className="card-body d-flex flex-column h-100">
                                <h5 className="card-title pe-4 cart-wishlist-title font-zh-display">
                                  {item.title}
                                </h5>

                                <p className="card-text mb-0">
                                  NT${item.price}{" "}
                                  <span className="text-muted ">
                                    <del>NT${item.origin_price}</del>
                                  </span>
                                </p>
                                <div className="mt-auto d-flex gap-2 flex-wrap">
                                  <ViewProductButton
                                    productId={item.id}
                                    className="btn btn-outline-dark"
                                  >
                                    查看商品
                                  </ViewProductButton>
                                  <AddToCartButton
                                    className="btn btn-dark"
                                    onClick={(e) => handleAddCart(e, item.id)}
                                  >
                                    加入購物車
                                  </AddToCartButton>
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
      {showDeleteAllModal && (
        <>
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            aria-modal="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title font-zh-display">刪除確認</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={closeDeleteAllModal}
                    disabled={isDeletingAll}
                  ></button>
                </div>
                <div className="modal-body">
                  <p className="mb-0 font-zh-display">
                    確定要刪除所有購物車中的商品嗎？
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-secondary rounded-0"
                    onClick={closeDeleteAllModal}
                    disabled={isDeletingAll}
                  >
                    取消
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger rounded-0"
                    onClick={deleteAll}
                    disabled={isDeletingAll}
                  >
                    {isDeletingAll ? "刪除中..." : "刪除"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal-backdrop fade show"
            onClick={closeDeleteAllModal}
          ></div>
        </>
      )}
      <YoumaylikeSwiper />
    </>
  );
}
