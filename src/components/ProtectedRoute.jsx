//路由守衛：通過才會顯示後台
import { useEffect, useState } from "react";
import { Navigate } from "react-router";

import LoadingSpinner from "@/components/LoadingSpinner";
import useMessage from "@/hooks/useMessage";
import { checkUserAuthApi } from "@/services/auth";

export default function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const { showSuccess, showError } = useMessage();

  useEffect(() => {
    async function checkLogin() {
      try {
        const res = await checkUserAuthApi();
        showSuccess(`登入成功：${res.status}`);
        setIsAuth(true);
      } catch (error) {
        showError(`登入失敗：${error.response?.data.message}`);
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    }

    checkLogin();
  }, [showError, showSuccess]);

  if (loading) {
    return (
      <LoadingSpinner
        fullScreen
        height={100}
        width={100}
        color="#333"
        secondaryColor="#ddd"
      />
    );
  }

  if (!isAuth) return <Navigate to="/login" />;

  return children;
}
