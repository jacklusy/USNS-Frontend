import { getPermissionsForRole } from "@/constants/role-permissions.constants";
import { PERMISSIONS, type Permission } from "@/types/permission.types";
import type { UserRole } from "@/types/user.types";

function collectPermissions(node: unknown): Permission[] {
  if (typeof node === "string") {
    return [node as Permission];
  }
  if (typeof node === "object" && node !== null) {
    return Object.values(node).flatMap(collectPermissions);
  }
  return [];
}

const ALL_PERMISSIONS = collectPermissions(PERMISSIONS) as readonly Permission[];

export const ALL_PERMISSION_VALUES = ALL_PERMISSIONS as readonly [
  Permission,
  ...Permission[],
];

const PERMISSION_CATEGORY_LABELS: Record<string, string> = {
  users: "Users",
  roles: "Roles",
  dashboard: "Dashboard",
  reports: "Reports",
  academic: "Academic",
  faculty: "Faculty",
  staff: "Staff",
  settings: "Settings",
  notifications: "Notifications",
  audit: "Audit",
};

const PERMISSION_LABELS: Record<Permission, string> = {
  "users.view": "View users",
  "users.create": "Create users",
  "users.edit": "Edit users",
  "users.delete": "Delete users",
  "roles.view": "View roles",
  "roles.manage": "Manage roles",
  "dashboard.view": "View dashboard",
  "reports.view": "View reports",
  "reports.export": "Export reports",
  "academic.colleges.manage": "Manage colleges",
  "academic.departments.manage": "Manage departments",
  "academic.programs.manage": "Manage programs",
  "academic.courses.manage": "Manage courses",
  "faculty.view": "View faculty",
  "faculty.manage": "Manage faculty",
  "staff.view": "View staff",
  "staff.manage": "Manage staff",
  "settings.view": "View settings",
  "settings.manage": "Manage settings",
  "notifications.view": "View notifications",
  "notifications.manage": "Manage notifications",
  "audit.view": "View audit logs",
  "audit.export": "Export audit logs",
};

function permissionCategory(permission: Permission): string {
  const segment = permission.split(".")[0];
  return PERMISSION_CATEGORY_LABELS[segment] ?? segment;
}

export interface PermissionCategoryGroup {
  category: string;
  permissions: readonly { key: Permission; label: string }[];
}

export function getPermissionLabel(permission: Permission): string {
  return PERMISSION_LABELS[permission] ?? permission;
}

export function groupPermissionsByCategory(
  role: UserRole,
): PermissionCategoryGroup[] {
  const permissions = getPermissionsForRole(role);
  const grouped = new Map<string, { key: Permission; label: string }[]>();

  for (const permission of permissions) {
    const category = permissionCategory(permission);
    const existing = grouped.get(category) ?? [];
    existing.push({
      key: permission,
      label: getPermissionLabel(permission),
    });
    grouped.set(category, existing);
  }

  const categoryOrder = Object.values(PERMISSION_CATEGORY_LABELS);
  return Array.from(grouped.entries())
    .map(([category, items]) => ({
      category,
      permissions: items.sort((a, b) => a.label.localeCompare(b.label)),
    }))
    .sort((a, b) => {
      const indexA = categoryOrder.indexOf(a.category);
      const indexB = categoryOrder.indexOf(b.category);
      if (indexA === -1 && indexB === -1) {
        return a.category.localeCompare(b.category);
      }
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });
}

export function getAllPermissionCategories(): string[] {
  return Object.keys(PERMISSIONS).map(
    (key) => PERMISSION_CATEGORY_LABELS[key] ?? key,
  );
}

export function listAllPermissionsGrouped(): PermissionCategoryGroup[] {
  const grouped = new Map<string, { key: Permission; label: string }[]>();

  for (const permission of ALL_PERMISSIONS) {
    const category = permissionCategory(permission);
    const existing = grouped.get(category) ?? [];
    existing.push({
      key: permission,
      label: getPermissionLabel(permission),
    });
    grouped.set(category, existing);
  }

  const categoryOrder = Object.values(PERMISSION_CATEGORY_LABELS);
  return Array.from(grouped.entries())
    .map(([category, items]) => ({
      category,
      permissions: items.sort((a, b) => a.label.localeCompare(b.label)),
    }))
    .sort((a, b) => {
      const indexA = categoryOrder.indexOf(a.category);
      const indexB = categoryOrder.indexOf(b.category);
      if (indexA === -1 && indexB === -1) {
        return a.category.localeCompare(b.category);
      }
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });
}
