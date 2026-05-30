"use client";

import { useMutation } from "@tanstack/react-query";
import { authService } from "../services";
import type { ForgotPasswordFormData } from "../schemas/forgot-password.schema";

export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: ForgotPasswordFormData) => authService.forgotPassword(data),
  });
}
