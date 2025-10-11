import type { LoginModel, UserResponse } from "@/types/models/auth";

// заглушка
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
export const shouldFail = () => Math.random() > 0.5;

// Заглушка
export const mockUser: UserResponse = {
  username: "mock",
  email: `mock@example.com`,
  avatarUrl:
    "https://i.pinimg.com/originals/fa/1b/03/fa1b035548cfc716ceea4fdc2907bbbd.jpg",
  roles: ["dev"],
  bio: "This is a mock user bio",
};

// Заглушка
export const authApi = {
  async login(loginData: LoginModel): Promise<UserResponse> {
    await delay(1000);

    if (shouldFail()) {
      throw new Error("404");
    }

    const user: UserResponse = { ...mockUser, username: loginData.username };

    return user;
  },

  async logout(): Promise<boolean> {
    await delay(500);

    if (shouldFail()) {
      throw new Error("500");
    }

    return true;
  },
};
