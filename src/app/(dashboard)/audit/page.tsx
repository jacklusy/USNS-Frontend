"use client";

import { Suspense } from "react";
import { AUDIT_ALLOWED_ROLES } from "@/constants/audit-management.constants";
import { RoleRouteGuard } from "@/modules/auth/guards/RoleRouteGuard";
import { AuditPageContent } from "@/modules/audit";
import { PERMISSIONS } from "@/types/permission.types";

function AuditPageFallback() {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6">
      <div className="h-24 animate-pulse rounded-lg bg-border" />
      <div className="h-[480px] animate-pulse rounded-lg bg-border" />
    </div>
  );
}

export default function AuditPage() {
  return (
    <RoleRouteGuard
      requiredPermission={PERMISSIONS.audit.view}
      allowedRoles={[...AUDIT_ALLOWED_ROLES]}
    >
      <Suspense fallback={<AuditPageFallback />}>
        <AuditPageContent />
      </Suspense>
    </RoleRouteGuard>
  );
}
