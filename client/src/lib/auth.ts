import { create } from "zustand";

type AuthState = {
  token: string | null;
  setToken: (token: string | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("goremedya_token"),
  setToken: (token) => {
    if (token) {
      localStorage.setItem("goremedya_token", token);
    } else {
      localStorage.removeItem("goremedya_token");
    }
    set({ token });
  }
}));
