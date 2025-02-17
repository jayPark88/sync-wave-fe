import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../util/axiosInstance";

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
      setIsAuthenticated(true); // ✅ 로그인 상태 즉시 반영!
      navigate("/");
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.error("로그인 실패:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label>User ID:</label><br />
          <input 
            type="email" 
            value={userId} 
            onChange={(e) => setUserId(e.target.value)} 
            placeholder="Enter your email"
            required 
          />
        </div>
        <div>
          <label>Password:</label><br />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
