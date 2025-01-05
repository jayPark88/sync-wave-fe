import React, { createContext, useState, useEffect } from "react";

// AuthContext: 인증 상태를 관리하기 위한 Context
export const AuthContext = createContext();

// AuthProvider: 인증 상태를 제공하는 Provider 컴포넌트
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // 현재 사용자 정보
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 메시지

  // 컴포넌트 마운트 시 로컬 스토리지에서 토큰 확인 및 사용자 정보 가져오기
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // 실제 API 호출을 통해 사용자 정보 가져오기
      fetchUserDetails(token)
        .then((userData) => setUser(userData)) // 성공 시 사용자 정보 저장
        .catch((err) => setError("사용자 정보를 가져오지 못했습니다.")) // 에러 처리
        .finally(() => setLoading(false)); // 로딩 완료
    } else {
      setLoading(false); // 토큰이 없으면 로딩 완료
    }
  }, []);

  // 사용자 로그인 처리
  const login = (userData) => {
    setUser(userData); // 사용자 정보 설정
    localStorage.setItem("token", userData.token); // 토큰 로컬 스토리지에 저장
  };

  // 사용자 로그아웃 처리
  const logout = () => {
    setUser(null); // 사용자 정보 초기화
    localStorage.removeItem("token"); // 로컬 스토리지에서 토큰 삭제
  };

  // 사용자 정보를 가져오는 비동기 함수 (예제)
  const fetchUserDetails = async (token) => {
    // 예: API 호출
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (token === "valid-token") {
          resolve({ email: "example@example.com", name: "John Doe" });
        } else {
          reject("Invalid token");
        }
      }, 1000); // 1초 후 실행
    });
  };

  // 로딩 중일 때 처리
  if (loading) {
    return <div>Loading...</div>; // 로딩 스피너 또는 메시지 표시
  }

  return (
    // AuthContext를 통해 사용자 상태와 로그인/로그아웃 함수를 하위 컴포넌트에 전달
    <AuthContext.Provider value={{ user, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};
