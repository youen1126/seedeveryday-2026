import { useNavigate } from "react-router";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="container text-center py-5">
      <div className="mb-4">
        <i className="bi bi-check-circle-fill text-success fs-1"></i>
      </div>

      <h2 className="mb-3">訂單送出成功</h2>

      <p className="text-muted">感謝你的購買，我們已收到你的訂單。</p>

      <div className="mt-4">
        <button
          className="btn btn-dark me-3"
          onClick={() => navigate("/products")}
        >
          繼續購物
        </button>

        <button className="btn btn-outline-dark" onClick={() => navigate("/")}>
          回到首頁
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;
