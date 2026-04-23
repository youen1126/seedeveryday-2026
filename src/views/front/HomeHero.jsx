import { Link } from "react-router";

export default function HomeHero() {
  return (
    <div className="row flex-md-row-reverse flex-column m-4">
      <div className="col-md-6">
        <img
          src="https://yunicrafts.com/cdn/shop/files/the-forest-chime-handcrafted-natural-seed-pod-bell-mobile-4998382.jpg?v=1772537851&width=2560"
          className="img-fluid hero-img"
          data-aos="fade-down"
          alt="天然種子手作裝飾 松果藝術 擺飾"
        />
        {/* https://i.pinimg.com/1200x/7d/6b/90/7d6b90ef382a67ec60646a95feab02ec.jpg */}
      </div>
      <div className="col-md-6 d-flex flex-column justify-content-center mt-3">
        <h2 className="fw-bold link-hover font-zh-display" data-aos="fade-up">
          來自天然種子
        </h2>
        <h2 className="fw-bold link-hover font-zh-display" data-aos="fade-up">
          手作飾品與祝福小物
        </h2>
        <p
          className="font-weight-normal text-muted mt-2 font-zh-display"
          data-aos="fade-up"
        >
          天然種子、果殼與植物素材手作，適合收藏、送禮，為生活添加日常儀式感。
        </p>
        <div className="input-group mb-0 mt-4">
          <div className="input-group-append">
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
              data-aos="fade-right"
            >
              本月主打
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
