"use client";

import { AlertTriangle, X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useDashboardAnnouncement } from "../hooks/useDashboardAnnouncement";
import {
  dismissAnnouncement,
  isAnnouncementDismissed,
} from "@/utils/announcement-dismiss";

export function AnnouncementBanner() {
  const { data, isLoading } = useDashboardAnnouncement();
  const announcement = data?.data ?? null;
  const initiallyVisible = useMemo(
    () =>
      announcement ? !isAnnouncementDismissed(announcement.id) : false,
    [announcement],
  );
  const [dismissed, setDismissed] = useState(false);
  const visible = initiallyVisible && !dismissed;

  const handleDismiss = useCallback(() => {
    if (!announcement) return;
    dismissAnnouncement(announcement.id);
    setDismissed(true);
  }, [announcement]);

  if (isLoading || !announcement || !visible) {
    return null;
  }

  return (
    <div
      className="flex gap-3 rounded-lg border border-warn/30 bg-usns-accent-bg px-4 py-4 md:px-5"
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
      </div>
      <button
        type="button"
        onClick={handleDismiss}
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-muted-fg transition-colors hover:bg-surface hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        aria-label="Dismiss announcement"
      >
        <X className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
      </button>
    </div>
  );
}
