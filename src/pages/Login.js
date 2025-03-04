import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../util/axiosInstance";
import "../styles/Login.css"; // ✅ 스타일 파일 추가

const Login = ({ setIsAuthenticated }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
          <a href="/forgot-password">비밀번호를 잊으셨나요?</a>
          <span> | </span>
          <a href="/signup">회원가입</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
