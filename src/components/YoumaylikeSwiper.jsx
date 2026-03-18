import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useNavigate } from "react-router";
import "swiper/css";
import { useSelector } from "react-redux";

export default function YoumaylikeSwiper() {
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.products);

  const handmadeProducts = products.filter(
    (item) => item.category === "種子小物",
  );

  //進入商品詳細頁
  const handleViewDetail = (e, id) => {
    e.preventDefault();
    navigate(`/product/${id}`);
  };

  return (
    <div className="container">
      <h3 className="fw-bold">你可能也喜歡. . . . . .</h3>
      <div className="swiper mt-4 mb-5">
        <div className="swiper-wrapper">
          {handmadeProducts.length === 0 ? (
            <p>Loading...</p>
          ) : handmadeProducts.length === 0 ? (
            <p>目前沒有相關商品</p>
          ) : (
            <Swiper
              modules={[Autoplay]}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              slidesPerView={Math.min(handmadeProducts.length, 2)}
              spaceBetween={10}
              loop={handmadeProducts.length >= 3}
              breakpoints={{
                767: {
                  slidesPerView: Math.min(handmadeProducts.length, 3),
                  spaceBetween: 5,
                },
              }}
            >
              {handmadeProducts.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="card border-0 mb-4 position-relative">
                    <img
                      src={item.imageUrl}
                      style={{
                        height: "350px",
                        objectFit: "cover",
                      }}
                      className="card-img-top rounded-0"
                      alt={item.title}
                      onClick={(e) => handleViewDetail(e, item.id)}
                    />
                    <div className="card-body p-0">
                      <h4 className="mb-0 mt-3">
                        <a
                          href="#"
                          onClick={(e) => handleViewDetail(e, item.id)}
                        >
                          {item.title}
                        </a>
                      </h4>
                      <p className="card-text mb-0">
                        NT${item.orign_price}
                        <span className="text-muted">
                          <del>NT${item.price}</del>
                        </span>
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </div>
  );
}
