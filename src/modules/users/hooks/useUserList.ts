"use client";

import { useQuery } from "@tanstack/react-query";
import type { UserListQueryParams } from "../types/user-management.types";
import { usersQueryKeys } from "../constants/users.query-keys";
import { userService } from "../services";

export function useUserList(params: UserListQueryParams) {
  return useQuery({
    queryKey: usersQueryKeys.list(params),
    queryFn: () => userService.list(params),
  });
}
