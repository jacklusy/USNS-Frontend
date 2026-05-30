"use client";

import { Suspense, use } from "react";
import { RoleRouteGuard } from "@/modules/auth/guards/RoleRouteGuard";
import { AcademicYearDetailPageContent } from "@/modules/academic/calendar/components/AcademicYearDetailPageContent";
import { PERMISSIONS } from "@/types/permission.types";

export default function AcademicYearDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <RoleRouteGuard requiredPermission={PERMISSIONS.academic.calendarManage}>
      <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-border" />}>
        <AcademicYearDetailPageContent yearId={id} />
      </Suspense>
    </RoleRouteGuard>
  );
}
