"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services";

export function useDashboardBannerAnnouncement() {
  return useQuery({
    queryKey: ["dashboard", "announcement", "banner"],
    queryFn: () => dashboardService.getBannerAnnouncement(),
    staleTime: 1000 * 60 * 5,
  });
}
