"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { auditQueryKeys } from "../constants/audit.query-keys";
import { loginHistoryService } from "../services";
import type { LoginHistoryListQueryParams } from "../types/login-history.types";

export function useLoginHistoryList(params: LoginHistoryListQueryParams) {
  return useQuery({
    queryKey: auditQueryKeys.loginHistory.list(params),
    queryFn: () => loginHistoryService.list(params),
  });
}

export function useExportLoginHistory() {
  return useMutation({
    mutationFn: (
      params: Omit<LoginHistoryListQueryParams, "page" | "per_page">,
    ) => loginHistoryService.exportCsv(params),
  });
}
