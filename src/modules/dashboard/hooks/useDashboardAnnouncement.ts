"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services";

export function useDashboardAnnouncement() {
  return useQuery({
    queryKey: ["dashboard", "announcement"],
    queryFn: () => dashboardService.getAnnouncement(),
    staleTime: 1000 * 60 * 5,
  });
}
