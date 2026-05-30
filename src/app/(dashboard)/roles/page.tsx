"use client";

import { Suspense } from "react";
import { RoleRouteGuard } from "@/modules/auth/guards/RoleRouteGuard";
import { RolesPageContent } from "@/modules/roles/components/RolesPageContent";
import { PERMISSIONS } from "@/types/permission.types";

function RolesPageFallback() {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6">
      <div className="h-24 animate-pulse rounded-lg bg-border" />
      <div className="h-[480px] animate-pulse rounded-lg bg-border" />
    </div>
  );
}

export default function RolesPage() {
  return (
    <RoleRouteGuard requiredPermission={PERMISSIONS.roles.view}>
      <Suspense fallback={<RolesPageFallback />}>
        <RolesPageContent />
      </Suspense>
    </RoleRouteGuard>
  );
}
