import { NavLink } from "react-router";
import Hotspot from "./Hotspot";
import HomeHero from "./HomeHero";
import BackToTop from "@/components/BackToTop";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      <div className="container">
        <HomeHero />
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
                <div className="row justify-content-center py-7">
                  <div className="col-md-8 d-flex img-hover">
                    <img
                      src="https://i.pinimg.com/736x/42/21/60/422160101cf1fb73d25f83dbd453c191.jpg"
                      alt="箴言配圖，由乾燥蓮藕排列成的照片"
                      className="rounded-circle me-5"
                      style={{
                        width: "160px",
                        height: "160px",
                        objectFit: "cover",
                      }}
                      loading="lazy"
                    />
                    <div className="d-flex flex-column">
                      <p className="h5 link-hover">在忙碌的生活裡</p>
                      <p className="h5 link-hover">我們希望留下一點安靜</p>
                      <p className="h5 link-hover">一顆小小的種子</p>
                      <p className="h5 link-hover">也許就是一份祝福</p>
                      <p className="mt-auto text-muted link-hover">
                        A little seed for everyday blessings.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* section 4 小圖-標題-文字  */}
      <div className="container my-7">
        <div className="row">
          <div className="col-md-4 card-hover ">
            <img
              src="https://i.pinimg.com/1200x/57/af/03/57af030b81bfb337f624f636cffbcde2.jpg"
              alt="無患子照片"
              className="img-size-sm3"
              data-aos="flip-left"
              loading="lazy"
            />
            <h4 className="mt-4">無患子｜守護與平安</h4>
            <p className="text-muted">
              無患子在東方文化中，一直被視為帶來平安與守護的種子。
              在過去，人們會把無患子製成念珠或護身物，象徵遠離煩惱與不安。
              這顆看似樸實的種子，其實承載著一份古老而安靜的祝福。
            </p>
          </div>
          <div className="col-md-4 card-hover ">
            <img
              src="https://i.pinimg.com/736x/97/eb/bd/97ebbd44d102b0bee444cb9d4648cebe.jpg"
              alt="橡實照片"
              className="img-size-sm3"
              data-aos="flip-left"
              loading="lazy"
            />
            <h4 className="mt-4">橡實｜力量與成長</h4>
            <p className="text-muted">
              橡實是橡樹的種子，也是森林中最有力量象徵的存在。
              一顆小小的橡實，未來卻可能長成高大的橡樹，陪伴土地與時間走過數十年甚至上百年。
              因此在許多文化裡，橡實象徵著力量、成長與希望。
              它提醒人們，即使是一顆看似微小的種子，也蘊藏著巨大的生命能量。
            </p>
          </div>
          <div className="col-md-4 card-hover ">
            <img
              src="https://i.pinimg.com/1200x/f0/76/3a/f0763a55979173e09d01922b9211d259.jpg"
              alt="菩提子照片"
              className="img-size-sm3"
              data-aos="flip-left"
              loading="lazy"
            />
            <h4 className="mt-4">菩提子｜覺察與智慧</h4>
            <p className="text-muted">
              菩提子在東方文化中，象徵覺察與智慧。
              相傳佛陀在菩提樹下悟道，因此菩提也成為一種提醒人們向內觀照、保持清明心境的象徵。
              菩提子的外型自然而質樸，每一顆紋理都不盡相同，像是時間慢慢雕刻出的痕跡。
              當我們看著它時，也彷彿能感受到一種安靜與沉穩。
            </p>
          </div>
        </div>
      </div>
      {/* section 5 文字-按鈕  */}
      <div className="bg-light py-7">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-4 text-center">
              <h3>種子日常</h3>
              <p className="text-muted link-hover">
                我們把來自大地的種子， 透過手作，變成可以陪伴生活的小小物件。
              </p>
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
      <BackToTop />
    </>
  );
}
