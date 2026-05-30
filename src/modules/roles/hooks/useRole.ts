"use client";

import { useQuery } from "@tanstack/react-query";
import { rolesQueryKeys } from "../constants/roles.query-keys";
import { roleManagementService } from "../services";

export function useRole(roleId: string | null, enabled = true) {
  return useQuery({
    queryKey: rolesQueryKeys.detail(roleId ?? ""),
    queryFn: () => roleManagementService.getById(roleId ?? ""),
    enabled: enabled && Boolean(roleId),
  });
}
