import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../util/axiosInstance";
import ForgotPasswordPopup from "../components/ForgotPasswordPopup";
import "../styles/Login.css";

const Login = ({ setIsAuthenticated }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false); // ✅ 내부로 이동
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("/v1/auth/login", { userId, password });
      const token = response.data.data.token;

      localStorage.setItem("token", token);
      localStorage.setItem("userEmail", userId);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      setError("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
      console.error("로그인 실패:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>SyncWave 로그인</h2>
        <p className="login-subtitle">계정 정보를 입력하여 로그인하세요.</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>이메일</label>
            <input
              type="email"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="이메일을 입력하세요"
              required
            />
          </div>

          <div className="input-group">
            <label>비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-button">로그인</button>
        </form>

        <div className="login-links">
          {/* ✅ 팝업 트리거 */}
          <span
            onClick={() => setShowPopup(true)}
            style={{ cursor: "pointer", color: "#007bff", textDecoration: "underline" }}
          >
            비밀번호를 잊으셨나요?
          </span>
          <span> | </span>
          <a href="/signup">회원가입</a>
        </div>
      </div>

      {/* ✅ 팝업 표시 조건 */}
      {showPopup && <ForgotPasswordPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default Login;
