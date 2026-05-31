"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { reportsQueryKeys } from "../constants/reports.query-keys";
import { enrollmentReportService } from "../services";
import type { EnrollmentReportFilters } from "../types/enrollment-report.types";

export function useEnrollmentFilterOptions() {
  return useQuery({
    queryKey: reportsQueryKeys.enrollment.filterOptions,
    queryFn: () => enrollmentReportService.getFilterOptions(),
  });
}

export function useEnrollmentReport(params: EnrollmentReportFilters) {
  return useQuery({
    queryKey: reportsQueryKeys.enrollment.report(params),
    queryFn: () => enrollmentReportService.getReport(params),
  });
}

export function useExportEnrollmentReport() {
  return useMutation({
    mutationFn: (params: EnrollmentReportFilters) =>
      enrollmentReportService.exportCsv(params),
  });
}
