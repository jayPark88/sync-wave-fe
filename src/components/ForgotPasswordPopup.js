// components/ForgotPasswordPopup.js
import React, { useState } from "react";
import axios from "../util/axiosInstance";
import "../styles/Modal.css"; // 기존 스타일
import "../styles/LoadingOverlay.css"; // ✅ 로딩 오버레이 스타일

const ForgotPasswordPopup = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false); // ✅ 전체 로딩 상태

  const handleSendEmail = async () => {
    setIsLoading(true);
    try {
      await axios.post(
        "http://localhost:8080/service/v1/auth/password-reset/email",
        null,
        { params: { email } }
      );
      alert("비밀번호 재설정 링크가 이메일로 전송되었습니다.");
      onClose();
    } catch (err) {
      console.error("이메일 전송 실패:", err);
      alert("이메일 전송에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner" />
        </div>
      )}

      <div className="modal">
        <h3 style={{ marginBottom: "10px" }}>비밀번호 재설정</h3>
        <p style={{ marginBottom: "16px", fontSize: "14px" }}>
          가입한 이메일 주소를 입력해주세요.
        </p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 주소"
          required
        />
        <div className="modal-buttons">
          <button onClick={onClose} disabled={isLoading}>취소</button>
          <button onClick={handleSendEmail} disabled={isLoading}>확인</button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPopup;
