import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ViewProductButton from "@/components/front/ViewProductButton";
import { createAsyncGetProducts } from "@/slice/productsSlice";

export default function Hotspot() {
  const dispatch = useDispatch();
  const { products, currentCategory } = useSelector((state) => state.products);
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

  return (
    <div className="row mt-5">
      <h2 className="mb-1 text-center font-zh-display fw-bold ">本月主打</h2>
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

                  <ViewProductButton
                    productId={product.id}
                    className="btn btn-outline-dark rounded-0 text-nowrap align-self-start"
                  >
                    查看商品
                  </ViewProductButton>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
