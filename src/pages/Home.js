import React from "react";
import { Navigate } from "react-router-dom";

const Home = () => {
  const token = localStorage.getItem("token");

  // 로그인하지 않은 경우 로그인 페이지로 리디렉트
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <h2>Welcome to My Website</h2>
      <p>This is the home page.</p>
    </div>
  );
};

export default Home;
