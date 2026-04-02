import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { createAsyncAddCart } from "../../slice/cartSlice";
import { getThisProductApi } from "../../services/product";
import BackToTop from "@/components/BackToTop";
import useMessage from "../../hooks/useMessage";
import { Oval } from "react-loader-spinner";
import YoumaylikeSwiper from "../../components/YoumaylikeSwiper";
import { toggleWishlistItem } from "../../slice/wishlistSlice";

export default function SingleProducts() {
  const { id } = useParams();
  const [product, setProduct] = useState({ imagesUrl: [] });
  const dispatch = useDispatch();
  const { showSuccess, showError } = useMessage();
  const wishList = useSelector((state) => state.wishlist.items);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [animatingId, setAnimatingId] = useState(null);

  useEffect(() => {
    const getProduct = async (id) => {
      try {
        setLoading(true);
        const response = await getThisProductApi(id);
        setProduct(response.data.product);
      } catch (error) {
        console.error("取得產品資料失敗", error);
        showError("取得產品資料失敗");
      } finally {
        setLoading(false);
      }
    };
    getProduct(id);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id, showError]);

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

  const handleNum = (newQty) => {
    if (newQty < 1) return; // 不讓小於1
    setQty(newQty);
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
              <div className="my-4 img-hover position-relative">
                {loading ? (
                  <div className="login-loading">
                    <Oval
                      height={50}
                      width={50}
                      color="#ff7a15ff"
                      secondaryColor="#ccc"
                      strokeWidth={4}
                    />
                  </div>
                ) : (
                  <>
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="img-fluid mt-4 img-size-Xlarge"
                    />
                  </>
                )}
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
            <div className="d-flex align-items-center justify-content-between gap-3">
              <h2 className="fw-bold h1 mb-1">{product.title}</h2>
              <button
                type="button"
                className="p-0 border-0 bg-transparent d-inline-flex align-items-center justify-content-center"
                aria-label="加入收藏"
                onClick={() => {
                  dispatch(toggleWishlistItem(product.id));
                  setAnimatingId(product.id);
                  setTimeout(() => {
                    setAnimatingId(null);
                  }, 350);
                }}
              >
                <i
                  className={`fa-${
                    wishList[product.id] ? "solid" : "regular"
                  } fa-heart ${animatingId === product.id ? "is-animating" : ""}`}
                  style={{
                    color: wishList[product.id] ? "#ff7a15ff" : "#212529",
                    fontSize: "20px",
                  }}
                ></i>
              </button>
            </div>
            <br />
            <div className="col-md-12">
              <p>{product.description}</p>
              <p>{product.content}</p>
            </div>
            <p className="mb-0 text-muted text-end">
              <del>NT${product.origin_price}</del>
            </p>

            <p className="h4 fw-bold text-end">NT${product.price}</p>
            <div className="row align-items-center">
              {/* 數量選擇 */}
              <div className="col-6">
                <div className="input-group my-3 bg-light rounded">
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-outline-dark border-0 py-2"
                      type="button"
                      disabled={qty === 1}
                      onClick={() => handleNum(qty - 1)}
                    >
                      -
                    </button>
                  </div>
                  <span className="qty-number form-control border-0 text-center my-auto shadow-none bg-light">
                    {qty}
                  </span>
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-dark border-0 py-2"
                      type="button"
                      onClick={() => handleNum(qty + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              {/* 加入購物車按鈕 */}
              <div className="col-6">
                <button
                  type="button"
                  className="text-nowrap btn btn-dark w-100 py-2"
                  onClick={(e) => handleAddCart(e, product.id, qty)}
                >
                  加入購物車
                </button>
              </div>
            </div>
          </div>
          {product.imagesUrl?.map((item, index) => {
            return (
              <div className="my-4 img-hover" key={index}>
                <img
                  src={item}
                  alt="其他附圖"
                  className="img-fluid mt-4 img-size-Xlarge"
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
        <div className="row my-5"></div>
      </div>
      <YoumaylikeSwiper />
      <BackToTop />
    </div>
  );
}
