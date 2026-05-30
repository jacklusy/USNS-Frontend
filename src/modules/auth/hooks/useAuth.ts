"use client";

import { useEffect, useState } from "react";
import { authService } from "../services";
import { useAuthStore } from "@/store/auth.slice";
import { tokenStorage } from "@/utils/token-storage";
export function useAuth() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const user = useAuthStore((s) => s.user);
  const role = useAuthStore((s) => s.role);
  const setSession = useAuthStore((s) => s.setSession);
  const clearSession = useAuthStore((s) => s.clearSession);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      const storedToken = tokenStorage.getAccessToken();
      const storedRefresh = tokenStorage.getRefreshToken();

      if (!storedToken || !storedRefresh) {
        if (!cancelled) {
          clearSession();
          setIsHydrated(true);
        }
        return;
      }

      const current = useAuthStore.getState();
      if (current.accessToken && current.user) {
        if (!cancelled) setIsHydrated(true);
        return;
      }

      try {
        const response = await authService.getMe();
        if (!cancelled) {
          setSession({
            accessToken: storedToken,
            refreshToken: storedRefresh,
            user: response.data,
          });
        }
      } catch {
        if (!cancelled) clearSession();
      } finally {
        if (!cancelled) setIsHydrated(true);
      }
    }

    void hydrate();

    return () => {
      cancelled = true;
    };
  }, [setSession, clearSession]);

  return {
    user,
    role,
    isAuthenticated: Boolean(accessToken && user),
    isHydrated,
  };
}
