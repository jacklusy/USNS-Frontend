"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services";

export function useDashboardQuickActions() {
  return useQuery({
    queryKey: ["dashboard", "quick-actions"],
    queryFn: () => dashboardService.getQuickActions(),
    staleTime: 1000 * 60 * 5,
  });
}
