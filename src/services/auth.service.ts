import { apiClient } from './api.config';
import { AuthResponse, LoginCredentials, SignupData, PasswordResetRequest, PasswordUpdateData } from '../types/auth';

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  }

  static async signup(userData: SignupData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/signup', userData);
    return response.data;
  }

  static async resetPassword(data: PasswordResetRequest): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>('/auth/reset-password', data);
    return response.data;
  }

  static async updatePassword(data: PasswordUpdateData): Promise<{ message: string }> {
    const response = await apiClient.put<{ message: string }>('/auth/password', data);
    return response.data;
  }

  static async getMyInfo(): Promise<AuthResponse> {
    const response = await apiClient.get<AuthResponse>('/auth/me');
    return response.data;
  }

  static async updateMyInfo(userData: Partial<SignupData>): Promise<AuthResponse> {
    const response = await apiClient.put<AuthResponse>('/auth/me', userData);
    return response.data;
  }

  static logout(): void {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
} 