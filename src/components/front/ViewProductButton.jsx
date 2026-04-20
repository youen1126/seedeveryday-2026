import { Link } from "react-router";

export default function ViewProductButton({
  productId,
  className = "btn btn-outline-dark",
  children = "查看商品",
  ...rest
}) {
  return (
    <Link to={`/product/${productId}`} className={className} {...rest}>
      {children}
    </Link>
  );
}
