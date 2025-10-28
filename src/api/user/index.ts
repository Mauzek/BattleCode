import type { UserResponse } from "@/types/models/auth";
import { delay, mockUser, shouldFail } from "../auth";
import api from "..";

// заглушка
export const userApi = {
  async updateProfile(userData: UserResponse): Promise<UserResponse> {
    await delay(800);
    
    if (shouldFail()) {
      throw new Error('404');
    }

    return {...mockUser, username:userData.username};
  },

 async getProfile(userId: string): Promise<UserResponse> {
  try {
    const response = await api.get<UserResponse>(`/users/profile/${userId}`);
    return response.data;
  } catch (error: any) {
    if (error?.response?.status === 404) {
      throw new Error('User not found');
    }
    throw new Error('Failed to fetch user profile');
  }
}
};