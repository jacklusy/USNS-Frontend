"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { AUTH_COPY } from "@/constants/auth.constants";
import { ROUTES } from "@/constants/routes.constants";
import { useToast } from "@/hooks/useToast";
import { authService } from "../services";
import type { ResetPasswordFormData } from "../schemas/reset-password.schema";

export function useResetPasswordToken() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const validationQuery = useQuery({
    queryKey: ["auth", "reset-token", token],
    queryFn: () => authService.validateResetToken(token),
    enabled: token.length > 0,
  });

  const tokenStatus = validationQuery.data?.data.status;
  const isValid = tokenStatus === "valid";
  const isInvalid =
    !token ||
    tokenStatus === "invalid" ||
    tokenStatus === "expired" ||
    validationQuery.isError;

  return {
    token,
    isValid,
    isInvalid,
    isLoading: validationQuery.isLoading || validationQuery.isFetching,
  };
}

export function useResetPasswordSubmit(token: string) {
  const router = useRouter();
  const toast = useToast();

  return useMutation({
    mutationFn: (data: ResetPasswordFormData) =>
      authService.resetPassword({
        token,
        password: data.password,
      }),
    onSuccess: () => {
      toast.success({ title: AUTH_COPY.resetSuccess });
      router.push(ROUTES.LOGIN);
    },
  });
}
