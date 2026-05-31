"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { auditQueryKeys } from "../constants/audit.query-keys";
import { auditLogService } from "../services";
import type { AuditLogListQueryParams } from "../types/audit-log.types";

export function useAuditLogList(params: AuditLogListQueryParams) {
  return useQuery({
    queryKey: auditQueryKeys.logs.list(params),
    queryFn: () => auditLogService.list(params),
  });
}

export function useAuditLogDetail(id: string) {
  return useQuery({
    queryKey: auditQueryKeys.logs.detail(id),
    queryFn: () => auditLogService.getById(id),
    enabled: Boolean(id),
  });
}

export function useExportAuditLogs() {
  return useMutation({
    mutationFn: (
      params: Omit<AuditLogListQueryParams, "page" | "per_page">,
    ) => auditLogService.exportCsv(params),
  });
}
