"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/useToast";
import { NOTIFICATIONS_COPY } from "@/constants/notifications-management.constants";
import { notificationsQueryKeys } from "../constants/notifications.query-keys";
import { notificationService } from "../services";
import type { UpdateNotificationPreferenceInput } from "../types/notification.types";

export function useNotificationPreferences() {
  return useQuery({
    queryKey: notificationsQueryKeys.preferences,
    queryFn: () => notificationService.getPreferences(),
  });
}

export function useUpdateNotificationPreference() {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: (input: UpdateNotificationPreferenceInput) =>
      notificationService.updatePreference(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: notificationsQueryKeys.preferences,
      });
      toast.success({ title: NOTIFICATIONS_COPY.preferencesSaved });
    },
  });
}

export function useResetNotificationPreferences() {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
    mutationFn: () => notificationService.resetPreferences(),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: notificationsQueryKeys.preferences,
      });
      toast.success({ title: NOTIFICATIONS_COPY.preferencesResetSuccess });
    },
  });
}
