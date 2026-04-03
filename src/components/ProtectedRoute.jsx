//路由守衛：通過才會顯示後台
import { useEffect, useState } from "react";
import { Navigate } from "react-router";

import LoadingSpinner from "@/components/LoadingSpinner";
import { checkUserAuthApi } from "@/services/auth";

export default function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkLogin() {
      try {
        await checkUserAuthApi();
        setIsAuth(true);
      } catch (error) {
        setIsAuth(false);
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    checkLogin();
  }, []);

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

  if (!isAuth) return <Navigate to="/login" replace />;

  return children;
}
