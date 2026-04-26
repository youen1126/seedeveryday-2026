import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const getAssetPath = (rawPath) => {
  if (!rawPath) return "";

  // Allow external URLs directly.
  if (/^https?:\/\//i.test(rawPath)) return rawPath;

  // Normalize local paths so users can provide:
  // "seedevery-banner01.jpg", "/seedevery-banner01.jpg", or "public/seedevery-banner01.jpg".
  const normalizedPath = rawPath.replace(/^public\//, "").replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${normalizedPath}`;
};

const promoBanners = [
  {
    id: "promo-1",
    image: getAssetPath("seedevery-banner03.jpg"),
    alt: "活動橫幅：SeedEvery 手作活動主視覺",
    href: "#",
  },
  {
    id: "promo-2",
    image: getAssetPath("seedevery-banner01.jpg"),
    alt: "活動橫幅：SeedEvery 手作活動主視覺",
    href: "#",
  },
  {
    id: "promo-3",
    image: getAssetPath("seedevery-banner02.jpg"),
    alt: "活動橫幅：SeedEvery 手作活動主視覺",
    href: "#",
  },
];

export default function HomeBanner() {
  const [showLinkNotice, setShowLinkNotice] = useState(false);

  const handleOpenLinkNotice = (e) => {
    e.preventDefault();
    setShowLinkNotice(true);
  };

  const handleCloseLinkNotice = () => {
    setShowLinkNotice(false);
  };

  return (
    <>
      <section
        className="home-promo-banner-section my-3"
        aria-label="活動橫幅輪播"
      >
        <Swiper
          modules={[Autoplay, Pagination]}
          loop={promoBanners.length > 1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
        >
          {promoBanners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div className="home-promo-banner-slide">
                <a
                  href={banner.href}
                  className="d-block"
                  onClick={handleOpenLinkNotice}
                  aria-label={`${banner.alt}（作品展示虛構連結）`}
                >
                  <img
                    src={banner.image}
                    alt={banner.alt}
                    className="home-promo-banner-image"
                    loading="lazy"
                  />
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {showLinkNotice && (
        <>
          <div
            className="modal fade show d-block portfolio-fade-modal"
            tabIndex="-1"
            role="dialog"
            aria-modal="true"
          >
            <div className="modal-dialog modal-dialog-centered portfolio-fade-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title font-zh-display">連結提示</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={handleCloseLinkNotice}
                  ></button>
                </div>
                <div className="modal-body">
                  <p className="mb-0 font-zh-display">
                    此平台僅作爲作品集展示，此為虛構連結
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-dark rounded-0"
                    onClick={handleCloseLinkNotice}
                  >
                    我知道了
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal-backdrop fade show portfolio-fade-backdrop"
            onClick={handleCloseLinkNotice}
          ></div>
        </>
      )}
    </>
  );
}
