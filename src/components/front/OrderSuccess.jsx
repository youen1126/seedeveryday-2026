import { Link, useLocation } from "react-router";
import CheckoutFlow from "./CheckoutFlow";
import { scrollToTop } from "@/utils/scrollToTop";
import { useEffect } from "react";

function OrderSuccess() {
  const location = useLocation();
  const orderId =
    location?.state?.orderId ||
    location?.state?.order?.id ||
    location?.state?.order_id ||
    "";

  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <div className="container text-center py-5">
      <CheckoutFlow currentStep={3} />
      <div className="mb-4">
        <i className="bi bi-check-circle-fill text-success fs-1"></i>
      </div>

      <h2 className="mb-3 font-zh-display">訂單送出成功</h2>

      <p className="text-muted">感謝你的購買，我們已寄出訂單通知到您的Email</p>
      <div className="text-muted mt-3">
        <div className="d-inline-block rounded py-3 px-5 mb-3 bg-success-subtle">
          <p className="mb-1 fw-bold text-dark">您的訂單編號</p>
          <p className="mb-0 h5 text-dark">
            {orderId || "查詢中（若沒有顯示編號，請聯繫客服信箱）"}
          </p>
        </div>
        <p className="mb-0">訂單後續將用 Email 進行通知</p>
        <hr />
        <p className="mb-0">如有疑問或沒有收到後續通知可聯繫</p>
        <p className="mb-0">客服信箱 seedevery@sedcontent.com</p>{" "}
      </div>

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
