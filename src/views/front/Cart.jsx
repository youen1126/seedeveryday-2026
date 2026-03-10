import { useDispatch, useSelector } from "react-redux";
import {
  createAsyncDelCart,
  selectCartTotal,
  selectCartFinallyTotal,
} from "../../slice/cartSlice";

export default function Cart() {
  const carts = useSelector((state) => state.cart.carts);
  const total = useSelector(selectCartTotal);
  const finally_total = useSelector(selectCartFinallyTotal);
  const dispatch = useDispatch();

  const handleDelItem = (e, id) => {
    e.preventDefault();
    dispatch(createAsyncDelCart(id));
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
          </div>
          {carts.map((item) => {
            return (
              <div className="d-flex mt-3 bg-light" key={item.id}>
                <img
                  src={item.product.imageUrl}
                  alt={item.product.title}
                  style={{
                    width: "100px",
                    height: "100px",
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
                  {/* <p className="mb-1 text-muted" style={{ fontSize: "14px" }}>
                    {item.product.description}
                  </p> */}
                  <div className="d-flex justify-content-between align-items-center w-100">
                    <div className="input-group w-50 align-items-center p-1">
                      <div className="input-group-prepend pe-1">
                        <a href="#">
                          {" "}
                          <i className="fas fa-minus"></i>
                        </a>
                      </div>
                      <input
                        type="text"
                        className="form-control border-0 text-center my-auto shadow-none bg-light px-0"
                        placeholder=""
                        aria-label="Example text with button addon"
                        aria-describedby="button-addon1"
                        value="1"
                      />
                      <div className="input-group-append ps-1">
                        <a href="#">
                          <i className="fas fa-plus"></i>
                        </a>
                      </div>
                    </div>
                    <p className="mb-0 ms-auto">NT${item.product.price}</p>
                  </div>
                </div>
              </div>
            );
          })}
          <table className="table mt-4 text-muted">
            {/* <tbody>
              <tr>
                <th scope="row" className="border-0 px-0 font-weight-normal">
                  結算
                </th>
                <td className="text-end border-0 px-0">NT${total || "未填"}</td>
              </tr>
            </tbody> */}
          </table>
          <div className="d-flex justify-content-between mt-4">
            <p className="mb-0 h4 fw-bold">總金額</p>
            <p className="mb-0 h4 fw-bold">NT${total}</p>
          </div>
          <button
            type="button"
            className="btn btn-dark btn-block mt-4 rounded-0 py-3"
          >
            送出購物車
          </button>
        </div>
      </div>
    </div>
  );
}
