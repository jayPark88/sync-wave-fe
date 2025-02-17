import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css"; // 스타일 파일 추가

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ email: localStorage.getItem("userEmail") || "User" });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setUser(null);
    navigate("/login"); // 로그아웃 후 로그인 페이지로 이동
  };

  return (
    <header className="header">
      <h1>SyncWave</h1>
      <nav className="nav">
        {user ? (
          <div className="user-container">
            <Link to="/my-info" className="nav-link">My Info</Link>
            <span className="user-info">{user.email}</span>
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