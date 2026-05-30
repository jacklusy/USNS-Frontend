"use client";

import Link from "next/link";
import { useIsClient } from "@/hooks/useIsClient";
import { Bell } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";
import { Badge } from "@/components/ui/Badge";
import { DASHBOARD_SECTION_COPY } from "@/constants/dashboard.constants";
import { ROUTES } from "@/constants/routes.constants";
import type { DashboardAnnouncement } from "../types/dashboard.types";
import { formatAnnouncementDate } from "@/utils/format-announcement-date";
import { isAnnouncementRead } from "@/utils/announcement-read";

function AnnouncementRow({
  announcement,
  isRead,
}: {
  announcement: DashboardAnnouncement;
  isRead: boolean;
}) {
  const href = `${ROUTES.ANNOUNCEMENTS}/${announcement.id}`;
  const excerpt =
    announcement.body.length > 120
      ? `${announcement.body.slice(0, 120)}…`
      : announcement.body;

  return (
    <li>
      <Link
        href={href}
        className={`block rounded-lg border p-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
          isRead
            ? "border-border bg-surface-elevated hover:bg-usns-green-light/40"
            : "border-brand/30 border-l-4 border-l-brand bg-usns-green-light/40 hover:bg-usns-green-light/60"
        }`}
      >
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-[18px] font-semibold text-foreground">
            {announcement.title}
          </h2>
          {!isRead ? (
            <Badge variant="brand">{DASHBOARD_SECTION_COPY.announcements.unreadLabel}</Badge>
          ) : null}
          {announcement.priority === "critical" ? (
            <Badge variant="danger">Critical</Badge>
          ) : null}
        </div>
        <p className="mt-1 text-[13px] text-muted-fg">
          {announcement.authorName} · {formatAnnouncementDate(announcement.createdAt)}
        </p>
        <p className="mt-2 text-[15px] leading-relaxed text-muted-fg">{excerpt}</p>
      </Link>
    </li>
  );
}

function AnnouncementsListSkeleton() {
  return (
    <ul className="flex flex-col gap-3" aria-hidden="true">
      {Array.from({ length: 4 }).map((_, index) => (
        <li key={index} className="rounded-lg border border-border p-4">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="mt-2 h-4 w-1/3" />
          <Skeleton className="mt-3 h-4 w-full" />
        </li>
      ))}
    </ul>
  );
}

interface AnnouncementsListContainerProps {
  isLoading: boolean;
  isError: boolean;
  announcements: DashboardAnnouncement[];
  onRetry: () => void;
  isRefreshing: boolean;
}

export function AnnouncementsList({
  isLoading,
  isError,
  announcements,
  onRetry,
  isRefreshing,
}: AnnouncementsListContainerProps) {
  const isClient = useIsClient();

  if (isLoading) {
    return <AnnouncementsListSkeleton />;
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-border bg-surface-elevated p-6" role="alert">
        <p className="text-[15px] text-danger">
          {DASHBOARD_SECTION_COPY.announcements.error}
        </p>
        <button
          type="button"
          onClick={onRetry}
          disabled={isRefreshing}
          className="mt-4 inline-flex h-11 items-center justify-center rounded-md bg-brand px-4 text-[15px] font-medium text-white hover:bg-usns-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-50"
        >
          Try again
        </button>
      </div>
    );
  }

  if (announcements.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-surface-elevated px-6 py-12 text-center">
        <Bell className="h-12 w-12 text-muted-fg" strokeWidth={1.75} aria-hidden="true" />
        <h3 className="mt-4 text-[18px] font-semibold text-foreground">
          No announcements
        </h3>
        <p className="mt-2 text-[13px] text-muted-fg">
          {DASHBOARD_SECTION_COPY.announcements.empty}
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {announcements.map((announcement) => (
        <AnnouncementRow
          key={announcement.id}
          announcement={announcement}
          isRead={isClient && isAnnouncementRead(announcement.id)}
        />
      ))}
    </ul>
  );
}
