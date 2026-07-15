import { create } from "zustand";
import { User, UserRole } from "@/types";
import { authApi } from "@/services/api/auth";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  mockSwitchRole: (role: UserRole) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string) => {
    set({ isLoading: true, error: null });
    try {
      const user = await authApi.login(email);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || "Failed to login", isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await authApi.logout();
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
    }
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const user = await authApi.getCurrentUser();
      set({ user, isAuthenticated: !!user, isLoading: false });
    } catch (error) {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  // Helper for demo purposes to quickly switch roles
  mockSwitchRole: (role: UserRole) => {
    set((state) => {
      if (!state.user) return state;
      return {
        user: { ...state.user, role }
      };
    });
  }
}));
