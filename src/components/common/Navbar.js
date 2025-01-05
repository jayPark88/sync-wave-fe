import React, { useContext } from "react";
import { NavLink } from "react-router-dom"; // NavLink를 사용하면 현재 경로를 기반으로 스타일을 동적으로 설정할 수 있습니다.
import { AuthContext } from "../../contexts/AuthContext"; // 인증 상태를 가져오기 위한 Context
import "../../styles/Navbar.css"; // 스타일을 별도 CSS 파일로 분리

function Navbar() {
  const { user, logout } = useContext(AuthContext); // 인증 상태(user)와 로그아웃 함수(logout)를 Context에서 가져옵니다.

  return (
    <nav className="navbar">
      {/* NavLink는 현재 활성화된 경로에 따라 동적으로 스타일을 설정합니다 */}
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "active-link" : "link")}
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) => (isActive ? "active-link" : "link")}
      >
        About
      </NavLink>
      {user ? (
        // 로그인된 사용자의 경우 Logout 버튼과 사용자 정보 표시
        <>
          <span className="user-info">{user.email}</span>
          <button className="logout-button" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        // 비로그인 사용자의 경우 Login과 Signup 링크 표시
        <>
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? "active-link" : "link")}
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className={({ isActive }) => (isActive ? "active-link" : "link")}
          >
            Signup
          </NavLink>
        </>
      )}
    </nav>
  );
}

export default Navbar;
