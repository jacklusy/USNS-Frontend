"use client";

import { useQuery } from "@tanstack/react-query";
import { usersQueryKeys } from "../constants/users.query-keys";
import { userService } from "../services";

export function useUser(userId: string | null, enabled = true) {
  return useQuery({
    queryKey: usersQueryKeys.detail(userId ?? ""),
    queryFn: () => userService.getById(userId ?? ""),
    enabled: enabled && Boolean(userId),
  });
}
