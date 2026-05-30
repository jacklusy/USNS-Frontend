"use client";

import { useEffect, useState } from "react";
import { DEMO_ACCESS_TOKEN_SESSION_EXPIRED } from "@/constants/auth-tokens.constants";
import { triggerSessionExpired } from "@/lib/session-handler";
import { authService } from "../services";
import { useAuthStore } from "@/store/auth.slice";
import { tokenStorage } from "@/utils/token-storage";
import type { AppError } from "@/types/error.types";

function isAppError(value: unknown): value is AppError {
  return (
    typeof value === "object" &&
    value !== null &&
    "code" in value &&
    "message" in value
  );
}
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

      if (storedToken === DEMO_ACCESS_TOKEN_SESSION_EXPIRED) {
        if (!cancelled) {
          triggerSessionExpired();
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
      } catch (error) {
        if (!cancelled) {
          if (
            isAppError(error) &&
            error.code === "UNAUTHORIZED" &&
            storedToken === DEMO_ACCESS_TOKEN_SESSION_EXPIRED
          ) {
            triggerSessionExpired();
          } else {
            clearSession();
          }
        }
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
