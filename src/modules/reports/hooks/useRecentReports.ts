"use client";

import { useQuery } from "@tanstack/react-query";
import { reportsQueryKeys } from "../constants/reports.query-keys";
import { reportsService } from "../services";

export function useRecentReports() {
  return useQuery({
    queryKey: reportsQueryKeys.recent,
    queryFn: () => reportsService.getRecent(),
  });
}
