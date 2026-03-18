import { NavLink } from "react-router";
import logoImg from "../../public/seed-everydayicon-Header.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { createAsyncGetCart } from "../slice/cartSlice";

const Header = () => {
  const carts = useSelector((state) => state.cart.carts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(createAsyncGetCart());
  }, [dispatch]);

  return (
    <div className="bg-white sticky-top">
      <div className="container">
        <nav className="navbar px-0 navbar-expand-lg navbar-light bg-white">
          <NavLink
            className="navbar-brand position-absolute"
            to="/"
            style={{
              left: "50%",
              transform: "translate(-50%, -50%)",
              top: "50%",
            }}
          >
            <img
              src={logoImg}
              style={{
                height: "200px",
              }}
            />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse bg-white custom-header-md-open"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item active">
                <NavLink className="nav-link ps-0" to="/product">
                  找商品
                </NavLink>
              </li>
              <li className="nav-item active">
                <NavLink className="nav-link ps-0" to="/aboutwe">
                  品牌故事
                </NavLink>
              </li>
              <li className="nav-item active">
                <NavLink className="nav-link ps-0" to="/checkoutsuccess">
                  checkoutSuccess
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="d-flex">
            <NavLink to="/cart">
              <div className="position-relative">
                <i className="fas fa-shopping-cart"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {carts.length}
                </span>
              </div>
            </NavLink>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
