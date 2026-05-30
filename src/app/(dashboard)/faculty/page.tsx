"use client";

import { Suspense } from "react";
import { RoleRouteGuard } from "@/modules/auth/guards/RoleRouteGuard";
import { FacultyPageContent } from "@/modules/faculty";
import { PERMISSIONS } from "@/types/permission.types";

function FacultyPageFallback() {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6">
      <div className="h-24 animate-pulse rounded-lg bg-border" />
      <div className="h-[480px] animate-pulse rounded-lg bg-border" />
    </div>
  );
}

export default function FacultyPage() {
  return (
    <RoleRouteGuard requiredPermission={PERMISSIONS.faculty.view}>
      <Suspense fallback={<FacultyPageFallback />}>
        <FacultyPageContent />
      </Suspense>
    </RoleRouteGuard>
  );
}
