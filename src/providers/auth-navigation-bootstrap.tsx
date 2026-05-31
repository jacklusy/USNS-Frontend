"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AUTH_COPY } from "@/constants/auth.constants";
import { ROUTES } from "@/constants/routes.constants";
import { registerAuthErrorRouter } from "@/lib/auth-error-router";
import { registerHttpErrorRouter } from "@/lib/http-error-router";
import {
  registerSessionExpiredHandler,
} from "@/lib/session-handler";
import { useAuthStore } from "@/store/auth.slice";
import { useToastStore } from "@/store/toast.slice";

export function AuthNavigationBootstrap() {
  const router = useRouter();

  useEffect(() => {
    registerAuthErrorRouter((path) => {
      router.replace(path);
    });

    registerHttpErrorRouter((path) => {
      router.replace(path);
    });

    registerSessionExpiredHandler(() => {
      useAuthStore.getState().clearSession();
      useToastStore.getState().addToast({
        variant: "warning",
        title: AUTH_COPY.sessionExpiredToast,
      });
      router.replace(ROUTES.SESSION_EXPIRED);
    });
  }, [router]);

  return null;
}
