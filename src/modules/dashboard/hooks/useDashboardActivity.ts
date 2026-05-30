"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services";

export function useDashboardActivity() {
  return useQuery({
    queryKey: ["dashboard", "activity"],
    queryFn: () => dashboardService.getRecentActivity(),
    staleTime: 1000 * 60 * 5,
  });
}
