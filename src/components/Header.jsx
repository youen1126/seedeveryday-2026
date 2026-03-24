import { NavLink } from "react-router";
import logoImg from "../../public/seed-everydayicon-Header.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { createAsyncGetCart } from "../slice/cartSlice";
import { useState } from "react";

const Header = () => {
  const carts = useSelector((state) => state.cart.carts);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    dispatch(createAsyncGetCart());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`bg-white sticky-top ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <nav className="navbar px-0 navbar-expand-lg navbar-light bg-white">
          {/* 左：漢堡 */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* 中：logo */}
          <NavLink
            className="navbar-brand position-absolute"
            to="/"
            style={{
              left: "50%",
              transform: "translate(-50%, -50%)",
              top: "50%",
            }}
          >
            <img src={logoImg} className="logo" alt="logo" />
          </NavLink>
          {/* 右：購物車（關鍵！） */}
          <div className="d-flex">
            <NavLink to="/wishlist">
              <i className="fa-sharp fa-solid fa-heart me-5"></i>
            </NavLink>
            <NavLink to="/cart">
              <div className="position-relative  me-5">
                <i className="fas fa-shopping-cart "></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {carts.length}
                </span>
              </div>
            </NavLink>
          </div>
          {/* collapse（獨立一層） */}
          <div
            className="collapse navbar-collapse bg-white custom-header-md-open"
            id="navbarNav"
          >
            <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
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
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
