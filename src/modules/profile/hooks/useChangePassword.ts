"use client";

import { useMutation } from "@tanstack/react-query";
import { profileService } from "../services";
import type { ChangePasswordInput } from "../types/profile.types";

export function useChangePassword() {
  return useMutation({
    mutationFn: (input: ChangePasswordInput) =>
      profileService.changePassword(input),
  });
}
