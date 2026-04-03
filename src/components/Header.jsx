import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router";

import logoImg from "../../public/seed-everydayicon-Header-300-150.png";
import { createAsyncGetCart } from "@/slice/cartSlice";

const Header = () => {
  const carts = useSelector((state) => state.cart.carts);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeMenu = () => setIsOpen(false);

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
            className={`navbar-toggler custom-menu-toggle ${isOpen ? "is-open" : ""}`}
            type="button"
            aria-controls="navbarNav"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="custom-menu-toggle__line"></span>
            <span className="custom-menu-toggle__line"></span>
            <span className="custom-menu-toggle__line"></span>
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
            <img src={logoImg} className="logo" alt="Seed everydat logo" />
          </NavLink>
          {/* 右：收藏和購物車 */}
          <div className="d-flex">
            <NavLink to="/wishlist">
              <i className="fa-sharp fa-solid fa-heart me-4"></i>
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
          {/* collapse */}
          <div
            className={`navbar-collapse bg-white custom-header-md-open ${
              isOpen ? "is-open" : ""
            }`}
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item active">
                <NavLink
                  className="nav-link ps-0"
                  to="/product"
                  onClick={closeMenu}
                >
                  找商品
                </NavLink>
              </li>
              <li className="nav-item active">
                <NavLink
                  className="nav-link ps-0"
                  to="/aboutwe"
                  onClick={closeMenu}
                >
                  品牌故事
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
