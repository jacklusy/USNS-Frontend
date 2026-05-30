import { create } from "zustand";
import type { AuthUser } from "@/modules/auth/types/auth.types";
import type { UserRole } from "@/types/user.types";
import { tokenStorage } from "@/utils/token-storage";

interface AuthState {
  accessToken: string | null;
  user: AuthUser | null;
  role: UserRole | null;
  setSession: (params: {
    accessToken: string;
    refreshToken: string;
    user: AuthUser;
  }) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  role: null,
  setSession: ({ accessToken, refreshToken, user }) => {
    tokenStorage.setTokens({ accessToken, refreshToken });
    set({
      accessToken,
      user,
      role: user.role,
    });
  },
  clearSession: () => {
    tokenStorage.clearTokens();
    set({
      accessToken: null,
      user: null,
      role: null,
    });
  },
}));
