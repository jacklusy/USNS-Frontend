"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NOTIFICATION_BELL_RECENT_LIMIT } from "@/constants/notifications.constants";
import { useNotificationStore } from "@/store/notification.slice";
import { notificationsQueryKeys } from "../constants/notifications.query-keys";
import { notificationService } from "../services";
import {
  syncNotificationStoreFromItems,
  syncNotificationStoreUnreadCount,
} from "../utils/sync-notification-store";

async function refreshStoreFromRecent(
  queryClient: ReturnType<typeof useQueryClient>,
): Promise<void> {
  const recent = await notificationService.listRecentUnread(
    NOTIFICATION_BELL_RECENT_LIMIT,
  );
  syncNotificationStoreFromItems(recent.data);
  const list = await notificationService.list({
    page: 1,
    per_page: 1,
    read: "all",
  });
  syncNotificationStoreUnreadCount(list.meta.unread_count);
  await queryClient.invalidateQueries({
    queryKey: notificationsQueryKeys.all,
  });
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();
  const markRead = useNotificationStore((s) => s.markRead);
  return useMutation({
    mutationFn: (id: string) => notificationService.markRead(id),
    onSuccess: async (_data, id) => {
      markRead(id);
      await refreshStoreFromRecent(queryClient);
    },
  });
}

export function useMarkNotificationUnread() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => notificationService.markUnread(id),
    onSuccess: async () => {
      await refreshStoreFromRecent(queryClient);
    },
  });
}

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient();
  const markAllRead = useNotificationStore((s) => s.markAllRead);
  return useMutation({
    mutationFn: () => notificationService.markAllRead(),
    onSuccess: async () => {
      markAllRead();
      await refreshStoreFromRecent(queryClient);
    },
  });
}

export function useDeleteNotification() {
  const queryClient = useQueryClient();
  const remove = useNotificationStore((s) => s.remove);
  return useMutation({
    mutationFn: (id: string) => notificationService.delete(id),
    onSuccess: async (_data, id) => {
      remove(id);
      await refreshStoreFromRecent(queryClient);
    },
  });
}
