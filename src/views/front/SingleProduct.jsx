import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createAsyncAddCart } from "../../slice/cartSlice";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function SingleProducts() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async (id) => {
      try {
        const response = await axios.get(
          `${API_BASE}/api/${API_PATH}/product/${id}`,
        );
        //console.log("單一頁", response.data.product);
        setProduct(response.data.product);
      } catch (error) {
        console.error("取得產品資料失敗", error);
      }
    };
    getProduct(id);
  }, [id]);

  const handleAddCart = (e, id, qty = 1) => {
    e.preventDefault();
    dispatch(
      createAsyncAddCart({
        id,
        qty,
      }),
    );
  };

  const handleNum = () => {
    console.log("test input bug");
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
              <div className="carousel-inner">
                {/* {product.map((item, index) => {
                  return (
                    <>
                      <div className="carousel-item " key={item}>
                        <img
                          src={item.imageUrl}
                          className="d-block w-100"
                          alt={`商品圖片${index + 1}`}
                        />
                      </div>
                    </>
                  );
                })} */}
                <div className="carousel-item active">
                  <img
                    src="https://i.pinimg.com/1200x/67/29/bd/6729bd79f1d6da4f6420583901149ed7.jpg"
                    className="d-block w-100"
                    alt="商品1圖片1"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://i.pinimg.com/avif/736x/a9/95/35/a9953563f3d0075c6c76fd58bf59d3b5.avf"
                    className="d-block w-100"
                    alt="商品1圖片2"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80"
                    className="d-block w-100"
                    alt="商品1圖片3"
                  />
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#carouselExampleControls"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#carouselExampleControls"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
          <div className="col-md-5">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-white px-0 mb-0 py-3">
                <li className="breadcrumb-item">
                  <a className="text-muted" href="./index.html">
                    Home
                  </a>
                </li>
                <li className="breadcrumb-item">
                  <a className="text-muted" href="./product.html">
                    Products
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Detail
                </li>
              </ol>
            </nav>
            <h2 className="fw-bold h1 mb-1">{product.title}</h2>
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
        </div>
        <div className="row my-5">
          <div className="col-md-6">
            <p>{product.description}</p>
          </div>
          {/* <div className="col-md-3">
            <p className="text-muted">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor
            </p>
          </div> */}
        </div>
        <h3 className="fw-bold">你可能也喜歡</h3>
        {/* swiper滑軌 */}
        <div className="swiper-container mt-4 mb-5">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="card border-0 mb-4 position-relative position-relative">
                <img
                  src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                  className="card-img-top rounded-0"
                  alt="..."
                />
                <a href="#" className="text-dark"></a>
                <div className="card-body p-0">
                  <h4 className="mb-0 mt-3">
                    <a href="#">Lorem ipsum</a>
                  </h4>
                  <p className="card-text mb-0">
                    NT$1,080{" "}
                    <span className="text-muted ">
                      <del>NT$1,200</del>
                    </span>
                  </p>
                  <p className="text-muted mt-3"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
