// src/App.js
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
import TodoListPage from "./pages/TodoListPage";
import TodoDetailPage from "./pages/TodoDetailPage";
import MyInfo from "./pages/MyInfo";
import LoadingOverlay from "./components/common/LoadingOverlay";
import { LoadingProvider } from "./contexts/LoadingContext";
import { AuthProvider } from "./contexts/AuthContext";

import "./styles/App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("token"))
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(Boolean(localStorage.getItem("token")));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <AuthProvider>
      <LoadingProvider>
        <Router>
          <LoadingOverlay />

          <div className="app-container">
            {isAuthenticated && (
              <Header
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
              />
            )}

            <div className="main-container">
              {isAuthenticated && <Sidebar />}

              <main className="content-container">
                <Routes>
                  {/* 로그인/회원가입/비밀번호 재설정 */}
                  <Route
                    path="/login"
                    element={
                      isAuthenticated ? (
                        <Navigate to="/" replace />
                      ) : (
                        <Login setIsAuthenticated={setIsAuthenticated} />
                      )
                    }
                  />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/password/reset" element={<PasswordResetPage />} />

                  {/* 보호된 라우트 */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/board" element={<Board />} />
                    <Route path="/my-info" element={<MyInfo />} />

                    {/* To-Do 관련 페이지 */}
                    <Route path="/todos" element={<TodoListPage />} />
                    <Route path="/todos/:id" element={<TodoDetailPage />} />
                  </Route>

                  {/* 그 외 잘못된 경로는 홈으로 */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
            </div>

            {isAuthenticated && <Footer />}
          </div>
        </Router>
      </LoadingProvider>
    </AuthProvider>
  );
}

export default App;