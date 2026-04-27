import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import ImageLightbox from "@/components/common/ImageLightbox";
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
    mobileImage: getAssetPath("seedevery-banner03-mob.webp"),
    alt: "活動橫幅：SeedEvery 手作活動主視覺",
  },
  {
    id: "promo-2",
    image: getAssetPath("seedevery-banner01.jpg"),
    mobileImage: getAssetPath("seedevery-banner01-mob.webp"),
    alt: "活動橫幅：SeedEvery 手作活動主視覺",
  },
  {
    id: "promo-3",
    image: getAssetPath("seedevery-banner02.jpg"),
    mobileImage: getAssetPath("seedevery-banner02-mob.webp"),
    alt: "活動橫幅：SeedEvery 手作活動主視覺",
  },
];

export default function HomeBanner() {
  const [activeBanner, setActiveBanner] = useState(null);

  const handleOpenLightbox = (banner) => {
    setActiveBanner(banner);
  };

  const handleCloseLightbox = () => {
    setActiveBanner(null);
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
          {promoBanners.map((banner, index) => (
            <SwiperSlide key={banner.id}>
              <div className="home-promo-banner-slide">
                <button
                  type="button"
                  className="home-promo-banner-trigger"
                  onClick={() => handleOpenLightbox(banner)}
                  aria-label={`${banner.alt}（點擊放大圖片）`}
                >
                  <picture>
                    <source
                      media="(max-width: 767.98px)"
                      srcSet={banner.mobileImage}
                    />
                    <img
                      src={banner.image}
                      alt={banner.alt}
                      className="home-promo-banner-image"
                      loading={index === 0 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "auto"}
                      decoding="async"
                    />
                  </picture>
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <ImageLightbox
        isOpen={Boolean(activeBanner)}
        image={activeBanner?.image}
        mobileImage={activeBanner?.mobileImage}
        alt={activeBanner?.alt}
        ariaLabel={activeBanner ? `${activeBanner.alt} 放大檢視` : undefined}
        onClose={handleCloseLightbox}
      />
    </>
  );
}
