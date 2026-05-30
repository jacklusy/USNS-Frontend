"use client";

import { Suspense } from "react";
import { RoleRouteGuard } from "@/modules/auth/guards/RoleRouteGuard";
import { CoursesPageContent } from "@/modules/academic/courses/components/CoursesPageContent";
import { PERMISSIONS } from "@/types/permission.types";

export default function CoursesPage() {
  return (
    <RoleRouteGuard requiredPermission={PERMISSIONS.academic.coursesManage}>
      <Suspense fallback={<div className="h-96 animate-pulse bg-border rounded-lg" />}>
        <CoursesPageContent />
      </Suspense>
    </RoleRouteGuard>
  );
}
