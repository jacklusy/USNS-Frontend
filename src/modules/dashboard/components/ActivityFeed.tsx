"use client";

import { Activity } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";
import { DASHBOARD_SECTION_COPY } from "@/constants/dashboard.constants";
import { useDashboardActivity } from "../hooks/useDashboardActivity";
import { DashboardSection } from "./DashboardSection";
import { formatActivityDescription } from "@/utils/format-activity-description";
import { formatRelativeTime } from "@/utils/format-relative-time";
import { getUserInitials } from "@/utils/user-initials";

function ActivityFeedSkeleton() {
  return (
    <ul className="flex flex-col gap-3" aria-hidden="true">
      {Array.from({ length: 4 }).map((_, index) => (
        <li
          key={index}
          className="flex gap-3 rounded-lg border border-border bg-surface-elevated p-4"
        >
          <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-4 w-full max-w-md" />
            <Skeleton className="mt-2 h-3 w-24" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function ActivityFeed() {
  const { data, isLoading, isError, isFetching, refetch } = useDashboardActivity();
  const items = data?.data ?? [];

  return (
    <DashboardSection
      title={DASHBOARD_SECTION_COPY.activity.title}
      description={DASHBOARD_SECTION_COPY.activity.description}
      isLoading={isLoading}
      isError={isError}
      errorMessage={DASHBOARD_SECTION_COPY.activity.error}
      onRefresh={() => {
        void refetch();
      }}
      isRefreshing={isFetching}
      loadingFallback={<ActivityFeedSkeleton />}
    >
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-surface-elevated px-6 py-12 text-center">
          <Activity
            className="h-12 w-12 text-muted-fg"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <h3 className="mt-4 text-[18px] font-semibold text-foreground">
            No activity yet
          </h3>
          <p className="mt-2 max-w-sm text-[13px] text-muted-fg">
            {DASHBOARD_SECTION_COPY.activity.empty}
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex gap-3 rounded-lg border border-border bg-surface-elevated p-4"
            >
              <span
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-[13px] font-medium text-white"
                aria-hidden="true"
              >
                {getUserInitials(item.actorName)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[15px] text-foreground">
                  {formatActivityDescription(item)}
                </p>
                <time
                  className="mt-1 block text-[13px] text-muted-fg"
                  dateTime={item.createdAt}
                >
                  {formatRelativeTime(item.createdAt)}
                </time>
              </div>
            </li>
          ))}
        </ul>
      )}
    </DashboardSection>
  );
}
