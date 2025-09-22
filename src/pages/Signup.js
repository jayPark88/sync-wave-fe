import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../util/axiosInstance";
import "../styles/Signup.css"; // CSS 파일 추가
import { useLoading } from "../contexts/LoadingContext"; // ✅ 전역 로딩

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setIsLoading } = useLoading(); // ✅ 전역 상태 사용

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true); // 화면 전체 로딩 ON
      const response = await axios.post("/v1/user/signUp", {
        userName,
        email,
        phone,
        nickName,
        password,
      });

      if (response.status === 201 || response.status === 200) {
        alert("회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.");
        navigate("/login"); // 로그인 페이지로 이동
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
      setError("회원가입에 실패했습니다. 입력하신 정보를 다시 확인해주세요.");
    } finally {
      setIsLoading(false); // 로딩 OFF
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">SyncWave</h2>
        <p className="signup-subtitle">새로운 계정 만들기</p>
        
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="userName">이름</label>
            <input
              id="userName"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="이름을 입력하세요"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">전화번호</label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="전화번호를 입력하세요"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="nickName">닉네임</label>
            <input
              id="nickName"
              type="text"
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
              placeholder="닉네임을 입력하세요"
              required
            />
          </div>
          
          <div className="form-group">
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
          
          <button type="submit" className="signup-btn">
            회원가입
          </button>
        </form>

        <div className="signup-links">
          이미 계정이 있으신가요? <a href="/login">로그인</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
