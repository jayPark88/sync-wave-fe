import { useState, useEffect } from 'react';
import { User, LoginCredentials, SignupData, PasswordResetRequest, PasswordUpdateData } from '../types/auth';
import { AuthService } from '../services/auth.service';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  const loadUser = async () => {
    try {
      const response = await AuthService.getMyInfo();
      setUser(response.user);
      setError(null);
    } catch (err: any) {
      setError(err.message || '사용자 정보를 불러오는데 실패했습니다.');
      AuthService.logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      setError(null);
      setMessage(null);
      const response = await AuthService.login(credentials);
      localStorage.setItem('token', response.token);
      setUser(response.user);
      return true;
    } catch (err: any) {
      setError(err.message || '로그인에 실패했습니다.');
      return false;
    }
  };

  const signup = async (userData: SignupData) => {
    try {
      setError(null);
      setMessage(null);
      const response = await AuthService.signup(userData);
      localStorage.setItem('token', response.token);
      setUser(response.user);
      return true;
    } catch (err: any) {
      setError(err.message || '회원가입에 실패했습니다.');
      return false;
    }
  };

  const resetPassword = async (data: PasswordResetRequest) => {
    try {
      setError(null);
      setMessage(null);
      const response = await AuthService.resetPassword(data);
      setMessage(response.message);
      return true;
    } catch (err: any) {
      setError(err.message || '비밀번호 재설정 요청에 실패했습니다.');
      return false;
    }
  };

  const updatePassword = async (data: PasswordUpdateData) => {
    try {
      setError(null);
      setMessage(null);
      const response = await AuthService.updatePassword(data);
      setMessage(response.message);
      return true;
    } catch (err: any) {
      setError(err.message || '비밀번호 변경에 실패했습니다.');
      return false;
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    setError(null);
    setMessage(null);
  };

  return {
    user,
    loading,
    error,
    message,
    login,
    signup,
    logout,
    resetPassword,
    updatePassword,
  };
}; 