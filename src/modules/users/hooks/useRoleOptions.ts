"use client";

import { useQuery } from "@tanstack/react-query";
import { usersQueryKeys } from "../constants/users.query-keys";
import { rolesService } from "../services";

export function useRoleOptions() {
  return useQuery({
    queryKey: usersQueryKeys.roles,
    queryFn: () => rolesService.list(),
    staleTime: 1000 * 60 * 10,
  });
}
