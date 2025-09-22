export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData extends Omit<LoginCredentials, 'password'> {
  password: string;
  passwordConfirm: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordUpdateData {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
} 