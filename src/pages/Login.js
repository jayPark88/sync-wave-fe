// src/pages/Login.js
import React, { useState } from 'react';
import axios from "../util/axiosInstance";

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/v1/auth/login', { userId, password });
      // 로그인 성공 후 토큰 저장 또는 리다이렉션 처리
      console.log("로그인 성공:", response.data);
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>userId:</label><br />
          <input 
            type="email" 
            value={userId} 
            onChange={(e) => setUserId(e.target.value)} 
            placeholder='email을 입력해주세요.'
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
    </div>
  );
};

export default Login;
