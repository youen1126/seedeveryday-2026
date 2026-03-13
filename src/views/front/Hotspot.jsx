import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function Hotspot() {
  const products = useSelector((state) => state.products.products);
  const navigate = useNavigate();

  const handmadeProducts = products.filter(
    (item) => item.category === "種子小物",
  );

  //進入商品詳細頁
  const handleViewDetail = (e, id) => {
    e.preventDefault();
    navigate(`/product/${id}`);
  };
  return (
    <div className="row mt-5">
      {handmadeProducts.map((product) => {
        return (
          <div className="col-md-6 mt-md-4" key={product.id}>
            <div className="card img-hover border-0 mb-4 position-relative position-relative">
              <img
                src={product.imageUrl}
                style={{
                  height: "350px",
                  objectFit: "cover",
                }}
                className="card-img-top rounded-0"
                alt={product.title}
              />
              <div className="card-body p-0">
                <h4 className="mb-0 mt-4">{product.title}</h4>
                <div className="d-flex justify-content-between mt-3">
                  <p className="card-text text-muted mb-0 w-75">
                    {product.description}
                  </p>
                  <button
                    className="btn btn-outline-dark rounded-0 text-nowrap"
                    onClick={(e) => handleViewDetail(e, product.id)}
                  >
                    暸解詳細
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
