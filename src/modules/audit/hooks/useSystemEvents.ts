"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { auditQueryKeys } from "../constants/audit.query-keys";
import { systemEventService } from "../services";
import type { SystemEventListQueryParams } from "../types/system-event.types";

export function useSystemEventList(params: SystemEventListQueryParams) {
  return useQuery({
    queryKey: auditQueryKeys.systemEvents.list(params),
    queryFn: () => systemEventService.list(params),
  });
}

export function useSystemEventDetail(id: string) {
  return useQuery({
    queryKey: auditQueryKeys.systemEvents.detail(id),
    queryFn: () => systemEventService.getById(id),
    enabled: Boolean(id),
  });
}

export function useExportSystemEvents() {
  return useMutation({
    mutationFn: (
      params: Omit<SystemEventListQueryParams, "page" | "per_page">,
    ) => systemEventService.exportCsv(params),
  });
}
