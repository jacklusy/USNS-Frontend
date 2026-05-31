"use client";

import { useQuery } from "@tanstack/react-query";
import { reportsQueryKeys } from "../constants/reports.query-keys";
import { usageReportService } from "../services";
import type { UsageReportParams } from "../types/usage-report.types";

export function useUsageReport(params: UsageReportParams) {
  return useQuery({
    queryKey: reportsQueryKeys.usage.report(params),
    queryFn: () => usageReportService.getReport(params),
  });
}
