import type { NotificationCategory } from "./notification.types";

export type NotificationPreferenceTypeId =
  | "user_approval"
  | "user_status"
  | "system_maintenance"
  | "system_backup"
  | "academic_calendar"
  | "academic_enrollment"
  | "academic_course"
  | "security_login"
  | "security_password"
  | "report_ready";

export interface NotificationPreferenceRow {
  typeId: NotificationPreferenceTypeId;
  label: string;
  category: NotificationCategory;
  inApp: boolean;
  email: boolean;
}

export interface NotificationPreferences {
  rows: NotificationPreferenceRow[];
}
