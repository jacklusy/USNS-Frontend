"use client";

import { Suspense } from "react";
import { REPORTS_ALLOWED_ROLES } from "@/modules/reports/constants/reports-management.constants";
import { EnrollmentReportPageContent } from "@/modules/reports/components/EnrollmentReportPageContent";
import { RoleRouteGuard } from "@/modules/auth/guards/RoleRouteGuard";
import { PERMISSIONS } from "@/types/permission.types";

function EnrollmentReportFallback() {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6">
      <div className="h-24 animate-pulse rounded-lg bg-border" />
      <div className="h-[480px] animate-pulse rounded-lg bg-border" />
    </div>
  );
}

export default function EnrollmentReportPage() {
  return (
    <RoleRouteGuard
      requiredPermission={PERMISSIONS.reports.view}
      allowedRoles={[...REPORTS_ALLOWED_ROLES]}
    >
      <Suspense fallback={<EnrollmentReportFallback />}>
        <EnrollmentReportPageContent />
      </Suspense>
    </RoleRouteGuard>
  );
}
