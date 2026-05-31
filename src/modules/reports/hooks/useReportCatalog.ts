"use client";

import { useQuery } from "@tanstack/react-query";
import { reportsQueryKeys } from "../constants/reports.query-keys";
import { reportsService } from "../services";

export function useReportCatalog() {
  return useQuery({
    queryKey: reportsQueryKeys.catalog,
    queryFn: () => reportsService.getCatalog(),
  });
}
