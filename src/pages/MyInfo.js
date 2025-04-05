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

  // 사용자 정보 불러오기
  useEffect(() => {
    if (user) {
      axios.get("/v1/user/my-info")
        .then((response) => {
          setFormData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });
    }
  }, [user]);

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 정보 수정 요청
  const handleSubmit = async (e) => {
    setIsLoading(true); // 화면 전체 로딩 ON
    e.preventDefault();
    try {
      await axios.put("/v1/user/my-info", formData);
      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false); // 로딩 OFF
    }
  };

  return (
    <div className="my-info-container">
      <h2>My Info</h2>
      <form onSubmit={handleSubmit} className="my-info-form">
        <input
          type="text"
          name="userName"
          placeholder="Username"
          value={formData.userName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          disabled // 이메일 변경 불가
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
        />
        <button type="submit">Update Info</button>
      </form>
      {message && <p className="update-message">{message}</p>}
    </div>
  );
};

export default MyInfo;
