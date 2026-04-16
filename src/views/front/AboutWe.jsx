import { useEffect } from "react";
import { Link } from "react-router";

import BackToTop from "@/components/BackToTop";
import YoumaylikeSwiper from "@/components/front/YoumaylikeSwiper";
import bannerImg from "/public/seed-everyday- Stamp Logo-compression.png";
import SeedIntroduction from "./SeedIntroduction";
import { scrollToTop } from "@/utils/scrollToTop";

export default function AboutWe() {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <div className="about-page">
      {/* HERO */}
      <section className="about-hero position-relative text-center py-5 mt-2">
        <div
          className="position-absolute w-100 h-100"
          style={{
            top: 0,
            left: 0,
            backgroundImage:
              "url(https://i.pinimg.com/1200x/8c/38/39/8c3839dcb4661963056fa7ee7b56a6d8.jpg)",
            backgroundSize: "cover",
            opacity: 0.9,
          }}
        ></div>

        <div className="container position-relative text-white">
          <h1 className="mb-3" data-aos="zoom-in">
            關於 種子日常
          </h1>
          <p className="lead" data-aos="zoom-in-right">
            每一顆種子，都來自自然。 我們把它變成日常中的祝福。
          </p>
        </div>
      </section>

      {/* 品牌故事 */}
      <section className="py-5 brand-story">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4">
              <img
                src={bannerImg}
                className="img-fluid rounded"
                alt="由各式植物的種子、乾燥葉所組成的意象圖"
                data-aos="zoom-out"
              />
            </div>

            <div className="col-md-6">
              <h2 className="mb-3">我們為什麼開始做種子手作</h2>
              <p> 在自然裡，每一顆種子都有自己的故事。</p>
              <p> 有些象徵平安，有些代表思念，有些帶來力量。</p>
              <p>
                「種子日常」希望把這些來自自然的種子，
                透過手作，變成能陪伴生活的小小祝福。
              </p>
              <div className="p-3">
                <Link
                  to="/product"
                  className="btn btn-dark px-5 py-2"
                  data-aos="zoom-out-left"
                >
                  前往商品頁
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 種子的祝福 */}
      <SeedIntroduction />

      {/* 手作過程 */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">每一件作品，都是手作完成</h2>

          <div className="row text-center">
            <div className="col-md-4 mb-4 card-hover">
              <img
                src="https://i.pinimg.com/avif/1200x/c6/0a/71/c60a716a1b20b4987c50fbbbd6292978.avf"
                className="img-fluid rounded mb-3 mt-3 img-size-large"
                alt="一隻手捧著剛撿起的松果"
                loading="lazy"
              />
              <h5>挑選種子</h5>
              <p className="text-muted">每一顆種子都經過細心挑選</p>
            </div>

            <div className="col-md-4 mb-4 card-hover">
              <img
                src="https://i.pinimg.com/736x/35/fc/39/35fc395deb9e8b48bda096c6c85df2c2.jpg"
                className="img-fluid rounded mb-3 mt-3 img-size-large"
                alt="由色彩斑斕的種子組成的正方形圖，看得出每顆種子的紋理"
                loading="lazy"
              />
              <h5>手工製作</h5>
              <p className="text-muted">保留自然紋理與形狀</p>
            </div>

            <div className="col-md-4 mb-4 card-hover">
              <img
                src="https://i.pinimg.com/1200x/c5/3a/1b/c53a1bf67f769d8cf6195442c48731ed.jpg"
                className="img-fluid rounded mb-3  mt-3 img-size-large"
                alt="由真實的松果與針勾的松果製作的工藝創作品"
                loading="lazy"
              />
              <h5>完成作品</h5>
              <p className="text-muted">成為生活中的祝福</p>
            </div>
          </div>
        </div>
      </section>

      {/* 品牌理念 + CTA */}
      <section className="bg-light py-5 text-center">
        <div className="container">
          <h2 className="mb-4">讓祝福成為日常</h2>

          <p className="mb-4">
            在忙碌的生活裡，我們希望保留一點來自自然的安靜。
            一顆小小的種子，也許就是一份祝福。
          </p>

          <Link
            to="/product"
            className="btn btn-dark px-4 py-2"
            data-aos="fade-down"
          >
            前往商品頁
          </Link>
        </div>
      </section>
      <YoumaylikeSwiper />
      <BackToTop />
    </div>
  );
}
