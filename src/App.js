import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Sidebar from "./components/common/Sidebar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Board from "./pages/Board";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PasswordResetPage from "./pages/PasswordResetPage";
import LoadingOverlay from "./components/common/LoadingOverlay"; // ✅ 경로 맞게
import { LoadingProvider } from "./contexts/LoadingContext";

import "./styles/App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
  <LoadingProvider>
    <Router>
    <LoadingOverlay /> {/* ✅ 반드시 여기에 있어야 함 */}
      <div className="app-container" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {isAuthenticated && <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}
        <div style={{ flex: 1, display: "flex" }}>
          {isAuthenticated && <Sidebar />}
          <main style={{ flex: 1, padding: "20px" }}>
            <Routes>
              {/* ✅ 로그인 상태면 /login 접근 시 /로 리디렉트 */}
              <Route
                path="/login"
                element={isAuthenticated ? <Navigate to="/" replace /> : <Login setIsAuthenticated={setIsAuthenticated} />}
              />
              <Route path="/signup" element={<Signup />} />
              <Route path="/password/reset" element={<PasswordResetPage />} />

              {/* 보호된 페이지 */}
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/board" element={<Board />} />
              </Route>

              {/* ✅ 잘못된 경로를 "/"로 리디렉트 */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
        {isAuthenticated && <Footer />}
      </div>
    </Router>
    /</LoadingProvider>
  );
};

export default App;
