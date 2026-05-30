"use client";

import { useQuery } from "@tanstack/react-query";
import { rolesQueryKeys } from "@/modules/roles/constants/roles.query-keys";
import { rolesService } from "../services";

export function useRoleOptions() {
  return useQuery({
    queryKey: rolesQueryKeys.options,
    queryFn: () => rolesService.list(),
    staleTime: 1000 * 60 * 10,
  });
}
