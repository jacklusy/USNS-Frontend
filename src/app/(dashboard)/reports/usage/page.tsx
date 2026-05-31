"use client";

import { Suspense } from "react";
import { REPORTS_ALLOWED_ROLES } from "@/modules/reports/constants/reports-management.constants";
import { UsageReportPageContent } from "@/modules/reports/components/UsageReportPageContent";
import { RoleRouteGuard } from "@/modules/auth/guards/RoleRouteGuard";
import { PERMISSIONS } from "@/types/permission.types";

function UsageReportFallback() {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6">
      <div className="h-24 animate-pulse rounded-lg bg-border" />
      <div className="h-[480px] animate-pulse rounded-lg bg-border" />
    </div>
  );
}

export default function UsageReportPage() {
  return (
    <RoleRouteGuard
      requiredPermission={PERMISSIONS.reports.view}
      allowedRoles={[...REPORTS_ALLOWED_ROLES]}
    >
      <Suspense fallback={<UsageReportFallback />}>
        <UsageReportPageContent />
      </Suspense>
    </RoleRouteGuard>
  );
}
