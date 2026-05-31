"use client";

import { Suspense, use } from "react";
import { AUDIT_ALLOWED_ROLES } from "@/constants/audit-management.constants";
import { RoleRouteGuard } from "@/modules/auth/guards/RoleRouteGuard";
import { AuditLogDetailPageContent } from "@/modules/audit";
import { PERMISSIONS } from "@/types/permission.types";

interface Props {
  params: Promise<{ id: string }>;
}

export default function AuditLogDetailPage({ params }: Props) {
  const { id } = use(params);
  return (
    <RoleRouteGuard
      requiredPermission={PERMISSIONS.audit.view}
      allowedRoles={[...AUDIT_ALLOWED_ROLES]}
    >
      <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-border" />}>
        <AuditLogDetailPageContent logId={id} />
      </Suspense>
    </RoleRouteGuard>
  );
}
