import type { NotificationPreferences } from "@/modules/notifications/types/preferences.types";
import type { NotificationPreferenceRow } from "@/modules/notifications/types/preferences.types";
import type { NotificationPreferenceTypeId } from "@/modules/notifications/types/preferences.types";
import type { UpdateNotificationPreferenceInput } from "@/modules/notifications/types/notification.types";

const DEFAULT_PREFERENCE_ROWS: NotificationPreferenceRow[] = [
  {
    typeId: "user_approval",
    label: "User approval requests",
    category: "system",
    inApp: true,
    email: true,
  },
  {
    typeId: "user_status",
    label: "User account status changes",
    category: "system",
    inApp: true,
    email: false,
  },
  {
    typeId: "system_maintenance",
    label: "System maintenance windows",
    category: "system",
    inApp: true,
    email: true,
  },
  {
    typeId: "system_backup",
    label: "Backup completion alerts",
    category: "system",
    inApp: true,
    email: false,
  },
  {
    typeId: "academic_calendar",
    label: "Academic calendar updates",
    category: "academic",
    inApp: true,
    email: true,
  },
  {
    typeId: "academic_enrollment",
    label: "Enrollment and capacity alerts",
    category: "academic",
    inApp: true,
    email: true,
  },
  {
    typeId: "academic_course",
    label: "Course and curriculum changes",
    category: "academic",
    inApp: true,
    email: false,
  },
  {
    typeId: "security_login",
    label: "Unusual login activity",
    category: "security",
    inApp: true,
    email: true,
  },
  {
    typeId: "security_password",
    label: "Password and policy updates",
    category: "security",
    inApp: true,
    email: true,
  },
  {
    typeId: "report_ready",
    label: "Report ready for download",
    category: "system",
    inApp: true,
    email: false,
  },
];

function cloneDefaultRows(): NotificationPreferenceRow[] {
  return DEFAULT_PREFERENCE_ROWS.map((row) => ({ ...row }));
}

const preferencesByUser = new Map<string, NotificationPreferenceRow[]>();

export function getPreferencesForUser(
  userId: string,
): NotificationPreferences {
  if (!preferencesByUser.has(userId)) {
    preferencesByUser.set(userId, cloneDefaultRows());
  }
  return { rows: preferencesByUser.get(userId) ?? cloneDefaultRows() };
}

export function updatePreferenceForUser(
  userId: string,
  input: UpdateNotificationPreferenceInput,
): NotificationPreferences {
  const rows = getPreferencesForUser(userId).rows.map((row) =>
    row.typeId === input.typeId
      ? { ...row, inApp: input.inApp, email: input.email }
      : row,
  );
  preferencesByUser.set(userId, rows);
  return { rows };
}

export function resetPreferencesForUser(
  userId: string,
): NotificationPreferences {
  const rows = cloneDefaultRows();
  preferencesByUser.set(userId, rows);
  return { rows };
}

export function isValidPreferenceTypeId(
  value: string,
): value is NotificationPreferenceTypeId {
  return DEFAULT_PREFERENCE_ROWS.some((row) => row.typeId === value);
}
