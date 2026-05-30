"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services";

export function useDashboardKpis() {
  return useQuery({
    queryKey: ["dashboard", "kpis"],
    queryFn: () => dashboardService.getKpis(),
    staleTime: 1000 * 60 * 5,
  });
}
