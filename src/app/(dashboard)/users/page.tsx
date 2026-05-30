"use client";

import { Suspense } from "react";
import { RoleRouteGuard } from "@/modules/auth/guards/RoleRouteGuard";
import { UsersPageContent } from "@/modules/users/components/UsersPageContent";
import { PERMISSIONS } from "@/types/permission.types";

function UsersPageFallback() {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6">
      <div className="h-24 animate-pulse rounded-lg bg-border" />
      <div className="h-[480px] animate-pulse rounded-lg bg-border" />
    </div>
  );
}

export default function UsersPage() {
  return (
    <RoleRouteGuard requiredPermission={PERMISSIONS.users.view}>
      <Suspense fallback={<UsersPageFallback />}>
        <UsersPageContent />
      </Suspense>
    </RoleRouteGuard>
  );
}
