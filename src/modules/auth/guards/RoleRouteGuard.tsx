"use client";

import { useEffect, type ReactNode } from "react";
import { redirectToAuthError } from "@/lib/auth-error-router";
import { usePermissions } from "@/modules/auth/hooks/usePermissions";
import { AuthGuardShell } from "@/components/layouts/AuthGuardShell";
import type { Permission } from "@/types/permission.types";
import type { UserRole } from "@/types/user.types";

interface RoleRouteGuardProps {
  children: ReactNode;
  requiredPermission?: Permission;
  allowedRoles?: readonly UserRole[];
}

export function RoleRouteGuard({
  children,
  requiredPermission,
  allowedRoles,
}: RoleRouteGuardProps) {
  const { can, hasAnyRole } = usePermissions();
  const permissionOk = requiredPermission ? can(requiredPermission) : true;
  const roleOk = allowedRoles ? hasAnyRole(allowedRoles) : true;
  const isAllowed = permissionOk && roleOk;

  useEffect(() => {
    if (!isAllowed) {
      redirectToAuthError("forbidden");
    }
  }, [isAllowed]);

  if (!isAllowed) {
    return <AuthGuardShell />;
  }

  return <>{children}</>;
}
