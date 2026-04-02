import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import axios from "axios";

import useMessage from "@/hooks/useMessage";
import LoadingSpinner from "@/components/LoadingSpinner";

import { logout } from "@/utils/logout";
import { emailValidation } from "@/utils/emailValidation";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: "youen1126@gmail.com",
      password: "",
    },
  });
  const [authData, setAuthData] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useMessage();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE}/admin/signin`, data);
      const { token, expired } = response.data;
      setAuthData({ token, expired });
    } catch (err) {
      showError(
        `${err.response?.data.message || err.message}，請確認帳密是否正確`,
      );
      logout();
      navigate("/login", { replace: true });
    } finally {
      setLoading(false); // 關 spinner
    }
  };

  useEffect(() => {
    const existingToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1",
    );

    if (existingToken) {
      axios.defaults.headers.common.Authorization = existingToken;
      setLoading(true);

      setTimeout(() => {
        navigate("/admin/product");
      }, 300);
      return;
    }

    if (authData) {
      const { token, expired } = authData;

      document.cookie = `myToken=${token};expires=${new Date(expired).toUTCString()}; path=/`;
      axios.defaults.headers.common.Authorization = token;

      showSuccess(`登入成功！`);
      setLoading(true);

      setTimeout(() => {
        navigate("/admin/product");
      }, 300);
    }
  }, [authData, navigate, showSuccess]);

  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="container login p-5 text-center m-5">
        <div className="row">
          <div className="col-md-6">
            <img
              src="https://i.pinimg.com/736x/0c/90/c6/0c90c6192e90dc7eb25121b3f9eb669e.jpg"
              className="img-fluid img-size-Xlarge"
              data-aos="fade-down"
              alt="手作氛圍的裝飾品，如松果、木製小樹葉等等"
            />
          </div>
          <div className="col-md-6" data-aos="zoom-in-left">
            <h2>登入後台管理商品和訂單</h2>
            <br />
            <form className="form-floating" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  id="username"
                  className="form-control"
                  placeholder="name@example.com"
                  {...register("username", emailValidation)}
                />
                <label htmlFor="username">Email address</label>
                {errors.username && (
                  <p className="text-danger">{errors.username.message}</p>
                )}
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "請輸入密碼",
                    minLength: {
                      value: 6,
                      message: "密碼長度至少需 6 碼",
                    },
                  })}
                />
                <label htmlFor="password">Password</label>
                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="btn w-100 mt-3"
                disabled={!isValid}
              >
                登入
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
