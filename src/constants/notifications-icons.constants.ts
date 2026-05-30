import type { NotificationType } from "@/modules/notifications/types/notification.types";

export type NotificationIconKey =
  | "userCheck"
  | "wrench"
  | "fileText"
  | "graduationCap"
  | "shieldAlert"
  | "calendar"
  | "bookOpen"
  | "users";

export const NOTIFICATION_TYPE_ICON_MAP: Record<
  NotificationType,
  NotificationIconKey
> = {
  approval: "userCheck",
  maintenance: "wrench",
  report: "fileText",
  enrollment: "graduationCap",
  security_alert: "shieldAlert",
  calendar: "calendar",
  course: "bookOpen",
  user: "users",
};
