import { useSelector } from "react-redux";
import { selectCartTotal } from "@/slice/cartSlice";
import { curryency } from "@/utils/filter";
import CartThresholdNotice from "@/components/front/CartThresholdNotice";
import OrderSavingsNotice from "@/components/front/OrderSavingsNotice";

export default function CheckoutCart() {
  const carts = useSelector((state) => state.cart.carts);
  const total = useSelector(selectCartTotal);
  const shippingFee = 120;
  const showShippingFee = total <= 1000;
  const showGiftNotice = total > 2500;
  const finalTotal = total + (showShippingFee ? shippingFee : 0);

  return (
    <div className="col-md-4">
      <div className="border p-2 mb-4 bg-gray">
        <h4 className="mb-2 mt-2 text-center font-zh-display fw-bold">
          購買項目
        </h4>
        <hr />
        {carts.length === 0 && (
          <p className="text-center text-muted font-zh-display py-3 mb-0">
            目前尚無商品，請先返回購物車加入商品。
          </p>
        )}
        {carts.map((item) => {
          return (
            <div className="d-flex p-2" key={item.id}>
              <img
                src={item.product.imageUrl}
                alt={item.product.title}
                className="img-size-sm"
              />
              <div className="w-100 cart-item-info font-zh-display">
                <div className="d-flex justify-content-between fw-bold cart-item-top">
                  <p className="mb-0 cart-item-title">{item.product.title}</p>
                  <p className="mb-0 cart-item-qty">{item.qty}</p>
                </div>
                <div className="d-flex justify-content-between flex-wrap cart-item-price-row">
                  <p className="text-muted mb-0">
                    <small>
                      NT${curryency(item.product.price)}{" "}
                      <del>NT${curryency(item.product.origin_price)}</del>
                    </small>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        <table className="table mt-2 border-top border-bottom text-muted font-zh-display checkout-summary-table">
          <tbody>
            <tr>
              <th scope="row" className="border-0 px-0 pt-4 font-weight-normal">
                小計
              </th>
              <td className="text-end border-0 px-0 pt-4">
                NT${curryency(total)}
              </td>
            </tr>
            {showShippingFee && (
              <tr>
                <th
                  scope="row"
                  className="border-0 px-0 pt-2 font-weight-normal"
                >
                  運費
                </th>
                <td className="text-end border-0 px-0 pt-2">
                  NT${curryency(shippingFee)}
                </td>
              </tr>
            )}
            {showGiftNotice && (
              <tr>
                <th
                  scope="row"
                  className="border-0 px-0 pt-2 font-weight-normal"
                >
                  贈品小禮物
                </th>
                <td className="text-end border-0 px-0 pt-2">
                  NT${curryency(0)}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="d-flex justify-content-between mt-4 font-zh-display">
          <p className="mb-0 h4 fw-bold">總金額</p>
          <p className="mb-0 h4 fw-bold">NT${curryency(finalTotal)}</p>
        </div>
        <OrderSavingsNotice carts={carts} total={total} />
        <CartThresholdNotice total={total} />
      </div>
    </div>
  );
}
