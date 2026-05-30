"use client";

import { Suspense, use } from "react";
import { RoleRouteGuard } from "@/modules/auth/guards/RoleRouteGuard";
import { CourseDetailPageContent } from "@/modules/academic/courses/components/CourseDetailPageContent";
import { PERMISSIONS } from "@/types/permission.types";

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <RoleRouteGuard requiredPermission={PERMISSIONS.academic.coursesManage}>
      <Suspense fallback={<div className="h-96 animate-pulse bg-border rounded-lg" />}>
        <CourseDetailPageContent courseId={id} />
      </Suspense>
    </RoleRouteGuard>
  );
}
