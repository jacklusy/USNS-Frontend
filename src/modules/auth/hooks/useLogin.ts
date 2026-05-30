"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { ROUTES } from "@/constants/routes.constants";
import { useAuthStore } from "@/store/auth.slice";
import { authService } from "../services";
import type { LoginFormData } from "../schemas/login.schema";

export function useLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setSession = useAuthStore((s) => s.setSession);

  return useMutation({
    mutationFn: (data: LoginFormData) => authService.login(data),
    onSuccess: (response) => {
      const { user, tokens } = response.data;
      setSession({
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        user,
      });
      const returnUrl = searchParams.get("returnUrl");
      const destination =
        returnUrl && returnUrl.startsWith("/") ? returnUrl : ROUTES.DASHBOARD;
      router.push(destination);
    },
  });
}
