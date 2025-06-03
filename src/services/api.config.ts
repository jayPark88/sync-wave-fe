import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/service',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export interface ApiError {
  errorCode: string;
  message: string;
}

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      
      // API 에러 응답 처리
      if (data.errorCode) {
        switch (data.errorCode) {
          case 'FAIL_401':
            if (!window.location.pathname.includes('/login')) {
              alert('로그인 후 사용 가능합니다.');
              window.location.href = '/login';
            }
            break;
          case 'FAIL_403':
            alert('권한이 없습니다.');
            window.location.href = '/';
            break;
          case 'PASSWORD_RESET_EMAIL_SENT':
            // 비밀번호 재설정 이메일 전송 성공
            return Promise.resolve({ data: { message: '비밀번호 재설정 링크가 이메일로 전송되었습니다.' } });
          case 'INVALID_PASSWORD':
            return Promise.reject({ message: '현재 비밀번호가 올바르지 않습니다.' });
          case 'PASSWORD_MISMATCH':
            return Promise.reject({ message: '새 비밀번호와 확인 비밀번호가 일치하지 않습니다.' });
          case 'INVALID_RESET_TOKEN':
            return Promise.reject({ message: '유효하지 않거나 만료된 비밀번호 재설정 링크입니다.' });
          default:
            return Promise.reject({ 
              message: data.message || 'API 요청에 실패했습니다. 다시 시도해주세요.' 
            });
        }
      }
    } else if (error.request) {
      return Promise.reject({ 
        message: '서버 응답이 없습니다. 잠시 후 다시 시도해주세요.' 
      });
    }
    
    return Promise.reject({ 
      message: '예상치 못한 오류가 발생했습니다.' 
    });
  }
); 