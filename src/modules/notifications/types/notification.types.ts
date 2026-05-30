import type { PaginationMeta } from "@/types/api.types";

export type NotificationCategory = "system" | "academic" | "security";

export type NotificationType =
  | "approval"
  | "maintenance"
  | "report"
  | "enrollment"
  | "security_alert"
  | "calendar"
  | "course"
  | "user";

export type NotificationReadFilter = "all" | "true" | "false";

export interface Notification {
  id: string;
  title: string;
  description: string;
  category: NotificationCategory;
  type: NotificationType;
  read: boolean;
  createdAt: string;
  linkHref?: string;
}

export type NotificationItem = Notification;

export interface NotificationListQueryParams {
  page: number;
  per_page: number;
  category?: NotificationCategory;
  read?: NotificationReadFilter;
}

export interface NotificationListMeta extends PaginationMeta {
  unread_count: number;
}

export interface NotificationPaginatedResponse {
  data: Notification[];
  meta: NotificationListMeta;
}

export interface UpdateNotificationPreferenceInput {
  typeId: string;
  inApp: boolean;
  email: boolean;
}
