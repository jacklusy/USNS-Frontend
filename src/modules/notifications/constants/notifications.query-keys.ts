import type { NotificationListQueryParams } from "../types/notification.types";

const notificationsRoot = ["notifications"] as const;

export const notificationsQueryKeys = {
  root: notificationsRoot,
  all: [...notificationsRoot] as const,
  list: (params: NotificationListQueryParams) =>
    [...notificationsRoot, "list", params] as const,
  recent: (limit: number) =>
    [...notificationsRoot, "recent", limit] as const,
  preferences: [...notificationsRoot, "preferences"] as const,
};
