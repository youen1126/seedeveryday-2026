import { Link } from "react-router";
import CheckoutFlow from "./CheckoutFlow";
import { scrollToTop } from "@/utils/scrollToTop";
import { useEffect } from "react";

function OrderSuccess() {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <div className="container text-center py-5">
      <CheckoutFlow currentStep={3} />
      <div className="mb-4">
        <i className="bi bi-check-circle-fill text-success fs-1"></i>
      </div>

      <h2 className="mb-3">訂單送出成功</h2>

      <p className="text-muted">感謝你的購買，我們已收到你的訂單。</p>

      <div className="mt-4">
        <Link className="btn btn-dark me-3" to="/product">
          繼續購物
        </Link>

        <Link className="btn btn-outline-dark" to="/">
          回到首頁
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
