// Тип для логина
export interface LoginModel {
  username: string;
  password: string;
  captchaResponse: string;
}

// Тип для получения данных пользователя (без паролей)
export interface UserResponse {
  username: string;
  email: string;
  avatarUrl?: string;
  roles: string[];
  bio?: string;
}

// Тип для обновления профиля
export interface UpdateUserRequest {
  username?: string;
  email?: string;
  avatarUrl?: string;
  bio?: string;
}

// Тип для аутх стейта
export interface AuthState {
  user: UserResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface UserResponseWithPassword extends UserResponse {
  password: string;
  passwordConfirmation: string;
}