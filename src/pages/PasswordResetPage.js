// pages/PasswordResetPage.js
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "../util/axiosInstance";
import "../styles/ResetPassword.css"; // 새 스타일 추가

const PasswordResetPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (!token) {
      alert("잘못된 접근입니다.");
      navigate("/login");
    }
  }, [token, navigate]);

  const handleReset = async () => {
    try {
      await axios.post("http://localhost:8080/service/v1/auth/password-reset", {
        password: newPassword,
        token: token,
      });
      alert("비밀번호가 성공적으로 변경되었습니다.");
      navigate("/");
    } catch (err) {
      console.error("비밀번호 재설정 실패:", err);
      alert("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="reset-wrapper">
      <div className="reset-card">
        <h2>비밀번호 재설정</h2>
        <p>새로운 비밀번호를 입력해주세요.</p>
        <input
          type="password"
          placeholder="새 비밀번호"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button onClick={handleReset}>비밀번호 변경</button>
      </div>
    </div>
  );
};

export default PasswordResetPage;
