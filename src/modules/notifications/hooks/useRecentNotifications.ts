"use client";

import { useQuery } from "@tanstack/react-query";
import { NOTIFICATION_BELL_RECENT_LIMIT } from "@/constants/notifications.constants";
import { notificationsQueryKeys } from "../constants/notifications.query-keys";
import { notificationService } from "../services";

export function useRecentNotifications(enabled = true) {
  return useQuery({
    queryKey: notificationsQueryKeys.recent(NOTIFICATION_BELL_RECENT_LIMIT),
    queryFn: () =>
      notificationService.listRecentUnread(NOTIFICATION_BELL_RECENT_LIMIT),
    enabled,
  });
}
