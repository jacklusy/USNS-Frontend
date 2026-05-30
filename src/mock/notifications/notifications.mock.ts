import {
  academicYearDetailRoute,
  collegeDetailRoute,
  courseDetailRoute,
  departmentDetailRoute,
  facultyDetailRoute,
  programDetailRoute,
  ROUTES,
  userDetailRoute,
} from "@/constants/routes.constants";
import type {
  Notification,
  NotificationCategory,
  NotificationListQueryParams,
  NotificationPaginatedResponse,
  NotificationReadFilter,
} from "@/modules/notifications/types/notification.types";

const SEED_NOTIFICATIONS: Notification[] = [
  {
    id: "notif_001",
    title: "Pending user approvals",
    description: "14 user requests await your review.",
    category: "system",
    type: "approval",
    read: false,
    createdAt: "2026-05-31T09:15:00Z",
    linkHref: ROUTES.USERS,
  },
  {
    id: "notif_002",
    title: "Scheduled maintenance",
    description: "Maintenance window on June 2, 2026 from 02:00–04:00 UTC.",
    category: "system",
    type: "maintenance",
    read: false,
    createdAt: "2026-05-30T18:00:00Z",
    linkHref: ROUTES.SETTINGS,
  },
  {
    id: "notif_003",
    title: "Enrollment report ready",
    description: "Monthly enrollment summary is available for download.",
    category: "system",
    type: "report",
    read: true,
    createdAt: "2026-05-30T10:00:00Z",
  },
  {
    id: "notif_004",
    title: "Backup completed",
    description: "Nightly database backup finished successfully.",
    category: "system",
    type: "maintenance",
    read: true,
    createdAt: "2026-05-29T06:30:00Z",
    linkHref: ROUTES.SETTINGS,
  },
  {
    id: "notif_005",
    title: "New dean assignment",
    description: "Sara Mitchell was assigned to College of Engineering.",
    category: "academic",
    type: "user",
    read: false,
    createdAt: "2026-05-31T08:00:00Z",
    linkHref: userDetailRoute("usr_dean"),
  },
  {
    id: "notif_006",
    title: "Semester dates published",
    description: "Fall 2026 semester dates are now visible on the calendar.",
    category: "academic",
    type: "calendar",
    read: false,
    createdAt: "2026-05-30T14:20:00Z",
    linkHref: academicYearDetailRoute("ay_2026_fall"),
  },
  {
    id: "notif_007",
    title: "Course capacity warning",
    description: "CS301 enrollment reached 95% of capacity.",
    category: "academic",
    type: "course",
    read: false,
    createdAt: "2026-05-30T11:45:00Z",
    linkHref: courseDetailRoute("course_cs301"),
  },
  {
    id: "notif_008",
    title: "Program review due",
    description: "BSc Computer Science accreditation review is due in 7 days.",
    category: "academic",
    type: "enrollment",
    read: true,
    createdAt: "2026-05-29T16:00:00Z",
    linkHref: programDetailRoute("prog_bsc_cs"),
  },
  {
    id: "notif_009",
    title: "Department head updated",
    description: "Dr. Ahmed Nasser is now head of Mathematics.",
    category: "academic",
    type: "user",
    read: true,
    createdAt: "2026-05-28T09:30:00Z",
    linkHref: departmentDetailRoute("dept_math"),
  },
  {
    id: "notif_010",
    title: "College audit scheduled",
    description: "College of Business internal audit starts next Monday.",
    category: "academic",
    type: "calendar",
    read: false,
    createdAt: "2026-05-27T13:00:00Z",
    linkHref: collegeDetailRoute("col_business"),
  },
  {
    id: "notif_011",
    title: "Faculty profile incomplete",
    description: "3 faculty records are missing required credentials.",
    category: "academic",
    type: "user",
    read: true,
    createdAt: "2026-05-26T10:15:00Z",
    linkHref: ROUTES.FACULTY,
  },
  {
    id: "notif_012",
    title: "New course proposal",
    description: "Data Ethics (CS410) awaits curriculum committee approval.",
    category: "academic",
    type: "course",
    read: false,
    createdAt: "2026-05-25T15:40:00Z",
    linkHref: courseDetailRoute("course_cs410"),
  },
  {
    id: "notif_013",
    title: "Unusual login detected",
    description: "Sign-in from a new device in Cairo, Egypt.",
    category: "security",
    type: "security_alert",
    read: false,
    createdAt: "2026-05-31T07:30:00Z",
  },
  {
    id: "notif_014",
    title: "Password policy updated",
    description: "Minimum password length increased to 12 characters.",
    category: "security",
    type: "security_alert",
    read: false,
    createdAt: "2026-05-30T08:00:00Z",
    linkHref: ROUTES.SETTINGS,
  },
  {
    id: "notif_015",
    title: "Failed login attempts",
    description: "5 failed attempts on admin account in the last hour.",
    category: "security",
    type: "security_alert",
    read: true,
    createdAt: "2026-05-29T22:10:00Z",
    linkHref: ROUTES.USERS,
  },
  {
    id: "notif_016",
    title: "API key rotation reminder",
    description: "Security API key is due for rotation within 14 days.",
    category: "security",
    type: "security_alert",
    read: true,
    createdAt: "2026-05-28T12:00:00Z",
    linkHref: ROUTES.SETTINGS,
  },
  {
    id: "notif_017",
    title: "Faculty account locked",
    description: "Elena Vasquez account locked after multiple failed logins.",
    category: "security",
    type: "user",
    read: false,
    createdAt: "2026-05-27T19:45:00Z",
    linkHref: facultyDetailRoute("fac_elena"),
  },
  {
    id: "notif_018",
    title: "Session timeout changed",
    description: "Idle session timeout updated to 45 minutes.",
    category: "security",
    type: "security_alert",
    read: true,
    createdAt: "2026-05-26T08:20:00Z",
  },
  {
    id: "notif_019",
    title: "Bulk user import complete",
    description: "128 staff accounts imported successfully.",
    category: "system",
    type: "user",
    read: false,
    createdAt: "2026-05-24T17:00:00Z",
    linkHref: ROUTES.USERS,
  },
  {
    id: "notif_020",
    title: "Academic year rollover",
    description: "2025–2026 academic year marked as active.",
    category: "academic",
    type: "calendar",
    read: true,
    createdAt: "2026-05-23T09:00:00Z",
    linkHref: ROUTES.ACADEMIC_YEARS,
  },
  {
    id: "notif_021",
    title: "Critical announcement posted",
    description: "Campus network maintenance notice published to all users.",
    category: "system",
    type: "maintenance",
    read: false,
    createdAt: "2026-05-22T14:30:00Z",
    linkHref: ROUTES.ANNOUNCEMENTS,
  },
  {
    id: "notif_022",
    title: "Quarterly compliance report",
    description: "Q2 compliance report is ready for executive review.",
    category: "system",
    type: "report",
    read: true,
    createdAt: "2026-05-20T11:00:00Z",
  },
];

