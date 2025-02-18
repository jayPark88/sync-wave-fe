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
      setError("Login failed. Please check your credentials.");
      console.error("로그인 실패:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login to SyncWave</h2>
        <p className="login-subtitle">Please enter your credentials to access your account.</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-button">Login</button>
        </form>

        <div className="login-links">
          <a href="/forgot-password">Forgot Password?</a>
          <span> | </span>
          <a href="/signup">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
