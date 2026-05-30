"use client";

import { Suspense } from "react";
import { RoleRouteGuard } from "@/modules/auth/guards/RoleRouteGuard";
import { DepartmentsPageContent } from "@/modules/academic/departments/components/DepartmentsPageContent";
import { PERMISSIONS } from "@/types/permission.types";

export default function DepartmentsPage() {
  return (
    <RoleRouteGuard requiredPermission={PERMISSIONS.academic.departmentsManage}>
      <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-border" />}>
        <DepartmentsPageContent />
      </Suspense>
    </RoleRouteGuard>
  );
}
