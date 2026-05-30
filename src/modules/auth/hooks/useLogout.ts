"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { ROUTES } from "@/constants/routes.constants";
import { authService } from "../services";
import { useAuthStore } from "@/store/auth.slice";

export function useLogout() {
  const router = useRouter();
  const clearSession = useAuthStore((s) => s.clearSession);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = useCallback(async () => {
    setIsLoggingOut(true);
    try {
      await authService.logout();
    } finally {
      clearSession();
      setIsLoggingOut(false);
      router.replace(ROUTES.LOGIN);
    }
  }, [clearSession, router]);

  return { logout, isLoggingOut };
}
