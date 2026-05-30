"use client";

import Link from "next/link";
import { AlertTriangle, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useIsClient } from "@/hooks/useIsClient";
import { DASHBOARD_SECTION_COPY } from "@/constants/dashboard.constants";
import { ROUTES } from "@/constants/routes.constants";
import { useDashboardBannerAnnouncement } from "../hooks/useDashboardBannerAnnouncement";
import {
  dismissAnnouncement,
  isAnnouncementDismissed,
} from "@/utils/announcement-dismiss";
import { isAnnouncementRead } from "@/utils/announcement-read";

export function AnnouncementBanner() {
  const { data, isLoading } = useDashboardBannerAnnouncement();
  const announcement = data?.data ?? null;
  const isClient = useIsClient();
  const [dismissed, setDismissed] = useState(false);

  const handleDismiss = useCallback(() => {
    if (!announcement) return;
    dismissAnnouncement(announcement.id);
    setDismissed(true);
  }, [announcement]);

  const visible =
    isClient &&
    !isLoading &&
    announcement !== null &&
    announcement.priority === "critical" &&
    !dismissed &&
    !isAnnouncementDismissed(announcement.id) &&
    !isAnnouncementRead(announcement.id);

  if (!visible || !announcement) {
    return null;
  }

  return (
    <div
      className="flex flex-col gap-3 rounded-lg border border-warn/30 bg-usns-accent-bg px-4 py-4 md:flex-row md:items-start md:gap-4 md:px-5"
      role="alert"
    >
      <AlertTriangle
        className="h-5 w-5 shrink-0 text-warn"
        strokeWidth={1.75}
        aria-hidden="true"
      />
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-medium text-foreground">
          {announcement.title}
        </p>
        <p className="mt-1 text-[13px] leading-relaxed text-muted-fg">
          {announcement.body}
        </p>
        <Link
          href={ROUTES.ANNOUNCEMENTS}
          className="mt-2 inline-flex text-[13px] font-medium text-brand underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          {DASHBOARD_SECTION_COPY.announcements.viewAllLabel}
        </Link>
      </div>
      <button
        type="button"
        onClick={handleDismiss}
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center self-start rounded-md text-muted-fg transition-colors hover:bg-surface hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        aria-label={DASHBOARD_SECTION_COPY.announcements.dismissLabel}
      >
        <X className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
      </button>
    </div>
  );
}
