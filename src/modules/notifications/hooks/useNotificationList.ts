"use client";

import { useQuery } from "@tanstack/react-query";
import { notificationsQueryKeys } from "../constants/notifications.query-keys";
import { notificationService } from "../services";
import type { NotificationListQueryParams } from "../types/notification.types";

export function useNotificationList(params: NotificationListQueryParams) {
  return useQuery({
    queryKey: notificationsQueryKeys.list(params),
    queryFn: () => notificationService.list(params),
  });
}
