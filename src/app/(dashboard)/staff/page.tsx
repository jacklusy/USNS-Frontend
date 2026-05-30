"use client";

import { Suspense } from "react";
import { RoleRouteGuard } from "@/modules/auth/guards/RoleRouteGuard";
import { StaffPageContent } from "@/modules/staff";
import { PERMISSIONS } from "@/types/permission.types";

function StaffPageFallback() {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6">
      <div className="h-24 animate-pulse rounded-lg bg-border" />
      <div className="h-[480px] animate-pulse rounded-lg bg-border" />
    </div>
  );
}

export default function StaffPage() {
  return (
    <RoleRouteGuard requiredPermission={PERMISSIONS.staff.view}>
      <Suspense fallback={<StaffPageFallback />}>
        <StaffPageContent />
      </Suspense>
    </RoleRouteGuard>
  );
}
