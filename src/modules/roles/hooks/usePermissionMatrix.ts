"use client";

import { useQuery } from "@tanstack/react-query";
import { rolesQueryKeys } from "../constants/roles.query-keys";
import { roleManagementService } from "../services";

export function usePermissionMatrix() {
  return useQuery({
    queryKey: rolesQueryKeys.matrix,
    queryFn: () => roleManagementService.getPermissionMatrix(),
  });
}
