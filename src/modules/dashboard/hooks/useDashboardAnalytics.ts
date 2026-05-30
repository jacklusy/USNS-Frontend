"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services";

export function useDashboardAnalytics() {
  return useQuery({
    queryKey: ["dashboard", "analytics"],
    queryFn: () => dashboardService.getAnalytics(),
    staleTime: 1000 * 60 * 5,
  });
}
