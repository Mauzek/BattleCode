import type { UserResponse } from "@/types/models/auth";
import { mockUser } from "../auth";
import { apiClient } from "..";

export const userApi = {
  async updateProfile(userData: UserResponse): Promise<UserResponse> {
    
    return {...mockUser, username:userData.username};
  },

 async getProfile(userId: string): Promise<UserResponse> {
  try {
    const response = await apiClient.get<UserResponse>(`/users/profile/${userId}`);
    return response.data;
  } catch (error: any) {
    if (error?.response?.status === 404) {
      throw new Error('User not found');
    }
    throw new Error('Failed to fetch user profile');
  }
}
};