let notificationsStore: Notification[] = SEED_NOTIFICATIONS.map((item) => ({
  ...item,
}));

export function getNotificationsStore(): Notification[] {
  return notificationsStore;
}

export function countUnreadNotifications(): number {
  return notificationsStore.filter((item) => !item.read).length;
}

function isCategory(value: string): value is NotificationCategory {
  return value === "system" || value === "academic" || value === "security";
}

function matchesReadFilter(
  item: Notification,
  read?: NotificationReadFilter,
): boolean {
  if (!read || read === "all") return true;
  if (read === "true") return item.read;
  return !item.read;
}

export function filterNotifications(
  items: Notification[],
  params: NotificationListQueryParams,
): Notification[] {
  return items.filter((item) => {
    if (params.category && item.category !== params.category) {
      return false;
    }
    return matchesReadFilter(item, params.read);
  });
}

export function paginateNotifications(
  items: Notification[],
  page: number,
  perPage: number,
): NotificationPaginatedResponse {
  const total = items.length;
  const lastPage = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(Math.max(1, page), lastPage);
  const start = (safePage - 1) * perPage;
  const data = items.slice(start, start + perPage);

  return {
    data,
    meta: {
      total,
      page: safePage,
      per_page: perPage,
      last_page: lastPage,
      unread_count: countUnreadNotifications(),
    },
  };
}

export function listRecentUnreadFromStore(limit: number): Notification[] {
  return notificationsStore
    .filter((item) => !item.read)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, limit);
}

export function markNotificationReadInStore(id: string): Notification | null {
  const index = notificationsStore.findIndex((item) => item.id === id);
  if (index < 0) return null;
  const updated = { ...notificationsStore[index], read: true };
  notificationsStore = notificationsStore.map((item, i) =>
    i === index ? updated : item,
  );
  return updated;
}

export function markNotificationUnreadInStore(id: string): Notification | null {
  const index = notificationsStore.findIndex((item) => item.id === id);
  if (index < 0) return null;
  const updated = { ...notificationsStore[index], read: false };
  notificationsStore = notificationsStore.map((item, i) =>
    i === index ? updated : item,
  );
  return updated;
}

export function markAllNotificationsReadInStore(): void {
  notificationsStore = notificationsStore.map((item) => ({
    ...item,
    read: true,
  }));
}

export function deleteNotificationFromStore(id: string): boolean {
  const before = notificationsStore.length;
  notificationsStore = notificationsStore.filter((item) => item.id !== id);
  return notificationsStore.length < before;
}
