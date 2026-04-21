import { useEffect } from "react";
import { NavLink } from "react-router";

import BackToTop from "@/components/BackToTop";
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
      </div>
      <div className="bg-light mt-1 p-1">
        <HotCategories />
      </div>
      <div className="container">
        {" "}
        <Hotspot />
      </div>

      {/* section 3 箴言 */}
      <div className="bg-light mt-7">
        <div className="container">
          <div
            id="carouselExampleControls"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="row justify-content-center py-7 mx-0 my-0">
                  <div className="col-md-10 d-flex flex-column flex-sm-row align-items-center img-hover gap-2">
                    <img
                      src="https://i.pinimg.com/736x/42/21/60/422160101cf1fb73d25f83dbd453c191.jpg"
                      alt="箴言配圖，由乾燥蓮藕排列成的照片"
                      className="rounded-circle home-quote-image"
                      loading="lazy"
                    />
                    <div className="home-quote-copy d-flex flex-column justify-content-between font-zh-display-sm">
                      <p className="link-hover">在忙碌的生活裡</p>
                      <p className="link-hover">我們希望留下一點安靜</p>
                      <p className="link-hover">一顆小小的種子</p>
                      <p className="link-hover">也許就是一份祝福</p>
                      <p className="text-muted link-hover">
                        A little seed for everyday blessings.
                      </p>
                    </div>
                    <div className="d-flex flex-column mt-2 mt-sm-0 ms-sm-3">
                      {" "}
                      <NavLink
                        to="/aboutwe"
                        className="btn btn-dark mt-4 rounded-0"
                        data-aos="zoom-in"
                      >
                        關於我們
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BackToTop />
    </>
  );
}
