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

export const ROLE_PERMISSIONS: Record<UserRole, readonly Permission[]> = {
  president: ALL_PERMISSIONS,
  dean: [
    PERMISSIONS.dashboard.view,
    PERMISSIONS.users.view,
    PERMISSIONS.academic.collegesManage,
    PERMISSIONS.academic.departmentsManage,
    PERMISSIONS.academic.programsManage,
    PERMISSIONS.academic.coursesManage,
    PERMISSIONS.academic.calendarManage,
    PERMISSIONS.faculty.view,
    PERMISSIONS.faculty.manage,
    PERMISSIONS.staff.view,
    PERMISSIONS.reports.view,
  ],
  dba: [
    PERMISSIONS.dashboard.view,
    PERMISSIONS.settings.view,
    PERMISSIONS.settings.manage,
    PERMISSIONS.audit.view,
    PERMISSIONS.audit.export,
    PERMISSIONS.notifications.view,
  ],
  admin: [
    PERMISSIONS.dashboard.view,
    PERMISSIONS.users.view,
    PERMISSIONS.users.create,
    PERMISSIONS.users.edit,
    PERMISSIONS.roles.view,
    PERMISSIONS.reports.view,
    PERMISSIONS.settings.view,
    PERMISSIONS.settings.manage,
  ],
  faculty: [PERMISSIONS.dashboard.view],
  staff: [
    PERMISSIONS.dashboard.view,
    PERMISSIONS.staff.view,
    PERMISSIONS.notifications.view,
  ],
};

export function getPermissionsForRole(role: UserRole): readonly Permission[] {
  return ROLE_PERMISSIONS[role];
}
