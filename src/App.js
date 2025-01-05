import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext"; // AuthProvider로 인증 상태 관리
import Home from "./pages/Home"; // 페이지 컴포넌트
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/common/Navbar"; // 공통 컴포넌트
import ProtectedRoute from "./components/auth/ProtectedRoute"; // 인증된 사용자만 접근 가능

function App() {
  return (
    <AuthProvider>
      {/* Router는 전체 애플리케이션의 라우팅을 관리 */}
      <Router>
        <Navbar />
        <div style={{ padding: "20px" }}>
          <Routes>
            {/* 기본 페이지 라우트 */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* 인증이 필요한 경로 */}
            <Route
              path="/protected"
              element={
                <ProtectedRoute>
                  <h2>Protected Page</h2>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
