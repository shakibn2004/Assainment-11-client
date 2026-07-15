import { User } from "@/types";
import { MOCK_USERS } from "../mock/data";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authApi = {
  login: async (email: string): Promise<User> => {
    await delay(1000); // Simulate network request
    const user = MOCK_USERS.find(u => u.email === email);
    if (!user) {
      throw new Error("Invalid credentials");
    }
    return user;
  },
  
  logout: async (): Promise<void> => {
    await delay(500);
  },

  getCurrentUser: async (): Promise<User | null> => {
    await delay(300);
    // Simulating no active session initially
    return null; 
  }
};
