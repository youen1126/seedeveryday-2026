import { NavLink } from "react-router";
const Footer = () => {
  return (
    <div className="bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-between text-white py-4">
          <p className="mb-0">© 2026 UN All Rights Reserved.</p>
          <ul className="d-flex flex-wrap list-unstyled mb-0 h4">
            <li>
              <NavLink
                to="/login"
                className="text-white mx-2 mx-md-4"
                style={{ fontSize: "15px" }}
              >
                登入後台
              </NavLink>
            </li>
            <li>
              <a href="#" className="text-white mx-2 mx-md-4">
                <i className="fab fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="#" className="text-white mx-2 mx-md-4">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
