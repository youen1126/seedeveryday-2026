import { Link } from "react-router";

const HERO_BACKGROUND_URL =
  "https://i.pinimg.com/1200x/7d/6b/90/7d6b90ef382a67ec60646a95feab02ec.jpg";

export default function ProductsHero() {
  return (
    <div
      className="position-relative d-flex align-items-center justify-content-center overflow-hidden mt-2"
      style={{ minHeight: "200px" }}
    >
      <div
        className="position-absolute w-100 h-100"
        style={{
          backgroundImage: `url(${HERO_BACKGROUND_URL})`,
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          opacity: 0.8,
          filter: "blur(4px)",
          transform: "scale(1.08)",
          zIndex: 0,
        }}
      />
      <div className="text-center" style={{ opacity: 0.7 }}>
        <h4 className="position-relative z-1 mb-0 font-zh-display fw-bold">
          把祝福帶進每一天
        </h4>
        <p className="position-relative z-1 mb-0 font-zh-display">
          Bring blessings into every day
        </p>
      </div>
      <nav
        aria-label="breadcrumb"
        className="position-absolute bottom-0 end-0 me-4 mb-3 z-1"
      >
        <ol
          className="breadcrumb bg-transparent mb-0 py-0 font-zh-display hero-breadcrumb"
          style={{
            "--bs-breadcrumb-divider-color": "rgba(255, 255, 255, 0.85)",
          }}
        >
          <li className="breadcrumb-item">
            <Link className="text-white text-decoration-none breadcrumb-home-link" to="/">
              回到首頁
            </Link>
          </li>
          <li className="breadcrumb-item active text-white" aria-current="page">
            商品列表
          </li>
        </ol>
      </nav>
    </div>
  );
}
