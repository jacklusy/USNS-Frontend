"use client";

import Link from "next/link";
import { use, useEffect, useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";
import { Badge } from "@/components/ui/Badge";
import { DASHBOARD_SECTION_COPY } from "@/constants/dashboard.constants";
import { ROUTES } from "@/constants/routes.constants";
import { useBreadcrumbOverrides } from "@/hooks/useBreadcrumbOverrides";
import { RoleRouteGuard } from "@/modules/auth/guards/RoleRouteGuard";
import { useDashboardAnnouncements } from "@/modules/dashboard/hooks/useDashboardAnnouncements";
import { PERMISSIONS } from "@/types/permission.types";
import { formatAnnouncementDate } from "@/utils/format-announcement-date";
import { markAnnouncementRead } from "@/utils/announcement-read";

interface AnnouncementDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function AnnouncementDetailPage({
  params,
}: AnnouncementDetailPageProps) {
  const { id } = use(params);
  const { data, isLoading, isError, refetch } = useDashboardAnnouncements();

  const announcement = useMemo(
    () => data?.data.find((item) => item.id === id) ?? null,
    [data?.data, id],
  );

  const breadcrumbLabels = useMemo(
    () => (announcement ? { [id]: announcement.title } : {}),
    [announcement, id],
  );
  useBreadcrumbOverrides(breadcrumbLabels);

  useEffect(() => {
    if (announcement) {
      markAnnouncementRead(announcement.id);
    }
  }, [announcement]);

  return (
    <RoleRouteGuard requiredPermission={PERMISSIONS.notifications.view}>
      <div className="mx-auto flex w-full max-w-[720px] flex-col gap-6">
        <Link
          href={ROUTES.ANNOUNCEMENTS}
          className="inline-flex min-h-11 w-fit items-center gap-2 text-[15px] font-medium text-brand transition-colors hover:text-usns-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          {DASHBOARD_SECTION_COPY.announcements.backToList}
        </Link>

        {isLoading ? (
          <div className="flex flex-col gap-3">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="mt-4 h-32 w-full" />
          </div>
        ) : null}

        {isError ? (
          <div className="rounded-lg border border-border bg-surface-elevated p-6" role="alert">
            <p className="text-[15px] text-danger">
              {DASHBOARD_SECTION_COPY.announcements.error}
            </p>
            <button
              type="button"
              onClick={() => {
                void refetch();
              }}
              className="mt-4 inline-flex h-11 items-center justify-center rounded-md bg-brand px-4 text-[15px] font-medium text-white hover:bg-usns-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Try again
            </button>
          </div>
        ) : null}

        {!isLoading && !isError && !announcement ? (
          <div className="rounded-lg border border-border bg-surface-elevated p-6">
            <h1 className="text-[24px] font-semibold text-foreground">
              Announcement not found
            </h1>
            <p className="mt-2 text-[15px] text-muted-fg">
              This announcement may have been removed or the link is invalid.
            </p>
          </div>
        ) : null}

        {!isLoading && !isError && announcement ? (
          <article>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-[36px] font-semibold leading-[1.1] tracking-[-0.015em] text-foreground md:text-[48px]">
                {announcement.title}
              </h1>
              {announcement.priority === "critical" ? (
                <Badge variant="danger">Critical</Badge>
              ) : null}
            </div>
            <p className="mt-2 text-[15px] text-muted-fg">
              {announcement.authorName} ·{" "}
              {formatAnnouncementDate(announcement.createdAt)}
            </p>
            <p className="mt-6 whitespace-pre-wrap text-[15px] leading-relaxed text-foreground">
              {announcement.body}
            </p>
          </article>
        ) : null}
      </div>
    </RoleRouteGuard>
  );
}
