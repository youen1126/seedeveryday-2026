import { useEffect } from "react";
import { Link } from "react-router";

import BackToTop from "@/components/BackToTop";
import YoumaylikeSwiper from "@/components/front/singleProduct/YoumaylikeSwiper";
import bannerImg from "/public/seed-everyday- Stamp Logo-compression.png";
import SeedIntroduction from "./SeedIntroduction";
import { scrollToTop } from "@/utils/scrollToTop";

export default function AboutUse() {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <div className="about-page">
      {/* HERO */}
      <section className="about-hero position-relative text-center py-5 mt-2">
        <div className="about-hero__media position-absolute w-100 h-100"></div>

        <div className="container position-relative text-white about-hero__content">
          <h1
            className="mb-3 font-zh-display fw-bold about-hero__title"
            data-aos="zoom-in"
          >
            關於種子日常
          </h1>
          <p
            className="lead font-zh-display about-hero__subtitle"
            data-aos="zoom-in-right"
          >
            我們把每一顆種子變成日常中的祝福。
          </p>
        </div>
        <nav
          aria-label="breadcrumb"
          className="position-absolute bottom-0 end-0 pe-3 pb-3 z-2 about-hero__breadcrumb-wrap"
        >
          <ol
            className="breadcrumb bg-transparent mb-0 py-0 font-zh-display hero-breadcrumb"
            style={{
              "--bs-breadcrumb-divider-color": "rgba(255, 255, 255, 0.85)",
            }}
          >
            <li className="breadcrumb-item">
              <Link
                className="text-white text-decoration-none breadcrumb-home-link"
                to="/"
              >
                回到首頁
              </Link>
            </li>
            <li
              className="breadcrumb-item active text-white"
              aria-current="page"
            >
              品牌故事
            </li>
          </ol>
        </nav>
      </section>

      {/* 品牌故事 */}
      <section className="py-5 brand-story">
        <div className="container">
          <div className="row align-items-center g-4 g-lg-5">
            <div className="col-md-6 mb-4">
              <img
                src={bannerImg}
                className="img-fluid rounded"
                alt="由各式植物的種子、乾燥葉所組成的意象圖"
                data-aos="zoom-out"
              />
            </div>

            <div className="col-md-6 about-story__content" data-aos="fade-up">
              <h2 className="mb-3 font-zh-display fw-bold about-story__heading">
                我們為什麼開始做種子手作
              </h2>
              <div className="about-story__copy font-zh-display-sm">
                <p>在自然裡，每一顆種子都有自己的故事。</p>
                <p>有些象徵平安，有些代表思念，有些帶來力量。</p>
                <p>
                  「種子日常」希望把這些來自自然的種子，
                  透過手作，變成能陪伴生活的小小祝福。
                </p>
              </div>
              <div className="about-story__actions">
                <Link
                  className="btn btn-brand-featured rounded-0"
                  to="/products?category=種子小物"
                  data-aos="fade-left"
                >
                  看看送禮靈感
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 種子的祝福 */}
      <SeedIntroduction />

      {/* 手作過程 */}
      <section className="py-1">
        <div className="container">
          <div className="section-header">
            <div className="title-wrapper title-bg-line2 py-5">
              <h2 className="mb-2 text-center font-zh-display fw-bold about-section-title">
                每一件作品，都是手工製作
              </h2>
            </div>
          </div>

          <div className="row text-center">
            <div className="col-md-4 mb-4 card-hover">
              <img
                src="https://i.pinimg.com/avif/1200x/c6/0a/71/c60a716a1b20b4987c50fbbbd6292978.avf"
                className="img-fluid rounded mb-3 mt-3 img-size-large"
                alt="一隻手捧著剛撿起的松果"
                loading="lazy"
              />
              <h5 className="about-process__card-title font-zh-display">
                挑選種子
              </h5>
              <p className="text-muted about-process__card-text">
                每一顆種子都經過細心挑選
              </p>
            </div>

            <div className="col-md-4 mb-4 card-hover">
              <img
                src="https://i.pinimg.com/736x/35/fc/39/35fc395deb9e8b48bda096c6c85df2c2.jpg"
                className="img-fluid rounded mb-3 mt-3 img-size-large"
                alt="由色彩斑斕的種子組成的正方形圖，看得出每顆種子的紋理"
                loading="lazy"
              />
              <h5 className="about-process__card-title font-zh-display">
                手工製作
              </h5>
              <p className="text-muted about-process__card-text">
                保留自然紋理與形狀
              </p>
            </div>

            <div className="col-md-4 mb-4 card-hover">
              <img
                src="https://i.pinimg.com/736x/4d/59/ec/4d59ec9bb87e9654c0745722e859df24.jpg"
                className="img-fluid rounded mb-3  mt-3 img-size-large"
                alt="由夏威夷果核和迷你菇裝飾物製作的工藝創作品"
                loading="lazy"
              />
              <h5 className="about-process__card-title font-zh-display">
                完成作品
              </h5>
              <p className="text-muted about-process__card-text">
                成為生活中的祝福
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 品牌理念 + CTA */}
      <section className="bg-light pb-5 text-center">
        <div className="container">
          <div className="section-header">
            <div className="title-wrapper title-bg-line py-5">
              <h2 className="mb-2 text-center font-zh-display fw-bold about-section-title">
                讓祝福成為日常
              </h2>
            </div>
          </div>

          <p className="mb-4 about-cta__copy font-zh-display-sm">
            在忙碌的生活裡，我們希望保留一點來自自然的安靜。
            一顆小小的種子，也許就是一份祝福。
          </p>

          <Link
            className="btn btn-dark rounded-0 m-2"
            to="/products"
            data-aos="fade-right"
          >
            熱門商品
          </Link>
          <Link
            className="btn btn-brand-featured rounded-0"
            to="/products?category=種子小物"
            data-aos="fade-left"
          >
            本月主打
          </Link>
        </div>
      </section>
      <YoumaylikeSwiper />
      <BackToTop />
    </div>
  );
}
