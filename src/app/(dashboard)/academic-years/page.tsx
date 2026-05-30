"use client";

import { Suspense } from "react";
import { RoleRouteGuard } from "@/modules/auth/guards/RoleRouteGuard";
import { AcademicYearsPageContent } from "@/modules/academic/calendar/components/AcademicYearsPageContent";
import { PERMISSIONS } from "@/types/permission.types";

export default function AcademicYearsPage() {
  return (
    <RoleRouteGuard requiredPermission={PERMISSIONS.academic.calendarManage}>
      <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-border" />}>
        <AcademicYearsPageContent />
      </Suspense>
    </RoleRouteGuard>
  );
}
