import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

import BackToTop from "@/components/BackToTop";
import YoumaylikeSwiper from "@/components/front/YoumaylikeSwiper";
import useMessage from "@/hooks/useMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getThisProductApi } from "@/services/product";
import { createAsyncAddCart } from "@/slice/cartSlice";
import { toggleWishlistItem } from "@/slice/wishlistSlice";
import { scrollToTop } from "@/utils/scrollToTop";

export default function SingleProducts() {
  const { id } = useParams();
  const [product, setProduct] = useState({ imagesUrl: [] });
  const [activeTab, setActiveTab] = useState("description");
  const dispatch = useDispatch();
  const { showSuccess, showError } = useMessage();
  const wishList = useSelector((state) => state.wishlist.items);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [animatingId, setAnimatingId] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

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
    scrollToTop();
    setActiveTab("description");
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

  const galleryImages = [
    product.imageUrl,
    ...(Array.isArray(product.imagesUrl) ? product.imagesUrl : []),
  ].filter(Boolean);
  const descriptionImages = (Array.isArray(product.imagesUrl)
    ? product.imagesUrl
    : []
  )
    .filter(Boolean)
    .slice(0, 3);

  return (
    <div className="single-product-page">
      <div className="container">
        <div className="row align-items-stretch single-product-hero">
          <div className="col-md-7">
            <div className="my-4 position-relative single-product-gallery">
              {loading ? <LoadingSpinner /> : null}
              <Swiper
                modules={[Thumbs]}
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                className="single-product-main-swiper"
              >
                {(galleryImages.length > 0 ? galleryImages : [""]).map(
                  (image, index) => (
                    <SwiperSlide key={`${image}-${index}`}>
                      <div className="single-product-square">
                        {image ? (
                          <img
                            src={image}
                            alt={`${product.title || "商品圖片"}-${index + 1}`}
                            className="single-product-main-image"
                            loading="lazy"
                          />
                        ) : null}
                      </div>
                    </SwiperSlide>
                  ),
                )}
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                modules={[FreeMode, Thumbs]}
                freeMode
                watchSlidesProgress
                slidesPerView={4}
                spaceBetween={12}
                className="single-product-thumbs-swiper mt-3"
                breakpoints={{
                  0: {
                    slidesPerView: 3,
                  },
                  768: {
                    slidesPerView: 4,
                  },
                }}
              >
                {(galleryImages.length > 0 ? galleryImages : [""]).map(
                  (image, index) => (
                    <SwiperSlide key={`thumb-${image}-${index}`}>
                      <div className="single-product-thumb-square">
                        {image ? (
                          <img
                            src={image}
                            alt={`${product.title || "商品縮圖"}-${index + 1}`}
                            className="single-product-thumb-image"
                            loading="lazy"
                          />
                        ) : null}
                      </div>
                    </SwiperSlide>
                  ),
                )}
              </Swiper>
            </div>
          </div>
          <div className="col-md-5">
            <div className="single-product-info my-4">
              <div className="single-product-info-top">
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
                <div className="single-product-description">
                  <p>{product.description}</p>
                  <p className="mb-0">{product.content}</p>
                </div>
                <div className="single-product-promo">
                  <p className="mb-2">全店，滿千免運</p>
                  <p className="mb-2">全店，國際運輸滿3500免運費</p>
                  <p className="mb-0">全店，滿2500送贈品</p>
                </div>
              </div>
              <div className="single-product-info-bottom">
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
            </div>
          </div>
        </div>
        <div className="row single-product-tabs-row">
          <div className="col-12">
            <section className="single-product-tabs">
              <div className="single-product-tabs-nav" role="tablist">
                <button
                  type="button"
                  className={`single-product-tab-btn ${
                    activeTab === "description" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("description")}
                >
                  商品介紹
                </button>
                <button
                  type="button"
                  className={`single-product-tab-btn ${
                    activeTab === "spec" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("spec")}
                >
                  規格說明
                </button>
                <button
                  type="button"
                  className={`single-product-tab-btn ${
                    activeTab === "shippingPayment" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("shippingPayment")}
                >
                  送貨和付款方式
                </button>
              </div>
              <div className="single-product-tabs-content">
                {activeTab === "description" ? (
                  <div className="single-product-tab-description">
                    {descriptionImages.length > 0 ? (
                      <div className="single-product-description-images">
                        {descriptionImages.map((image, index) => (
                          <img
                            key={`${image}-${index}`}
                            src={image}
                            alt={`${product.title || "商品介紹圖片"}-${index + 1}`}
                            className="single-product-description-image"
                            loading="lazy"
                          />
                        ))}
                      </div>
                    ) : null}
                    <p className="mb-0">{product.description}</p>
                  </div>
                ) : null}
                {activeTab === "spec" ? <p>{product.content}</p> : null}
                {activeTab === "shippingPayment" ? (
                  <div className="single-product-shipping-payment">
                    <div className="single-product-shipping-payment-column">
                      <p className="single-product-tab-section-title mb-2 fw-semibold">
                        <i className="fa-solid fa-truck-fast" aria-hidden="true"></i>
                        <span>送貨方式</span>
                      </p>
                      <ul className="mb-0">
                        <li>外島郵寄(中華郵政)</li>
                        <li>全家 取貨付款 (B2C)</li>
                        <li>7-11 取貨付款 (B2C)</li>
                      </ul>
                    </div>
                    <div className="single-product-shipping-payment-column">
                      <p className="single-product-tab-section-title mb-2 fw-semibold">
                        <i className="fa-regular fa-credit-card" aria-hidden="true"></i>
                        <span>付款方式</span>
                      </p>
                      <ul className="mb-0">
                        <li>宅配貨到付款</li>
                        <li>7-11 取貨付款</li>
                        <li>信用卡付款</li>
                      </ul>
                    </div>
                  </div>
                ) : null}
              </div>
            </section>
          </div>
        </div>
      </div>
      <YoumaylikeSwiper />
      <BackToTop />
    </div>
  );
}
