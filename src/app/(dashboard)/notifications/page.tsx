"use client";

import { Suspense } from "react";
import { RoleRouteGuard } from "@/modules/auth/guards/RoleRouteGuard";
import { NotificationsPageContent } from "@/modules/notifications/components/NotificationsPageContent";
import { PERMISSIONS } from "@/types/permission.types";

function NotificationsPageFallback() {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6">
      <div className="h-24 animate-pulse rounded-lg bg-border" />
      <div className="h-[480px] animate-pulse rounded-lg bg-border" />
    </div>
  );
}

export default function NotificationsPage() {
  return (
    <RoleRouteGuard requiredPermission={PERMISSIONS.notifications.view}>
      <Suspense fallback={<NotificationsPageFallback />}>
        <NotificationsPageContent />
      </Suspense>
    </RoleRouteGuard>
  );
}
