import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const getAssetPath = (rawPath) => {
  if (!rawPath) return "";

  // Allow external URLs directly.
  if (/^https?:\/\//i.test(rawPath)) return rawPath;

  // Normalize local paths so users can provide:
  // "seedevery-banner01.png", "/seedevery-banner01.png", or "public/seedevery-banner01.png".
  const normalizedPath = rawPath.replace(/^public\//, "").replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${normalizedPath}`;
};

const promoBanners = [
  {
    id: "promo-1",
    image: getAssetPath("seedevery-banner03.png"),
    alt: "活動橫幅：SeedEvery 手作活動主視覺",
  },
  {
    id: "promo-2",
    image: getAssetPath("seedevery-banner01.png"),
    alt: "活動橫幅：SeedEvery 手作活動主視覺",
  },
  {
    id: "promo-3",
    image: getAssetPath("seedevery-banner02.jpg"),
    alt: "活動橫幅：SeedEvery 手作活動主視覺",
  },
];

export default function HomePromoBannerSection() {
  return (
    <section
      className="home-promo-banner-section my-3"
      aria-label="活動橫幅輪播"
    >
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        loop={promoBanners.length > 1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation
        pagination={{ clickable: true }}
      >
        {promoBanners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="home-promo-banner-slide">
              <img
                src={banner.image}
                alt={banner.alt}
                className="home-promo-banner-image"
                loading="lazy"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
