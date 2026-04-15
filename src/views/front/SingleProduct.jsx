import { useEffect, useRef, useState } from "react";
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

function formatDescriptionText(text) {
  return (text || "")
    .split(/(?<=[。.])/)
    .map((sentence) => sentence.trim())
    .filter(Boolean)
    .map((sentence, sentenceIndex) => ({
      id: `sentence-${sentenceIndex}`,
      lines: sentence
        .split(/(?<=[，,])/)
        .map((line) => line.trim())
        .filter(Boolean),
    }));
}

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
  const addToCartButtonRef = useRef(null);
  const [showFloatingAddCart, setShowFloatingAddCart] = useState(false);

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

  useEffect(() => {
    const targetButton = addToCartButtonRef.current;
    if (!targetButton) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowFloatingAddCart(!entry.isIntersecting);
      },
      {
        threshold: 0.2,
      },
    );

    observer.observe(targetButton);
    return () => observer.disconnect();
  }, [product.id]);

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
  const descriptionImages = (
    Array.isArray(product.imagesUrl) ? product.imagesUrl : []
  )
    .filter(Boolean)
    .slice(0, 3);
  const shortDescription =
    (product.description || "").length > 20
      ? `${product.description.slice(0, 43)} . . . . 詳見下方商品介紹`
      : product.description;
  const formattedDescription = formatDescriptionText(product.description);

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
                  <p>{shortDescription}</p>
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
                      ref={addToCartButtonRef}
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
                  規格說明 / 常見問題
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
                    <div className="single-product-description-text p-5 text-center">
                      {formattedDescription.map((sentence) => (
                        <p
                          key={sentence.id}
                          className="single-product-description-paragraph mb-0"
                        >
                          {sentence.lines.map((line, index) => (
                            <span
                              key={`${sentence.id}-${index}`}
                              className="single-product-description-line"
                            >
                              {line}
                            </span>
                          ))}
                        </p>
                      ))}
                    </div>
                  </div>
                ) : null}
                {activeTab === "spec" ? (
                  <div className="single-product-tab-spec">
                    <p className="single-product-tab-spec-content mb-0">
                      {product.content}
                    </p>
                    <section
                      className="single-product-faq"
                      aria-label="常見問題"
                    >
                      <h3 className="single-product-faq-title">常見問題</h3>
                      <ul className="single-product-faq-list mb-0">
                        <li className="single-product-faq-item">
                          <p className="single-product-faq-question">
                            商品出貨後是否會通知？
                          </p>
                          <p className="single-product-faq-answer mb-0">
                            商品出貨後，系統將會發送「出貨通知信」至您訂購時所留存的聯絡E-mail。
                          </p>
                        </li>
                        <li className="single-product-faq-item">
                          <p className="single-product-faq-question">
                            退換貨說明？
                          </p>
                          <p className="single-product-faq-answer mb-0">
                            如需要退換貨，請先聯絡客服，說明退換貨原因。
                          </p>
                        </li>
                        <li className="single-product-faq-item">
                          <p className="single-product-faq-question">
                            什麼情況可能無法辦理退貨？
                          </p>
                          <ol className="single-product-faq-sublist mb-0">
                            <li>超過7天鑑賞期。</li>
                            <li>客製化商品。</li>
                            <li>
                              已非全新狀態（外觀不得有刮傷、破損、受潮...等）。
                            </li>
                            <li>
                              沒有完整包裝（商品、附件、外盒、保護袋、配件紙箱、保麗龍、隨貨文件、贈品...等）。
                            </li>
                          </ol>
                        </li>
                        <li className="single-product-faq-item">
                          <p className="single-product-faq-question">
                            如何計算「七天鑑賞期」？
                          </p>
                          <p className="single-product-faq-answer mb-0">
                            由消費者完成簽收取件的隔日開始算起至第7天止。
                          </p>
                        </li>
                        <li className="single-product-faq-item">
                          <p className="single-product-faq-question">
                            退款方式？
                          </p>
                          <p className="single-product-faq-answer mb-0">
                            需提供您的匯款資料E-mail
                            至客服中心，退款申請後預計7-10天(不含假日)退還至您指定的帳戶中。
                          </p>
                        </li>
                      </ul>
                    </section>
                  </div>
                ) : null}
                {activeTab === "shippingPayment" ? (
                  <div className="single-product-shipping-payment">
                    <div className="single-product-shipping-payment-column">
                      <p className="single-product-tab-section-title mb-2 fw-semibold">
                        <i
                          className="fa-solid fa-truck-fast"
                          aria-hidden="true"
                        ></i>
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
                        <i
                          className="fa-regular fa-credit-card"
                          aria-hidden="true"
                        ></i>
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
      {showFloatingAddCart && product?.id ? (
        <button
          type="button"
          className="btn btn-dark single-product-floating-cart-btn"
          onClick={(e) => handleAddCart(e, product.id, qty)}
        >
          加入購物車
        </button>
      ) : null}
      <YoumaylikeSwiper />
      <BackToTop />
    </div>
  );
}
