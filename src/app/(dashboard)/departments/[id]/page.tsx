"use client";

import { Suspense, use } from "react";
import { RoleRouteGuard } from "@/modules/auth/guards/RoleRouteGuard";
import { DepartmentDetailPageContent } from "@/modules/academic/departments/components/DepartmentDetailPageContent";
import { PERMISSIONS } from "@/types/permission.types";

interface Props {
  params: Promise<{ id: string }>;
}

export default function DepartmentDetailPage({ params }: Props) {
  const { id } = use(params);
  return (
    <RoleRouteGuard requiredPermission={PERMISSIONS.academic.departmentsManage}>
      <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-border" />}>
        <DepartmentDetailPageContent departmentId={id} />
      </Suspense>
    </RoleRouteGuard>
  );
}
