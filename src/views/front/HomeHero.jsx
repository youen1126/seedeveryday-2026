import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function HomeHero() {
  const navigate = useNavigate();
  const [showProductConfirmModal, setShowProductConfirmModal] = useState(false);

  const handleOpenProductConfirmModal = () => {
    setShowProductConfirmModal(true);
  };

  const handleCloseProductConfirmModal = () => {
    setShowProductConfirmModal(false);
  };

  const handleConfirmViewProduct = () => {
    setShowProductConfirmModal(false);
    navigate("/product/-Oiv94nY5fqGEZSMqXLo");
  };

  return (
    <>
      <div className="row flex-md-row-reverse flex-column ml-4">
        <div className="col-md-6">
          <button
            type="button"
            className="border-0 bg-transparent p-0 w-100"
            onClick={handleOpenProductConfirmModal}
            aria-label="查看商品詳情"
          >
            <img
              src="https://i.pinimg.com/736x/28/27/ce/2827ceea1a791dd90fb97863b0d69a28.jpg"
              className="img-fluid hero-img"
              alt="天然種子手作裝飾 松果藝術 擺飾"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width="1200"
              height="1200"
            />
          </button>
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
                data-aos="fade-left"
              >
                本月主打
              </Link>
            </div>
          </div>
        </div>
      </div>
      {showProductConfirmModal && (
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
                  <h5 className="modal-title font-zh-display">前往商品詳情</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={handleCloseProductConfirmModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <p className="mb-0 font-zh-display">
                    按下確認，前往觀看此商品詳情
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-secondary rounded-0"
                    onClick={handleCloseProductConfirmModal}
                  >
                    回首頁
                  </button>
                  <button
                    type="button"
                    className="btn btn-dark rounded-0"
                    onClick={handleConfirmViewProduct}
                  >
                    確定
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal-backdrop fade show"
            onClick={handleCloseProductConfirmModal}
          ></div>
        </>
      )}
    </>
  );
}
