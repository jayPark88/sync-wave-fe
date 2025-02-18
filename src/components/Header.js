import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login"); // 로그아웃 후 로그인 페이지로 이동
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false); // ✅ 로그아웃 상태 즉시 반영
  };

  return (
    <header className="header">
      <h1>SyncWave</h1>
      <nav className="nav">
        {isAuthenticated ? (
          <div className="user-container">
            <Link to="/my-info" className="nav-link">My Info</Link>
            <span className="user-info">{userEmail}</span>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
