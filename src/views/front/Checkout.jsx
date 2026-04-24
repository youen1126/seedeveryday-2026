import { useEffect, useState } from "react";
import axios from "axios";
import { useForm, useWatch } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import CheckoutCart from "@/components/front/CheckoutCart.jsx";
import CheckoutFlow from "@/components/front/CheckoutFlow.jsx";
import useMessage from "@/hooks/useMessage";
import { createAsyncGetCart } from "@/slice/cartSlice";
import { emailValidation } from "@/utils/emailValidation";
import { scrollToTop } from "@/utils/scrollToTop";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;
const CHECKOUT_FORM_STORAGE_KEY = "checkoutFormDraft";
const DEFAULT_FORM_VALUES = {
  email: "",
  name: "",
  tel: "",
  address: "春日市春日部春日路78號",
  message: "",
};

function getCheckoutDefaultValues() {
  try {
    const savedDraft = sessionStorage.getItem(CHECKOUT_FORM_STORAGE_KEY);
    if (!savedDraft) {
      return DEFAULT_FORM_VALUES;
    }

    return {
      ...DEFAULT_FORM_VALUES,
      ...JSON.parse(savedDraft),
    };
  } catch (error) {
    console.error("Failed to parse checkout draft:", error);
    sessionStorage.removeItem(CHECKOUT_FORM_STORAGE_KEY);
    return DEFAULT_FORM_VALUES;
  }
}

