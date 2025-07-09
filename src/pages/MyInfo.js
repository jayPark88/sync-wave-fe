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
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('인증 토큰이 없습니다.');
        }

        const response = await axios.post("/v1/user/info", {
          token: token
        });

        if (response.data.result) {
          const userData = response.data.data;
          setFormData({
            userName: userData.userName,
            email: userData.email,
            nickName: userData.nickName,
            phone: userData.phone
          });
        } else {
          throw new Error(response.data.errorMessage || '사용자 정보를 불러오는데 실패했습니다.');
        }
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
    const { name, value } = e.target;
    
    // 전화번호 입력 처리
    if (name === 'phone') {
      // 숫자와 하이픈만 허용
      const phoneNumber = value.replace(/[^0-9-]/g, '');
      // 하이픈 제거
      const cleanNumber = phoneNumber.replace(/-/g, '');
      
      // 11자리 제한
      if (cleanNumber.length > 11) {
        return;
      }

      // 값이 있는 경우에만 formData에 포함
      setFormData(prev => {
        const newData = { ...prev };
        if (cleanNumber) {
          newData[name] = cleanNumber;
        } else {
          delete newData[name];
        }
        return newData;
      });
      return;
    }

    // 다른 필드 처리
    setFormData(prev => {
      const newData = { ...prev };
      if (value.trim()) {
        newData[name] = value;
      } else {
        delete newData[name];
      }
      return newData;
    });
  };

  // 전화번호 유효성 검사
  const validatePhone = (phone) => {
    if (!phone) return true; // 빈 값은 허용 (필수값이 아닌 경우)
    const phoneRegex = /^[0-9]{11}$/;
    return phoneRegex.test(phone);
  };

  // 정보 수정 요청
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 전화번호 유효성 검사
    if (formData.phone && !validatePhone(formData.phone)) {
      setMessage("전화번호는 11자리 숫자만 입력 가능합니다.");
      setMessageType("error");
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('인증 토큰이 없습니다.');
      }

      // 현재 formData에서 필요한 필드만 추출
      const updateData = {
        ...formData,
        token: token
      };

      // email이 있는 경우에만 포함
      if (formData.email) {
        updateData.email = formData.email;
      }

      // role은 서버에서 자동으로 설정되므로 제외

      const response = await axios.patch('/v1/user', updateData);
      console.log('PATCH 응답:', response);
      
      setMessage("프로필이 성공적으로 업데이트되었습니다!");
      setMessageType("success");
    } catch (error) {
      console.error("Error updating profile:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response,
        request: error.request
      });
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
