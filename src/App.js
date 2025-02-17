import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import "./styles/App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token")); // 로그인 상태 관리

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("token")); // localStorage 변경 감지 후 업데이트
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <div className="app-container" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {/* 로그인한 경우만 Header, Sidebar, Footer 표시 */}
        {isAuthenticated && <Header />}
        <div style={{ flex: 1, display: "flex" }}>
          {isAuthenticated && <Sidebar />}
          <main style={{ flex: 1, padding: "20px" }}>
            <Routes>
              <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/signup" element={<Signup />} />

              {/* 보호된 페이지 */}
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />
              </Route>
            </Routes>
          </main>
        </div>
        {isAuthenticated && <Footer />}
      </div>
    </Router>
  );
};

export default App;
