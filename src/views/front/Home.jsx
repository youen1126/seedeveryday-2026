import { useEffect } from "react";
import { NavLink } from "react-router";

import BackToTop from "@/components/BackToTop";
import HomeBanner from "./HomeBanner";
import { scrollToTop } from "@/utils/scrollToTop";

import HomeHero from "./HomeHero";
import Hotspot from "./Hotspot";
import HotCategories from "./HotCategories";

export default function Home() {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <>
      <div className="container">
        <HomeHero />
        <div data-aos="zoom-in">
          <HomeBanner />
        </div>
      </div>
      <div className="bg-light mt-1 p-1">
        <HotCategories />
      </div>
      <div className="container">
        <Hotspot />
      </div>

      {/* section 箴言 */}
      <div className="bg-light mt-7">
        <section className="container py-7">
          <div
            className="d-flex flex-column flex-sm-row align-items-center img-hover gap-2 mx-auto"
            style={{ maxWidth: "960px" }}
          >
            <img
              src="https://i.pinimg.com/736x/42/21/60/422160101cf1fb73d25f83dbd453c191.jpg"
              alt="箴言配圖，由乾燥蓮藕排列成的照片"
              className="rounded-circle home-quote-image mx-5"
              loading="lazy"
            />
            <div className="home-quote-copy d-flex flex-column justify-content-between font-zh-display-sm text-center">
              <p className="home-quote-line">在忙碌的生活裡</p>
              <p className="home-quote-line">我們希望留下一點安靜</p>
              <p className="home-quote-line">一顆小小的種子</p>
              <p className="home-quote-line">也許就是一份祝福</p>
              <p className="text-muted home-quote-line">
                <small>A little seed for everyday blessings.</small>
              </p>
            </div>
            <div className="d-flex flex-column mt-2 mt-sm-0 ms-sm-3">
              <NavLink
                to="/aboutuse"
                className="btn btn-dark mt-4 rounded-0"
                data-aos="zoom-in"
              >
                關於我們
              </NavLink>
            </div>
          </div>
        </section>
      </div>
      <BackToTop />
    </>
  );
}
