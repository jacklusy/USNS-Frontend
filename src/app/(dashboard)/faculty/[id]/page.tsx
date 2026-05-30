"use client";

import { Suspense, use } from "react";
import { RoleRouteGuard } from "@/modules/auth/guards/RoleRouteGuard";
import { FacultyDetailPageContent } from "@/modules/faculty";
import { PERMISSIONS } from "@/types/permission.types";

interface Props {
  params: Promise<{ id: string }>;
}

export default function FacultyDetailPage({ params }: Props) {
  const { id } = use(params);
  return (
    <RoleRouteGuard requiredPermission={PERMISSIONS.faculty.view}>
      <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-border" />}>
        <FacultyDetailPageContent facultyId={id} />
      </Suspense>
    </RoleRouteGuard>
  );
}
