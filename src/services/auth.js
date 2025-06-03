import axios from '../util/axiosInstance';

export class AuthService {
  static async login(credentials) {
    const response = await axios.post('/v1/auth/login', credentials);
    return response.data;
  }

  static async signup(userData) {
    const response = await axios.post('/v1/auth/signup', userData);
    return response.data;
  }

  static async resetPassword(data) {
    const response = await axios.post('/v1/auth/password-reset/email', null, {
      params: { email: data.email }
    });
    return response.data;
  }

  static async updatePassword(data) {
    const response = await axios.put('/v1/auth/password', data);
    return response.data;
  }

  static async getMyInfo() {
    const response = await axios.get('/v1/auth/me');
    return response.data;
  }

  static async updateMyInfo(userData) {
    const response = await axios.put('/v1/auth/me', userData);
    return response.data;
  }

  static logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
} 