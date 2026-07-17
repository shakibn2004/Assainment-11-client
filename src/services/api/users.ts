import { getAuthToken } from "@/lib/auth-utils";

const API_URL = process.env.NEXT_PUBLIC_LOCAL_URI || 'http://localhost:8000';

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  status?: string;
  image?: string;
  createdAt: string;
}

export const usersApi = {
  getUsers: async (): Promise<User[]> => {
    try {
      const token = await getAuthToken();
      if (!token) throw new Error("No auth token");

      const res = await fetch(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const err = await res.text();
        console.error("Server error fetching users:", res.status, err);
        throw new Error(`Failed to fetch users: ${res.status}`);
      }
      return res.json();
    } catch (error) {
      console.error("Error fetching users (frontend):", error);
      return [];
    }
  },

  updateUser: async (
    id: string,
    data: { role?: string; status?: string },
  ): Promise<boolean> => {
    try {
      const token = await getAuthToken();
      if (!token) throw new Error("No auth token");

      const res = await fetch(`${API_URL}/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      return res.ok;
    } catch (error) {
      console.error("Error updating user:", error);
      return false;
    }
  },

  deleteUser: async (id: string): Promise<boolean> => {
    try {
      const token = await getAuthToken();
      if (!token) throw new Error("No auth token");

      const res = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.ok;
    } catch (error) {
      console.error("Error deleting user:", error);
      return false;
    }
  },
};
