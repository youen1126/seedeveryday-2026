import { Link } from "react-router";

export default function EmptyCart() {
  return (
    <div className="text-center py-5 my-5">
      <i className="bi bi-cart-x fs-1 text-muted"></i>

      <h3 className="mt-3 font-zh-display">購物車是空的</h3>

      <p className="text-muted">還沒有加入任何商品</p>

      <Link to="/product" className="btn btn-dark mt-3">
        去逛商品
      </Link>
    </div>
  );
}
