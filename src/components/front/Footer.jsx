import { useState } from "react";
import { NavLink } from "react-router";

const Footer = () => {
  const [showEmailNotice, setShowEmailNotice] = useState(false);

  const handleOpenEmailNotice = (e) => {
    e.preventDefault();
    setShowEmailNotice(true);
  };

  const handleCloseEmailNotice = () => {
    setShowEmailNotice(false);
  };

  return (
    <>
      <div className="bg-dark">
        <div className="container">
          <div className="d-flex flex-column flex-md-row flex-wrap align-items-center justify-content-between text-white py-4 gap-2 gap-md-0 text-center text-md-start mt-5 mb-5">
            <p className="mb-0">© 2026 UN All Rights Reserved.</p>
            <p className="mb-0">
              客服信箱：
              <a
                href="#"
                onClick={handleOpenEmailNotice}
                className="text-white text-decoration-none ms-1"
              >
                seedevery@sedcontent.com
              </a>
            </p>
            <ul className="d-flex flex-wrap list-unstyled mb-0 h4 justify-content-center">
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
                <a
                  href="#"
                  className="text-white mx-2 mx-md-4"
                  onClick={handleOpenEmailNotice}
                >
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white mx-2 mx-md-4"
                  onClick={handleOpenEmailNotice}
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {showEmailNotice && (
        <>
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            aria-modal="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title font-zh-display">客服信箱提示</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={handleCloseEmailNotice}
                  ></button>
                </div>
                <div className="modal-body">
                  <p className="mb-0 font-zh-display">
                    此平台僅作爲作品集展示，此為虛構連結
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-dark rounded-0"
                    onClick={handleCloseEmailNotice}
                  >
                    我知道了
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal-backdrop fade show"
            onClick={handleCloseEmailNotice}
          ></div>
        </>
      )}
    </>
  );
};

export default Footer;
