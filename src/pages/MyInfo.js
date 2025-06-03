import React, { useState, useContext, useEffect } from "react";
import axios from "../util/axiosInstance";
import { AuthContext } from "../contexts/AuthContext";
import { useLoading } from "../contexts/LoadingContext"; // ✅ 전역 로딩
import "../styles/MyInfo.css"; // 스타일 파일 추가

const MyInfo = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    nickName: "",
    phone: "",
  });
  const { setIsLoading } = useLoading(); // ✅ 전역 상태 사용
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' 또는 'error'

  // 사용자 정보 불러오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/v1/user/my-info");
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
        setMessage("사용자 정보를 불러오는데 실패했습니다.");
        setMessageType("error");
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchUserInfo();
    }
  }, [user, setIsLoading]);

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 정보 수정 요청
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.put("/v1/user/my-info", formData);
      setMessage("프로필이 성공적으로 업데이트되었습니다!");
      setMessageType("success");
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("프로필 업데이트에 실패했습니다. 다시 시도해주세요.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="my-info-container">
      <div className="my-info-card">
        <h2 className="my-info-title">내 정보</h2>
        <p className="my-info-subtitle">프로필 정보를 확인하고 수정하세요</p>

        <form onSubmit={handleSubmit} className="my-info-form">
          <div className="form-group">
            <label htmlFor="userName">이름</label>
            <input
              id="userName"
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="이름을 입력하세요"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="이메일을 입력하세요"
              disabled
            />
          </div>

          <div className="form-group">
            <label htmlFor="nickName">닉네임</label>
            <input
              id="nickName"
              type="text"
              name="nickName"
              value={formData.nickName}
              onChange={handleChange}
              placeholder="닉네임을 입력하세요"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">전화번호</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="전화번호를 입력하세요"
              required
            />
          </div>

          {message && (
            <p className={`update-message ${messageType}`}>
              {message}
            </p>
          )}

          <button type="submit" className="update-btn">
            정보 수정
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyInfo;
