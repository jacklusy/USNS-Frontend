"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services";

export function useDashboardAnnouncements() {
  return useQuery({
    queryKey: ["dashboard", "announcements"],
    queryFn: () => dashboardService.getAnnouncements(),
    staleTime: 1000 * 60 * 5,
  });
}
