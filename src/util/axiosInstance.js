import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/service", // API의 기본 URL
  timeout: 5000, // 요청 제한 시간 (5초)
  headers: {
    "Content-Type": "application/json", // JSON 형식의 데이터 요청
  },
});

// 요청 인터셉터: 모든 요청에 Authorization 헤더 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 인증 토큰 추가
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // 요청 에러 처리
  }
);

// 응답 인터셉터: 에러 처리 공통 로직
axiosInstance.interceptors.response.use(
  (response) => {
    return response; // 성공적인 응답은 그대로 반환
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;