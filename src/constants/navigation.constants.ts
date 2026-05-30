import { ROUTES } from "@/constants/routes.constants";
import { PERMISSIONS } from "@/types/permission.types";
import type { Permission } from "@/types/permission.types";
import type { UserRole } from "@/types/user.types";

export interface NavItem {
  href: string;
  label: string;
  requiredPermission?: Permission;
  allowedRoles?: readonly UserRole[];
}

export const DASHBOARD_NAV_ITEMS: readonly NavItem[] = [
  {
    href: ROUTES.DASHBOARD,
    label: "Dashboard",
    requiredPermission: PERMISSIONS.dashboard.view,
  },
  {
    href: ROUTES.SETTINGS,
    label: "Settings",
    requiredPermission: PERMISSIONS.settings.manage,
    allowedRoles: ["dba", "admin", "president"],
  },
  {
    href: "/reports",
    label: "Reports",
    requiredPermission: PERMISSIONS.reports.view,
  },
  {
    href: "/users",
    label: "Users",
    requiredPermission: PERMISSIONS.users.view,
  },
  {
    href: "/audit",
    label: "Audit logs",
    requiredPermission: PERMISSIONS.audit.view,
    allowedRoles: ["dba", "president"],
  },
] as const;
