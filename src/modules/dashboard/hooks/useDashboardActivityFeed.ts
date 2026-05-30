"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { env } from "@/config/env";
import { ACTIVITY_FEED_PER_PAGE } from "@/constants/dashboard.constants";
import { dashboardService } from "../services";

export function useDashboardActivityFeed() {
  return useInfiniteQuery({
    queryKey: ["dashboard", "activity"],
    queryFn: ({ pageParam }) =>
      dashboardService.getRecentActivity({
        page: pageParam,
        per_page: ACTIVITY_FEED_PER_PAGE,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, last_page } = lastPage.meta;
      if (page >= last_page) {
        return undefined;
      }
      return page + 1;
    },
    staleTime: 1000 * 60 * 5,
    refetchInterval: env.activityPollIntervalMs,
    refetchIntervalInBackground: false,
  });
}
