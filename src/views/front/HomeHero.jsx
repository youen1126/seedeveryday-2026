import { Link } from "react-router";

export default function HomeHero() {
  return (
    <div className="row flex-md-row-reverse flex-column">
      <div className="col-md-6">
        <img
          src="https://i.pinimg.com/1200x/7d/6b/90/7d6b90ef382a67ec60646a95feab02ec.jpg"
          className="img-fluid "
          data-aos="fade-down"
          alt="天然種子手作裝飾 松果藝術 擺飾"
          style={{
            height: "650px",
            width: "650px",
            objectFit: "cover",
          }}
        />
      </div>
      <div className="col-md-6 d-flex flex-column justify-content-center mt-md-0 mt-3">
        <h2 className="fw-bold link-hover" data-aos="fade-up">
          來自自然的祝福手作
        </h2>
        <h5 className="font-weight-normal text-muted mt-2" data-aos="fade-up">
          Carry a seed, carry a blessing.
        </h5>
        <div className="input-group mb-0 mt-4">
          <div className="input-group-append">
            <Link
              className="btn btn-dark rounded-0"
              to="/product"
              data-aos="fade-right"
            >
              前往選購商品
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
