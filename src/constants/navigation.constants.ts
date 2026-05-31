import { ROUTES } from "@/constants/routes.constants";
import { PERMISSIONS } from "@/types/permission.types";
import type { Permission } from "@/types/permission.types";
import type { UserRole } from "@/types/user.types";

export type NavIconKey =
  | "dashboard"
  | "settings"
  | "reports"
  | "users"
  | "audit"
  | "bell"
  | "inbox";

export interface NavItem {
  href?: string;
  label: string;
  icon: NavIconKey;
  requiredPermission?: Permission;
  allowedRoles?: readonly UserRole[];
  children?: readonly NavItem[];
}

export interface NavGroup {
  id: string;
  label: string;
  items: readonly NavItem[];
}

export const DASHBOARD_NAV_GROUPS: readonly NavGroup[] = [
  {
    id: "overview",
    label: "Overview",
    items: [
      {
        href: ROUTES.DASHBOARD,
        label: "Dashboard",
        icon: "dashboard",
        requiredPermission: PERMISSIONS.dashboard.view,
      },
      {
        href: ROUTES.ANNOUNCEMENTS,
        label: "Announcements",
        icon: "bell",
        requiredPermission: PERMISSIONS.notifications.view,
      },
      {
        href: ROUTES.NOTIFICATIONS,
        label: "Notification center",
        icon: "inbox",
        requiredPermission: PERMISSIONS.notifications.view,
      },
    ],
  },
  {
    id: "administration",
    label: "Administration",
    items: [
      {
        label: "Users",
        icon: "users",
        requiredPermission: PERMISSIONS.users.view,
        children: [
          {
            href: ROUTES.USERS,
            label: "All users",
            icon: "users",
            requiredPermission: PERMISSIONS.users.view,
          },
        ],
      },
      {
        label: "Roles",
        icon: "users",
        requiredPermission: PERMISSIONS.roles.view,
        children: [
          {
            href: ROUTES.ROLES,
            label: "All roles",
            icon: "users",
            requiredPermission: PERMISSIONS.roles.view,
          },
          {
            href: `${ROUTES.ROLES}?tab=matrix`,
            label: "Permission matrix",
            icon: "users",
            requiredPermission: PERMISSIONS.roles.view,
          },
        ],
      },
      {
        href: ROUTES.SETTINGS,
        label: "Settings",
        icon: "settings",
        requiredPermission: PERMISSIONS.settings.manage,
        allowedRoles: ["dba", "admin", "president"],
      },
      {
        href: ROUTES.AUDIT,
        label: "Audit logs",
        icon: "audit",
        requiredPermission: PERMISSIONS.audit.view,
        allowedRoles: ["admin", "dba", "president"],
      },
    ],
  },
  {
    id: "people",
    label: "People",
    items: [
      {
        href: ROUTES.FACULTY,
        label: "Faculty",
        icon: "users",
        requiredPermission: PERMISSIONS.faculty.view,
      },
      {
        href: ROUTES.STAFF,
        label: "Administrative staff",
        icon: "users",
        requiredPermission: PERMISSIONS.staff.view,
      },
    ],
  },
  {
    id: "academic",
    label: "Academic",
    items: [
      {
        href: ROUTES.COLLEGES,
        label: "Colleges",
        icon: "reports",
        requiredPermission: PERMISSIONS.academic.collegesManage,
      },
      {
        href: ROUTES.DEPARTMENTS,
        label: "Departments",
        icon: "reports",
        requiredPermission: PERMISSIONS.academic.departmentsManage,
      },
      {
        href: ROUTES.PROGRAMS,
        label: "Programs",
        icon: "reports",
        requiredPermission: PERMISSIONS.academic.programsManage,
      },
      {
        href: ROUTES.COURSES,
        label: "Courses",
        icon: "reports",
        requiredPermission: PERMISSIONS.academic.coursesManage,
      },
      {
        href: ROUTES.ACADEMIC_YEARS,
        label: "Academic calendar",
        icon: "reports",
        requiredPermission: PERMISSIONS.academic.calendarManage,
      },
    ],
  },
  {
    id: "insights",
    label: "Insights",
    items: [
      {
        label: "Reports",
        icon: "reports",
        requiredPermission: PERMISSIONS.reports.view,
        children: [
          {
            href: "/reports",
            label: "All reports",
            icon: "reports",
            requiredPermission: PERMISSIONS.reports.view,
          },
        ],
      },
    ],
  },
] as const;
