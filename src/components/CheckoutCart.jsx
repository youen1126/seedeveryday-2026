import { useSelector } from "react-redux";
import { selectCartTotal } from "../slice/cartSlice";
import { curryency } from "../utils/filter";

export default function CheckoutCart() {
  const carts = useSelector((state) => state.cart.carts);
  const total = useSelector(selectCartTotal);
  return (
    <div className="col-md-4">
      <div className="border p-4 mb-4">
        <h4 className="mb-4">購買項目</h4>
        {carts.map((item) => {
          return (
            <div className="d-flex p-2" key={item.id}>
              <img
                src={item.product.imageUrl}
                alt={item.product.title}
                className="me-2"
                style={{ width: "48px", height: "48px", objectFit: "cover" }}
              />
              <div className="w-100">
                <div className="d-flex justify-content-between fw-bold">
                  <p className="mb-0">{item.product.title}</p>
                  <p className="mb-0">{item.qty}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="text-muted mb-0">
                    <small>NT${curryency(item.qty * item.product.price)}</small>
                  </p>
                  <p className="mb-0">
                    NT${curryency(item.qty * item.product.price)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        <table className="table mt-4 border-top border-bottom text-muted">
          <tbody>
            <tr>
              <th scope="row" className="border-0 px-0 pt-4 font-weight-normal">
                小計
              </th>
              <td className="text-end border-0 px-0 pt-4">
                NT${curryency(total)}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="d-flex justify-content-between mt-4">
          <p className="mb-0 h4 fw-bold">總金額</p>
          <p className="mb-0 h4 fw-bold">NT${curryency(total)}</p>
        </div>
      </div>
    </div>
  );
}
