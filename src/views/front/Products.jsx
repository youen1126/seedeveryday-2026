import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getProductAllApi, getProductApi } from "../../services/product";
import { useDispatch } from "react-redux";
import { createAsyncAddCart } from "../../slice/cartSlice";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;
export default function Products() {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("全部商品");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    //取全部產品
    const getAllProducts = async () => {
      try {
        const res = await getProductAllApi();
        const result = [
          "全部商品",
          ...new Set(
            res.data.products.map((item) => {
              return item.category;
            }),
          ),
        ];
        //console.log(res, result);
        setCategories(result);
      } catch (error) {
        console.log(error.response);
      }
    };
    getAllProducts();
    //取當前頁數產品
    const getProducts = async (page = 1, category) => {
      try {
        const res = await getProductApi(page, category);
        //console.log(res.data.products);
        setProduct(res.data.products);
      } catch (error) {
        console.log(error.response);
      }
    };
    getProducts(1, currentCategory);
  }, [currentCategory]);

  const handleViewDetail = (e, id) => {
    e.preventDefault();
    navigate(`/product/${id}`);
  };

  const handleAddCart = (e, id, qty = 1) => {
    e.preventDefault();
    dispatch(
      createAsyncAddCart({
        id,
        qty,
      }),
    );
  };
  return (
    <>
      <div
        className="position-relative d-flex align-items-center justify-content-center"
        style={{ minHeight: "150px" }}
      >
        <div
          className="position-absolute"
          style={{
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
            backgroundImage:
              "url(https://i.pinimg.com/1200x/8c/38/39/8c3839dcb4661963056fa7ee7b56a6d8.jpg)",
            opacity: "0.4",
          }}
        ></div>
        <h4 className="fw-bold">把祝福帶進每一天</h4>
      </div>
      <div className="container mt-md-5 mt-3 mb-7">
        <div className="row">
          {/* 分類區 */}
          <div className="col-md-4">
            <div
              className="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3"
              id="accordionExample"
            >
              <div className="card border-0">
                <div className="card-body py-0">
                  <ul className="list-unstyled">
                    {categories.map((category) => {
                      return (
                        <li key={category}>
                          <a
                            href="#"
                            className={`py-2 d-block text-muted ${currentCategory === category ? "text-dark fw-bold" : "text-muted"}`}
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentCategory(category);
                            }}
                          >
                            {category}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="row">
              {/* 產品列表 */}
              {product.map((item) => {
                return (
                  <div className="col-md-6" key={item.id}>
                    <div className="card border-0 mb-4 position-relative position-relative">
                      <img
                        src={item.imageUrl}
                        className="card-img-top rounded-0"
                        alt={item.title}
                        onClick={(e) => handleViewDetail(e, item.id)}
                      />
                      <a href="#" className="text-dark">
                        <i
                          className="fa-regular fa-heart position-absolute"
                          style={{
                            right: "16px",
                            top: "16px",
                            fontSize: "18px",
                          }}
                        ></i>
                      </a>
                      <div className="card-body p-0">
                        <h4 className="mb-0 mt-3">
                          <a
                            href="#"
                            onClick={(e) => handleViewDetail(e, item.id)}
                          >
                            {item.title}
                          </a>
                        </h4>
                        <div className="py-3">
                          <button
                            type="button"
                            className="text-nowrap btn btn-dark w-20 p-2"
                            onClick={(e) => handleAddCart(e, item.id)}
                          >
                            加入購物車
                          </button>
                        </div>
                      </div>
                      <p className="card-text mb-0">
                        NT${item.price}{" "}
                        <span className="text-muted ">
                          <del>NT${item.origin_price}</del>
                        </span>
                      </p>
                      <p className="text-muted mt-3">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* 頁碼區 */}
            <nav className="d-flex justify-content-center">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
