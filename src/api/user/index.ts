import type { UserResponse } from "@/types/models/auth";


export const userApi = {
  async updateProfile(userData: UserResponse): Promise<UserResponse> {
    
    return {...mockUser, username:userData.username};
  },

  async getProfile(usernameFinder: string): Promise<UserResponse> {
    

    return {...mockUser, username:usernameFinder};
  }
};