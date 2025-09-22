import React, { useState } from "react";
import { useLoading } from "../contexts/LoadingContext"; // ✅ 전역 로딩
import { useAuth } from "../hooks/useAuth";
import "../styles/Modal.css";

const ForgotPasswordPopup = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const { setIsLoading } = useLoading(); // ✅ 전역 상태 사용
  const { resetPassword, error, message } = useAuth();

  const handleSendEmail = async () => {
    setIsLoading(true); // 화면 전체 로딩 ON
    try {
      const success = await resetPassword({ email });
      if (success) {
        onClose();
      }
    } finally {
      setIsLoading(false); // 로딩 OFF
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>비밀번호 재설정</h3>
        <p>
          가입하신 이메일 주소를 입력하시면,<br />
          비밀번호 재설정 링크를 보내드립니다.
        </p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 주소"
          required
        />
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
        <div className="modal-buttons">
          <button onClick={onClose}>취소</button>
          <button onClick={handleSendEmail}>확인</button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPopup;
