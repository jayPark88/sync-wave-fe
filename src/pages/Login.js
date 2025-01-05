import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../util/axiosInstance";
import { AuthContext } from "../contexts/AuthContext"; // AuthContext 가져오기

function Login() {
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  });
  const [error, setError] = useState(null); // 에러 메시지 상태 관리
  const { login } = useContext(AuthContext); // AuthContext의 login 함수 가져오기
  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const location = useLocation(); // 로그인 이전 경로 정보 가져오기

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // 제출 시 이전 에러 상태 초기화
    try {
      const response = await axios.post("/v1/auth/login", formData); // API 호출
      const token = response.data.data.token; // 토큰 가져오기
      localStorage.setItem("token", token); // 로컬 스토리지에 토큰 저장
      login({ email: formData.userId }); // AuthContext를 통해 로그인 상태 업데이트
      const from = location.state?.from?.pathname || "/"; // 이전 경로가 없으면 기본 경로로 설정
      navigate(from, { replace: true }); // 성공 시 리다이렉트
    } catch (error) {
      setError("Login failed. Please check your credentials."); // 에러 메시지 설정
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="userId"
          placeholder="Email"
          value={formData.userId}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* 에러 메시지 표시 */}
    </div>
  );
}

export default Login;
