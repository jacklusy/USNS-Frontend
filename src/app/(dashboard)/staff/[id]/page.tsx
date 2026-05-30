"use client";

import { Suspense, use } from "react";
import { RoleRouteGuard } from "@/modules/auth/guards/RoleRouteGuard";
import { StaffDetailPageContent } from "@/modules/staff";
import { PERMISSIONS } from "@/types/permission.types";

interface Props {
  params: Promise<{ id: string }>;
}

export default function StaffDetailPage({ params }: Props) {
  const { id } = use(params);
  return (
    <RoleRouteGuard requiredPermission={PERMISSIONS.staff.view}>
      <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-border" />}>
        <StaffDetailPageContent staffId={id} />
      </Suspense>
    </RoleRouteGuard>
  );
}
