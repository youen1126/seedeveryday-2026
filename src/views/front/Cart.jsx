import { useDispatch, useSelector } from "react-redux";
import {
  createAsyncDelCart,
  selectCartTotal,
  createAsyncUpdataItemNum,
  createAsyncGetCart,
} from "../../slice/cartSlice";
import { DelAllCartApi } from "../../services/carts";
import { useNavigate } from "react-router";
import EmptyCart from "../../components/EmptyCart";
import useMessage from "../../hooks/useMessage";

export default function Cart() {
  const carts = useSelector((state) => state.cart.carts);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const { loadingItem } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const { showSuccess, showError } = useMessage();
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
      showSuccess("刪除成功");
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
  //進入資料填寫頁
  const handleSubmitCart = (e) => {
    e.preventDefault();
    if (carts.length === 0) return;
    navigate(`/checkout`);
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div
          className="col-md-8 bg-white py-5"
          style={{
            minHeight: "min-height: calc(100vh - 56px - 76px)",
          }}
        >
          <div className="d-flex justify-content-between">
            <h2 className="mt-2">購物車清單</h2>
            <div className="text-end mt-4">
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={deleteAll}
                disabled={!carts || carts.length === 0}
              >
                清空購物車
              </button>
            </div>
          </div>
          {carts.length === 0 ? (
            <EmptyCart />
          ) : (
            <>
              {carts.map((item) => {
                return (
                  <div className="d-flex mt-3 bg-light" key={item.id}>
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.title}
                      style={{
                        width: "100px",
                        height: "80px",
                        objectFit: "cover",
                      }}
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
                      <p className="mb-0 fw-bold">{item.product.title}</p>
                      <div className="d-flex justify-content-between align-items-center w-100">
                        <div className="input-group w-50 align-items-center p-1">
                          <div
                            className="input-group input-group-sm"
                            style={{ width: "120px" }}
                          >
                            <button
                              className="btn btn-outline-secondary"
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
                        <p className="mb-0 ms-auto">NT${item.product.price}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
          <table className="table mt-4 text-muted"></table>
          <div className="d-flex justify-content-between mt-4">
            <p className="mb-0 h4 fw-bold">總金額</p>
            <p className="mb-0 h4 fw-bold">NT${total}</p>
          </div>
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
        </div>
      </div>
    </div>
  );
}
