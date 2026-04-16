import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { createAsyncGetProducts } from "@/slice/productsSlice";

export default function Hotspot() {
  const dispatch = useDispatch();
  const { products, currentCategory } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const descriptionClampStyle = {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
    overflow: "hidden",
  };

  useEffect(() => {
    dispatch(
      createAsyncGetProducts({
        page: 1,
        category: currentCategory === "全部商品" ? "" : currentCategory,
      }),
    );
  }, [dispatch, currentCategory]);

  const handmadeProducts = (products || []).filter(
    (item) => item.category === "種子小物",
  );

  //進入商品詳細頁
  const handleViewDetail = (e, id) => {
    e.preventDefault();
    navigate(`/product/${id}`);
  };
  return (
    <div className="row mt-5">
      <h2 className="mb-1 text-center font-zh-display fw-bold ">熱門商品</h2>
      {handmadeProducts.map((product) => {
        return (
          <div className="col-md-6 mt-md-4" key={product.id}>
            <div className="card img-hover border-0 mb-4 position-relative position-relative">
              <img
                src={product.imageUrl}
                className="card-img-top rounded-0 img-size-large"
                alt={product.title}
              />
              <div className="card-body p-0">
                <h4 className="mt-4 font-zh-display fw-bold ">
                  {product.title}
                </h4>

                <div className="d-flex justify-content-between mt-3 align-items-start">
                  <p
                    className="card-text text-muted mb-0 w-75"
                    style={descriptionClampStyle}
                  >
                    {product.description}
                  </p>

                  <button
                    className="btn btn-outline-dark rounded-0 text-nowrap align-self-start"
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
