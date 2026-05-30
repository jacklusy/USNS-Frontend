"use client";

import { Suspense } from "react";
import { RoleRouteGuard } from "@/modules/auth/guards/RoleRouteGuard";
import { CollegesPageContent } from "@/modules/academic/colleges/components/CollegesPageContent";
import { PERMISSIONS } from "@/types/permission.types";

function CollegesPageFallback() {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6">
      <div className="h-24 animate-pulse rounded-lg bg-border" />
      <div className="h-[480px] animate-pulse rounded-lg bg-border" />
    </div>
  );
}

export default function CollegesPage() {
  return (
    <RoleRouteGuard requiredPermission={PERMISSIONS.academic.collegesManage}>
      <Suspense fallback={<CollegesPageFallback />}>
        <CollegesPageContent />
      </Suspense>
    </RoleRouteGuard>
  );
}
