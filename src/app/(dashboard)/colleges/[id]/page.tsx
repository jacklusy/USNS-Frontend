"use client";

import { Suspense, use } from "react";
import { RoleRouteGuard } from "@/modules/auth/guards/RoleRouteGuard";
import { CollegeDetailPageContent } from "@/modules/academic/colleges/components/CollegeDetailPageContent";
import { PERMISSIONS } from "@/types/permission.types";

function CollegeDetailFallback() {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6">
      <div className="h-8 w-40 animate-pulse rounded bg-border" />
      <div className="h-48 animate-pulse rounded-lg bg-border" />
    </div>
  );
}

interface CollegeDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function CollegeDetailPage({ params }: CollegeDetailPageProps) {
  const { id } = use(params);

  return (
    <RoleRouteGuard requiredPermission={PERMISSIONS.academic.collegesManage}>
      <Suspense fallback={<CollegeDetailFallback />}>
        <CollegeDetailPageContent collegeId={id} />
      </Suspense>
    </RoleRouteGuard>
  );
}
