"use client";

import { useMemo } from "react";
import { getPermissionsForRole } from "@/constants/role-permissions.constants";
import { useAuthStore } from "@/store/auth.slice";
import type { Permission } from "@/types/permission.types";
import type { UserRole } from "@/types/user.types";

export function usePermissions() {
  const role = useAuthStore((s) => s.role);

  const permissionSet = useMemo(() => {
    if (!role) return new Set<Permission>();
    return new Set(getPermissionsForRole(role));
  }, [role]);

  const can = (permission: Permission): boolean => permissionSet.has(permission);

  const hasRole = (checkRole: UserRole): boolean => role === checkRole;

  const hasAnyRole = (roles: readonly UserRole[]): boolean =>
    role !== null && roles.includes(role);

  return { can, hasRole, hasAnyRole, role };
}
