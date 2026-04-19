import { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
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
  const { showSuccess, showError } = useMessage();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (formData) => {
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
      const url = `${API_BASE}/api/${API_PATH}/order`;
      const submitRes = await axios.post(url, { data });
      const orderId = extractOrderIdFromResponse(submitRes);
      showSuccess("訂單送出成功", submitRes);
      reset();
      navigate("/orderSuccess", {
        state: { orderId },
      });
      dispatch(createAsyncGetCart());
    } catch (error) {
      console.error(error);
      showError("訂單送出失敗");
    }
  };

  const handleBackToPage = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="bg-light pt-3 pb-5 checkoutList">
      <CheckoutFlow currentStep={2} />
      <div className="container">
        <div className="row justify-content-center flex-md-row flex-column-reverse">
          <div className="col-md-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="bg-white p-4">
                <h4 className="fw-bold font-zh-display">填寫收件資料</h4>

                <div className="mb-2">
                  <label
                    htmlFor="ContactMail"
                    className="text-muted mb-0 form-label"
                  >
                    收件人Email
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
                  <p className="text-danger">{errors.email.message}</p>
                )}
                <div className="mb-2">
                  <label
                    htmlFor="ContactName"
                    className="text-muted mb-0 form-label"
                  >
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
                  <p className="text-danger">{errors.name.message}</p>
                )}
                <div className="">
                  <label
                    htmlFor="ContactPhone"
                    className="text-muted mb-0 form-label"
                  >
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
                  <p className="text-danger">{errors.tel.message}</p>
                )}
              </div>

              <div className="bg-white p-4 mt-3">
                <h4 className="fw-bold font-zh-display">收件地址和備註</h4>

                <label htmlFor="address" className="mt-4 mb-3">
                  收件地址
                </label>
                <input
                  id="address"
                  name="地址"
                  type="text"
                  className="form-control"
                  placeholder="請輸入地址"
                  defaultValue="春日市春日部春日路78號"
                  {...register("address", {
                    required: "僅可填寫台灣地區，目前無海外服務",
                  })}
                />
                {errors.address && (
                  <p className="text-danger">{errors.address.message}</p>
                )}
                <div className="mb-3">
                  <label htmlFor="message" className="mt-4 mb-3">
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
                  <a
                    href="#"
                    className="text-dark mt-md-0 mt-3 font-zh-display"
                    onClick={(e) => handleBackToPage(e)}
                  >
                    <i className="fas fa-chevron-left me-2"></i> 回上一頁
                  </a>
                  <button
                    type="submit"
                    className="btn btn-dark py-2 px-3 rounded-0"
                    disabled={!isValid || isSubmitting}
                  >
                    {isSubmitting ? "送出中..." : "送出訂單"}
                  </button>
                </div>
              </div>
            </form>
          </div>
          <CheckoutCart />
        </div>
      </div>
    </div>
  );
}
