"use client";

import { useEffect } from "react";
import { NOTIFICATION_BELL_RECENT_LIMIT } from "@/constants/notifications.constants";
import { usePermissions } from "@/modules/auth/hooks/usePermissions";
import { PERMISSIONS } from "@/types/permission.types";
import { notificationService } from "../services";
import {
  syncNotificationStoreFromItems,
  syncNotificationStoreUnreadCount,
} from "../utils/sync-notification-store";

export function useNotificationBootstrap(): void {
  const { can } = usePermissions();
  const hasAccess = can(PERMISSIONS.notifications.view);

  useEffect(() => {
    if (!hasAccess) return;

    let cancelled = false;

    async function hydrate(): Promise<void> {
      try {
        const [recent, list] = await Promise.all([
          notificationService.listRecentUnread(NOTIFICATION_BELL_RECENT_LIMIT),
          notificationService.list({ page: 1, per_page: 1, read: "all" }),
        ]);
        if (cancelled) return;
        syncNotificationStoreFromItems(recent.data);
        syncNotificationStoreUnreadCount(list.meta.unread_count);
      } catch {
        if (!cancelled) {
          syncNotificationStoreUnreadCount(0);
        }
      }
    }

    void hydrate();

    return () => {
      cancelled = true;
    };
  }, [hasAccess]);
}
