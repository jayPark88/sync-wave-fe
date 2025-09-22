import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "../../styles/Header.css";

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
  };

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest('.user-profile-container')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  return (
    <header className="header">
      <Link to="/" className="logo-link">
        <h1>SyncWave</h1>
      </Link>
      
      <nav className="nav">
        {isAuthenticated ? (
          <div className="user-profile-container">
            <button className="profile-button" onClick={handleProfileClick}>
              <div className="profile-avatar">
                {user?.email?.[0]?.toUpperCase() || 'U'}
              </div>
            </button>
            {showDropdown && (
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <span className="user-email">{user?.email}</span>
                </div>
                <div className="dropdown-divider" />
                <button className="dropdown-item" onClick={() => navigate('/my-info')}>
                  <span className="item-icon">👤</span>
                  내 정보
                </button>
                <button className="dropdown-item" onClick={handleLogout}>
                  <span className="item-icon">🚪</span>
                  로그아웃
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="nav-link">로그인</Link>
            <Link to="/signup" className="nav-link">회원가입</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
