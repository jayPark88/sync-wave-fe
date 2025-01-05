import React, { useState } from "react";
import axios from "../util/axiosInstance";
import "../styles/Signup.css"; // 스타일을 별도 CSS 파일로 분리

function Signup() {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    nickName: "",
    phone: "",
    email: "",
  });
  const [error, setError] = useState(null); // 에러 상태
  const [loading, setLoading] = useState(false); // 로딩 상태

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // 이전 에러 초기화
    setLoading(true); // 로딩 상태 시작
    try {
      const response = await axios.post("/v1/user/signUp", formData);
      alert("Signup successful!");
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed. Please try again."); // 서버 에러 메시지 표시
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          name="userName"
          placeholder="Username"
          value={formData.userName}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nickName"
          placeholder="Nickname"
          value={formData.nickName}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          pattern="^\d{10,11}$" // 전화번호 형식 검증
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      {error && <p className="signup-error">{error}</p>} {/* 에러 메시지 표시 */}
    </div>
  );
}

export default Signup;
