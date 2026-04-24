import AddToCartButton from "@/components/front/AddToCartButton";

export default function ProductCard({
  item,
  isWished,
  isAnimating,
  onViewDetail,
  onToggleWishlist,
  onAddCart,
}) {
  return (
    <div className="col-6 col-md-6 card-hover">
      <div className="card img-hover border-0 mb-4 position-relative">
        <img
          src={item.imageUrl}
          className="card-img-top img-size-large products-card-image"
          alt={item.title}
          onClick={(e) => onViewDetail(e, item.id)}
        />
        <button
          type="button"
          className="p-0 border-0 bg-transparent text-dark"
          onClick={() => onToggleWishlist(item.id)}
        >
          <i
            className={`fa-${isWished ? "solid" : "regular"} fa-heart position-absolute ${
              isAnimating ? "is-animating" : ""
            }`}
            style={{
              right: "16px",
              top: "35px",
              fontSize: "18px",
            }}
          ></i>
        </button>
        <div className="card-body p-0">
          <h4 className="mb-0 mt-3 font-zh-display fw-bold">
            <a href="#" onClick={(e) => onViewDetail(e, item.id)}>
              {item.title}
            </a>
          </h4>
          <div className="py-3">
            <AddToCartButton
              className="text-nowrap btn btn-dark w-20 p-2"
              onClick={(e) => onAddCart(e, item.id)}
            >
              加入購物車
            </AddToCartButton>
          </div>
        </div>
        <p className="card-text mb-0 font-zh-display">
          NT${item.price}{" "}
          <span className="text-muted">
            <del>NT${item.origin_price}</del>
          </span>
        </p>
      </div>
    </div>
  );
}
