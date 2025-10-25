import type { UserResponse } from "@/types/models/auth";

const mockUser: UserResponse = {
  id: "mock-id",
  username: "mock",
  email: `mock@example.com`,
  avatarUrl:
    "https://i.pinimg.com/originals/fa/1b/03/fa1b035548cfc716ceea4fdc2907bbbd.jpg",
  roles: ["dev"],
  token: "mock-token",
  bio: "This is a mock user bio",
};

export const userApi = {
  async updateProfile(userData: UserResponse): Promise<UserResponse> {
    
    return {...mockUser, username:userData.username};
  },

  async getProfile(usernameFinder: string): Promise<UserResponse> {
    

    return {...mockUser, username:usernameFinder};
  }
};