import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { createAsyncAddCart } from "../../slice/cartSlice";
import { getThisProductApi } from "../../services/product";
import useMessage from "../../hooks/useMessage";

export default function SingleProducts() {
  const { id } = useParams();
  const [product, setProduct] = useState({ imagesUrl: [] });
  const dispatch = useDispatch();
  const { showSuccess, showError } = useMessage();

  useEffect(() => {
    const getProduct = async (id) => {
      try {
        const response = await getThisProductApi(id);
        setProduct(response.data.product);
      } catch (error) {
        console.error("取得產品資料失敗", error);
        showError("取得產品資料失敗");
      }
    };
    getProduct(id);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);

  const handleAddCart = (e, id, qty = 1) => {
    e.preventDefault();
    dispatch(
      createAsyncAddCart({
        id,
        qty,
      }),
    );
    showSuccess("成功加入購物車");
  };

  const handleNum = () => {
    return;
  };

  return (
    <div>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-7">
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="my-4">
                <img
                  src={product.imageUrl}
                  style={{
                    height: "500px",
                    width: "500px",
                    objectFit: "cover",
                  }}
                  alt=""
                  className="img-fluid mt-4"
                />
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-white px-0 mb-0 py-3">
                <li className="breadcrumb-item">
                  <Link className="text-muted" to="/">
                    Home
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link className="text-muted" to="/product">
                    Products
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Detail
                </li>
              </ol>
            </nav>
            <h2 className="fw-bold h1 mb-1">{product.title}</h2>
            <br />
            <div className="col-md-12">
              <p>{product.description}</p>
            </div>
            <p className="mb-0 text-muted text-end">
              <del>NT${product.origin_price}</del>
            </p>

            <p className="h4 fw-bold text-end">NT${product.price}</p>
            <div className="row align-items-center">
              <div className="col-6">
                <div className="input-group my-3 bg-light rounded">
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-outline-dark border-0 py-2"
                      type="button"
                      id="button-addon1"
                    >
                      <i className="bi bi-dash"></i>
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control border-0 text-center my-auto shadow-none bg-light"
                    placeholder=""
                    aria-label="Example text with button addon"
                    aria-describedby="button-addon1"
                    value="1"
                    onChange={handleNum}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-dark border-0 py-2"
                      type="button"
                      id="button-addon2"
                    >
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <button
                  type="button"
                  className="text-nowrap btn btn-dark w-100 py-2"
                  onClick={(e) => handleAddCart(e, product.id)}
                >
                  加入購物車
                </button>
              </div>
            </div>
          </div>
          {product.imagesUrl?.map((item, index) => {
            return (
              <div className="my-4" key={index}>
                <img
                  src={item}
                  style={{
                    height: "500px",
                    width: "500px",
                    objectFit: "cover",
                  }}
                  alt=""
                  className="img-fluid mt-4"
                />
              </div>
            );
          })}
        </div>
        <div className="row my-5"></div>
      </div>
    </div>
  );
}
