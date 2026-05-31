"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { reportsQueryKeys } from "../constants/reports.query-keys";
import { reportsService } from "../services";

export function useStartReportGeneration() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reportId: string) => reportsService.startGeneration(reportId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: reportsQueryKeys.catalog });
    },
  });
}

export function useReportJobStatus(jobId: string | null, enabled: boolean) {
  return useQuery({
    queryKey: reportsQueryKeys.job(jobId ?? ""),
    queryFn: () => reportsService.getJobStatus(jobId ?? ""),
    enabled: enabled && Boolean(jobId),
    refetchInterval: (query) => {
      const status = query.state.data?.data.status;
      if (status === "completed" || status === "failed") return false;
      return 400;
    },
  });
}

export function useDownloadGeneratedReport() {
  return useMutation({
    mutationFn: (id: string) => reportsService.downloadGenerated(id),
  });
}
