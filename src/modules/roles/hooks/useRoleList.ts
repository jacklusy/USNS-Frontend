"use client";

import { useQuery } from "@tanstack/react-query";
import { rolesQueryKeys } from "../constants/roles.query-keys";
import { roleManagementService } from "../services";
import type { RoleListQueryParams } from "../types/role-management.types";

export function useRoleList(params: RoleListQueryParams) {
  return useQuery({
    queryKey: rolesQueryKeys.list(params),
    queryFn: () => roleManagementService.list(params),
  });
}
