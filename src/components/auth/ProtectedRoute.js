import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token"); // 로그인 상태 확인

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;