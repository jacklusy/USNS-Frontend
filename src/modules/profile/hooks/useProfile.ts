"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { profileQueryKeys } from "../constants/profile.query-keys";
import { profileService } from "../services";
import type { UpdateProfileInput, UploadAvatarInput } from "../types/profile.types";
import { useAuthStore } from "@/store/auth.slice";
import { tokenStorage } from "@/utils/token-storage";

export function useProfile() {
  return useQuery({
    queryKey: profileQueryKeys.me,
    queryFn: () => profileService.getProfile(),
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);
  const accessToken = useAuthStore((s) => s.accessToken);
  const setSession = useAuthStore((s) => s.setSession);

  return useMutation({
    mutationFn: (input: UpdateProfileInput) => profileService.updateProfile(input),
    onSuccess: (response) => {
      void queryClient.invalidateQueries({ queryKey: profileQueryKeys.me });
      const refreshToken = tokenStorage.getRefreshToken();
      if (user && accessToken && refreshToken) {
        setSession({
          accessToken,
          refreshToken,
          user: {
            ...user,
            name: response.data.displayName,
          },
        });
      }
    },
  });
}

export function useUploadAvatar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: UploadAvatarInput) => profileService.uploadAvatar(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: profileQueryKeys.me });
    },
  });
}
