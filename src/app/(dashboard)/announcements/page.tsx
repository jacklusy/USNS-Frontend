"use client";

import { DASHBOARD_SECTION_COPY } from "@/constants/dashboard.constants";
import { AnnouncementsList } from "@/modules/dashboard/components/AnnouncementsList";
import { useDashboardAnnouncements } from "@/modules/dashboard/hooks/useDashboardAnnouncements";
import { RoleRouteGuard } from "@/modules/auth/guards/RoleRouteGuard";
import { PERMISSIONS } from "@/types/permission.types";

export default function AnnouncementsPage() {
  const { data, isLoading, isError, isFetching, refetch } =
    useDashboardAnnouncements();
  const announcements = data?.data ?? [];

  return (
    <RoleRouteGuard requiredPermission={PERMISSIONS.notifications.view}>
      <div className="mx-auto flex w-full max-w-[960px] flex-col gap-6">
        <header>
          <h1 className="text-[36px] font-semibold leading-[1.1] tracking-[-0.015em] text-foreground md:text-[48px]">
            {DASHBOARD_SECTION_COPY.announcements.title}
          </h1>
          <p className="mt-2 text-[15px] text-muted-fg">
            {DASHBOARD_SECTION_COPY.announcements.description}
          </p>
        </header>

        <AnnouncementsList
          isLoading={isLoading}
          isError={isError}
          announcements={announcements}
          onRetry={() => {
            void refetch();
          }}
          isRefreshing={isFetching}
        />
      </div>
    </RoleRouteGuard>
  );
}
