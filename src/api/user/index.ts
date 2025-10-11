import type { UserResponse } from "@/types/models/auth";
import { delay, mockUser, shouldFail } from "../auth";

// заглушка
export const userApi = {
  async updateProfile(userData: UserResponse): Promise<UserResponse> {
    await delay(800);
    
    if (shouldFail()) {
      throw new Error('404');
    }

    return {...mockUser, username:userData.username};
  },

  async getProfile(usernameFinder: string): Promise<UserResponse> {
    await delay(600);
    
    if (shouldFail()) {
      throw new Error('404');
    }

    return {...mockUser, username:usernameFinder};
  }
};