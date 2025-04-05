import React, { useState } from "react";
import { useLoading } from "../contexts/LoadingContext"; // ✅ 전역 로딩
import axios from "../util/axiosInstance";
import "../styles/Modal.css";

const ForgotPasswordPopup = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const { setIsLoading } = useLoading(); // ✅ 전역 상태 사용

  const handleSendEmail = async () => {
    setIsLoading(true); // 화면 전체 로딩 ON
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
      setIsLoading(false); // 로딩 OFF
    }
  };

  return (
    <div className="modal-overlay">
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
          <button onClick={onClose}>취소</button>
          <button onClick={handleSendEmail}>확인</button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPopup;
