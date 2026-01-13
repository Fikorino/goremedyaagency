import { create } from "zustand";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

type AuthState = {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("gmj_token"),
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Giriş başarısız.");
    }
    const data = (await response.json()) as { token: string };
    localStorage.setItem("gmj_token", data.token);
    set({ token: data.token });
  },
  logout: () => {
    localStorage.removeItem("gmj_token");
    set({ token: null });
  },
}));
