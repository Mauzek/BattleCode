import axios from "axios";
import type {
  LoginModel,
  RegisterModel,
  UserResponse,
} from "@/types/models/auth";
import { apiClient } from "..";

// заглушка
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
export const shouldFail = () => Math.random() > 0.5;

// Заглушка
export const mockUser: UserResponse = {
  id: 'mock-id',
  userId:'mock-userid',
  username: "boby",
  email: `mock@example.com`,
  token: "mock-token",
  avatarUrl:
    "https://i.pinimg.com/originals/fa/1b/03/fa1b035548cfc716ceea4fdc2907bbbd.jpg",
  roles: ["dev"],
  bio: "This is a mock user bio",
};

// Заглушка
export const authApi = {
  async login(loginData: LoginModel): Promise<UserResponse> {
    try {
      const response = await apiClient.post<UserResponse>(
        "/auth/login",
        loginData
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message || "Login failed";
        throw new Error(`${status}: ${message}`);
      }
      throw error;
    }
  },

  async logout(uid: string): Promise<boolean> {
    try {
      await apiClient.post(`/auth/logout/${uid}`);
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        throw new Error(`Logout failed (${status})`);
      }
      throw error;
    }
  },

  async refresh(): Promise<UserResponse> {
    try {
      const response = await apiClient.post<UserResponse>("/auth/refresh", {});
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message || "Token refresh failed";
        throw new Error(`${status}: ${message}`);
      }
      throw error;
    }
  },

  async registration(regData: RegisterModel) {
    try {
      const response = await apiClient.post("/auth/register", regData);
      return !!response.status;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message || "Registration failed";
        throw new Error(`${status}: ${message}`);
      }
      throw error;
    }
  },

  async confirmEmail(token: number, email: string) {
    try {
      const response = await apiClient.get(
        `/email/verify?token=${token}&email=${email}`
      );
      return !!response.status;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message || "Confirm email failed";
        throw new Error(`${status}: ${message}`);
      }
      throw error;
    }
  },
};
