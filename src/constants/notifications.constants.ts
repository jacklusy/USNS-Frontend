import type { NotificationItem } from "@/types/notification.types";

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif_001",
    title: "Pending approvals",
    body: "14 user requests await your review.",
    read: false,
    createdAt: "2026-05-30T10:00:00Z",
  },
  {
    id: "notif_002",
    title: "System maintenance",
    body: "Scheduled maintenance window on June 2, 2026.",
    read: false,
    createdAt: "2026-05-29T14:30:00Z",
  },
  {
    id: "notif_003",
    title: "Report ready",
    body: "Monthly enrollment report is available for download.",
    read: true,
    createdAt: "2026-05-28T09:00:00Z",
  },
];

export const INITIAL_UNREAD_COUNT = INITIAL_NOTIFICATIONS.filter(
  (n) => !n.read,
).length;
