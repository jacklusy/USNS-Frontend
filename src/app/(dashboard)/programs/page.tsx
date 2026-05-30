"use client";

import { Suspense } from "react";
import { RoleRouteGuard } from "@/modules/auth/guards/RoleRouteGuard";
import { ProgramsPageContent } from "@/modules/academic/programs/components/ProgramsPageContent";
import { PERMISSIONS } from "@/types/permission.types";

export default function ProgramsPage() {
  return (
    <RoleRouteGuard requiredPermission={PERMISSIONS.academic.programsManage}>
      <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-border" />}>
        <ProgramsPageContent />
      </Suspense>
    </RoleRouteGuard>
  );
}
