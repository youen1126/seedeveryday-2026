import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useNavigate } from "react-router";
import "swiper/css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toggleWishlistItem } from "../slice/wishlistSlice";

export default function YoumaylikeSwiper() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [animatingId, setAnimatingId] = useState(null);
  const { products } = useSelector((state) => state.products);
  const wishList = useSelector((state) => state.wishlist.items);

  const reversedProducts = [...products].reverse();

  //進入商品詳細頁
  const handleViewDetail = (e, id) => {
    e.preventDefault();
    navigate(`/product/${id}`);
  };

  return (
    <section className="section-gray py-5">
      <div className="container">
        <h3 className="fw-bold">你可能也喜歡. . . . . .</h3>
        <div className="swiper mt-4 mb-5">
          <div className="swiper-wrapper">
            {reversedProducts.length === 0 ? (
              <p>目前沒有相關商品</p>
            ) : (
              <Swiper
                modules={[Autoplay]}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                slidesPerView={Math.min(reversedProducts.length, 2)}
                spaceBetween={10}
                loop={reversedProducts.length >= 3}
                breakpoints={{
                  767: {
                    slidesPerView: Math.min(reversedProducts.length, 3),
                    spaceBetween: 5,
                  },
                }}
              >
                {reversedProducts.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div className="card border-0 mb-4 position-relative img-hover">
                      <img
                        src={item.imageUrl}
                        className="card-img-top rounded-0 img-size-large"
                        alt={item.title}
                        onClick={(e) => handleViewDetail(e, item.id)}
                      />
                      <button
                        type="button"
                        className="p-0 border-0 bg-transparent text-dark"
                        onClick={() => {
                          dispatch(toggleWishlistItem(item.id));
                          setAnimatingId(item.id);
                          setTimeout(() => {
                            setAnimatingId(null);
                          }, 350);
                        }}
                      >
                        <i
                          className={`fa-${
                            wishList[item.id] ? "solid" : "regular"
                          } fa-heart position-absolute ${
                            animatingId === item.id ? "is-animating" : ""
                          }`}
                          style={{
                            right: "16px",
                            top: "30px",
                            fontSize: "18px",
                          }}
                        ></i>
                      </button>
                      <div className="card-body p-3 mb-3">
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
    </section>
  );
}
