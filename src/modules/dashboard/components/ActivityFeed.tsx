"use client";

import { useMemo } from "react";
import { Activity } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";
import { DASHBOARD_SECTION_COPY } from "@/constants/dashboard.constants";
import { useDashboardActivityFeed } from "../hooks/useDashboardActivityFeed";
import { DashboardSection } from "./DashboardSection";
import { ActivityFeedItem } from "./ActivityFeedItem";

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
  const {
    data,
    isLoading,
    isError,
    isFetching,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useDashboardActivityFeed();

  const items = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data?.pages],
  );

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
      isRefreshing={isFetching && !isFetchingNextPage}
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
        <>
          <ul className="flex flex-col gap-3" aria-live="polite">
            {items.map((item) => (
              <ActivityFeedItem key={item.id} item={item} />
            ))}
          </ul>
          {hasNextPage ? (
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  void fetchNextPage();
                }}
                disabled={isFetchingNextPage}
                className="inline-flex h-11 min-w-[140px] items-center justify-center rounded-md border border-brand bg-surface px-5 text-[15px] font-medium text-brand transition-colors hover:bg-usns-green-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isFetchingNextPage ? "Loading…" : "Load more"}
              </button>
            </div>
          ) : null}
        </>
      )}
    </DashboardSection>
  );
}
