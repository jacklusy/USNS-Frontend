"use client";

import { useQuery } from "@tanstack/react-query";
import type { UserActivityQueryParams } from "../types/user-audit.types";
import { usersQueryKeys } from "../constants/users.query-keys";
import { userService } from "../services";

export function useUserActivity(
  userId: string | null,
  params?: UserActivityQueryParams,
  enabled = true,
) {
  return useQuery({
    queryKey: usersQueryKeys.activity(userId ?? "", params),
    queryFn: () => userService.listActivity(userId ?? "", params),
    enabled: enabled && Boolean(userId),
  });
}
