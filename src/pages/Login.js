import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ForgotPasswordPopup from "../components/ForgotPasswordPopup";
import { useLoading } from "../contexts/LoadingContext";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/Login.css";

const Login = ({ setIsAuthenticated }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const { setIsLoading } = useLoading();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const success = await login(userId, password);
      if (success) {
        setIsAuthenticated(true);
        navigate("/");
      } else {
        setError("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      setError("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>SyncWave</h2>
        <p className="login-subtitle">간편하게 로그인하고 시작하세요</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              type="email"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="이메일을 입력하세요"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-button">
            로그인
          </button>
        </form>

        <div className="login-links">
          <span onClick={() => setShowPopup(true)}>비밀번호 찾기</span>
          <span> · </span>
          <a href="/signup">회원가입</a>
        </div>
      </div>

      {showPopup && <ForgotPasswordPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default Login;
