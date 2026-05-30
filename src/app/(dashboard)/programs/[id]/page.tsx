"use client";

import { Suspense, use } from "react";
import { RoleRouteGuard } from "@/modules/auth/guards/RoleRouteGuard";
import { ProgramDetailPageContent } from "@/modules/academic/programs/components/ProgramDetailPageContent";
import { PERMISSIONS } from "@/types/permission.types";

export default function ProgramDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <RoleRouteGuard requiredPermission={PERMISSIONS.academic.programsManage}>
      <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-border" />}>
        <ProgramDetailPageContent programId={id} />
      </Suspense>
    </RoleRouteGuard>
  );
}
