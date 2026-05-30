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
  | "bell";

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
            href: "/users",
            label: "All users",
            icon: "users",
            requiredPermission: PERMISSIONS.users.view,
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
        href: "/audit",
        label: "Audit logs",
        icon: "audit",
        requiredPermission: PERMISSIONS.audit.view,
        allowedRoles: ["dba", "president"],
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
