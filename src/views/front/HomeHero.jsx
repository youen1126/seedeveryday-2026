import { Link } from "react-router";

export default function HomeHero() {
  return (
    <div className="row flex-md-row-reverse flex-column">
      <div className="col-md-6">
        <img
          src="https://i.pinimg.com/1200x/c8/c7/a0/c8c7a04cfbf4a5d2a420669f3ca63810.jpg"
          className="img-fluid"
          data-aos="fade-down"
        />
      </div>
      <div className="col-md-6 d-flex flex-column justify-content-center mt-md-0 mt-3">
        <h2 className="fw-bold" data-aos="fade-up">
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
