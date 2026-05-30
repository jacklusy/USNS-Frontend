"use client";

import { useQuery } from "@tanstack/react-query";
import { usersQueryKeys } from "../constants/users.query-keys";
import { departmentsService } from "../services";

export function useDepartmentOptions() {
  return useQuery({
    queryKey: usersQueryKeys.departments,
    queryFn: () => departmentsService.list(),
    staleTime: 1000 * 60 * 10,
  });
}