function extractOrderIdFromResponse(response) {
  return (
    response?.data?.orderId ||
    response?.data?.order_id ||
    response?.data?.order?.id ||
    response?.data?.order?.orderId ||
    ""
  );
}

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showSuccess } = useMessage();
  const [showSubmitErrorModal, setShowSubmitErrorModal] = useState(false);
  const [showSubmitConfirmModal, setShowSubmitConfirmModal] = useState(false);
  const [confirmFormData, setConfirmFormData] = useState(null);
  const [isOrderSubmitting, setIsOrderSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: getCheckoutDefaultValues(),
  });
  const watchedFormValues = useWatch({ control });

  const submitOrder = async (formData) => {
    const data = {
      user: {
        name: formData.name,
        email: formData.email,
        tel: formData.tel,
        address: formData.address,
      },
      message: formData.message,
    };

    try {
      setIsOrderSubmitting(true);
      const url = `${API_BASE}/api/${API_PATH}/order`;
      const submitRes = await axios.post(url, { data });
      const orderId = extractOrderIdFromResponse(submitRes);
      showSuccess("訂單送出成功", submitRes);
      reset();
      sessionStorage.removeItem(CHECKOUT_FORM_STORAGE_KEY);
      setShowSubmitConfirmModal(false);
      setConfirmFormData(null);
      navigate("/orderSuccess", {
        state: { orderId },
      });
      dispatch(createAsyncGetCart());
    } catch (error) {
      console.error(error);
      setShowSubmitErrorModal(true);
    } finally {
      setIsOrderSubmitting(false);
    }
  };

  const onSubmit = (formData) => {
    setConfirmFormData(formData);
    setShowSubmitConfirmModal(true);
  };

  const handleBackToPage = () => {
    navigate("/cart");
  };

  const handleCloseSubmitErrorModal = () => {
    setShowSubmitErrorModal(false);
  };

  const handleCloseSubmitConfirmModal = () => {
    if (isOrderSubmitting) return;
    setShowSubmitConfirmModal(false);
  };

  const handleConfirmSubmit = () => {
    if (!confirmFormData || isOrderSubmitting) return;
    submitOrder(confirmFormData);
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    sessionStorage.setItem(
      CHECKOUT_FORM_STORAGE_KEY,
      JSON.stringify(watchedFormValues),
    );
  }, [watchedFormValues]);

  return (
    <>
      <div className="bg-light pt-3 pb-5 checkoutList">
        <CheckoutFlow currentStep={2} />
        <div className="container mt-4">
          <div className="row justify-content-center flex-md-row flex-column-reverse">
            <div className="col-md-6">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="bg-white p-4">
                  <h4 className="fw-bold font-zh-display">填寫收件資料</h4>

                  <div className="mb-2">
                    <label htmlFor="email" className="checkout-form-label">
                      收件人Email（請確認Email正確可用，避免無法接收通知）
                    </label>
                    <input
                      type="email"
                      className="form-control rounded-0"
                      id="email"
                      aria-describedby="emailHelp"
                      placeholder="example@gmail.com"
                      {...register("email", emailValidation)}
                    />
                  </div>
                  {errors.email && (
                    <p className="checkout-field-error text-danger">
                      {errors.email.message}
                    </p>
                  )}
                  <div className="mb-2">
                    <label htmlFor="name" className="checkout-form-label">
                      收件人姓名
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-0"
                      id="name"
                      placeholder="王小明"
                      {...register("name", {
                        required: "請輸入姓名",
                        minLength: {
                          value: 2,
                          message: "姓名最少兩個字",
                        },
                      })}
                    />
                  </div>
                  {errors.name && (
                    <p className="checkout-field-error text-danger">
                      {errors.name.message}
                    </p>
                  )}
                  <div className="">
                    <label htmlFor="tel" className="checkout-form-label">
                      收件人電話
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-0"
                      id="tel"
                      placeholder="0933123123"
                      {...register("tel", {
                        required: "請輸入收件人電話",
                        minLength: {
                          value: 8,
                          message: "電話至少8碼，格式範例：0988788777",
                        },
                      })}
                    />
                  </div>
                  {errors.tel && (
                    <p className="checkout-field-error text-danger">
                      {errors.tel.message}
                    </p>
                  )}
                </div>

                <div className="bg-white p-4 mt-3">
                  <h4 className="fw-bold font-zh-display">收件地址和備註</h4>

                  <label
                    htmlFor="address"
                    className="checkout-form-label mt-4 mb-3"
                  >
                    收件地址
                  </label>
                  <input
                    id="address"
                    name="地址"
                    type="text"
                    className="form-control"
                    placeholder="請輸入地址"
                    {...register("address", {
                      required: "僅可填寫台灣地區，目前無海外服務",
                    })}
                  />
                  {errors.address && (
                    <p className="checkout-field-error text-danger">
                      {errors.address.message}
                    </p>
                  )}
                  <div className="mb-3">
                    <label
                      htmlFor="message"
                      className="checkout-form-label mt-4 mb-3"
                    >
                      留言(可空白)
                    </label>
                    <textarea
                      id="message"
                      className="form-control"
                      cols="30"
                      rows="10"
                      {...register("message")}
                    ></textarea>
                  </div>
                  <div className="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end  w-100">
                    <button
                      type="button"
                      className="btn btn-link p-0 text-dark text-decoration-none mt-md-0 mt-3 font-zh-display checkout-back-btn"
                      onClick={handleBackToPage}
                    >
                      <i className="fas fa-chevron-left me-2"></i> 回上一頁
                    </button>
                    <button
                      type="submit"
                      className="btn btn-dark py-2 px-3 rounded-0"
                      disabled={!isValid}
                    >
                      送出訂單
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <CheckoutCart />
          </div>
        </div>
      </div>
      {showSubmitConfirmModal && confirmFormData && (
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
                  <h5 className="modal-title font-zh-display">確認訂單資料</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={handleCloseSubmitConfirmModal}
                    disabled={isOrderSubmitting}
                  ></button>
                </div>
                <div className="modal-body">
                  <p className="mb-2">
                    <span className="fw-bold me-2">收件人 Email：</span>
                    {confirmFormData.email}
                    <br />
                    <span className="text-danger">
                      請務必確認Email正確可用，避免無法接收出貨通知
                    </span>
                  </p>
                  <p className="mb-2">
                    <span className="fw-bold me-2">收件人姓名：</span>
                    {confirmFormData.name}
                  </p>
                  <p className="mb-2">
                    <span className="fw-bold me-2">收件人電話：</span>
                    {confirmFormData.tel}
                  </p>
                  <p className="mb-2">
                    <span className="fw-bold me-2">收件地址：</span>
                    {confirmFormData.address}
                  </p>
                  <p className="mb-0">
                    <span className="fw-bold me-2">留言：</span>
                    {confirmFormData.message || "無"}
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-secondary rounded-0"
                    onClick={handleCloseSubmitConfirmModal}
                    disabled={isOrderSubmitting}
                  >
                    回去修改
                  </button>
                  <button
                    type="button"
                    className="btn btn-dark rounded-0"
                    onClick={handleConfirmSubmit}
                    disabled={isOrderSubmitting}
                  >
                    {isOrderSubmitting ? "送出中..." : "確認送出"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal-backdrop fade show"
            onClick={handleCloseSubmitConfirmModal}
          ></div>
        </>
      )}
      {showSubmitErrorModal && (
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
                  <h5 className="modal-title font-zh-display">訂單送出失敗</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={handleCloseSubmitErrorModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <p className="mb-0 font-zh-display">
                    系統忙線或網路中斷，請稍候重試
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-dark rounded-0"
                    onClick={handleCloseSubmitErrorModal}
                  >
                    我知道了
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal-backdrop fade show"
            onClick={handleCloseSubmitErrorModal}
          ></div>
        </>
      )}
    </>
  );
}
