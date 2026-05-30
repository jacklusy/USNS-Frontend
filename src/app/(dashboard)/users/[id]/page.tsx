"use client";

import { Suspense, use } from "react";
import { RoleRouteGuard } from "@/modules/auth/guards/RoleRouteGuard";
import { UserDetailPageContent } from "@/modules/users/components/UserDetailPageContent";
import { PERMISSIONS } from "@/types/permission.types";

function UserDetailFallback() {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6">
      <div className="h-8 w-40 animate-pulse rounded bg-border" />
      <div className="h-48 animate-pulse rounded-lg bg-border" />
      <div className="h-64 animate-pulse rounded-lg bg-border" />
    </div>
  );
}

interface UserDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function UserDetailPage({ params }: UserDetailPageProps) {
  const { id } = use(params);

  return (
    <RoleRouteGuard requiredPermission={PERMISSIONS.users.view}>
      <Suspense fallback={<UserDetailFallback />}>
        <UserDetailPageContent userId={id} />
      </Suspense>
    </RoleRouteGuard>
  );
}
