"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { BulkUserStatusAction } from "../types/user-management.types";
import { usersQueryKeys } from "../constants/users.query-keys";
import { userService } from "../services";

export function useBulkUserActions() {
  const queryClient = useQueryClient();

  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey: usersQueryKeys.all });
  };

  const bulkStatus = useMutation({
    mutationFn: ({
      ids,
      action,
    }: {
      ids: string[];
      action: BulkUserStatusAction;
    }) => userService.bulkUpdateStatus(ids, action),
    onSuccess: invalidate,
  });

  const bulkDelete = useMutation({
    mutationFn: (ids: string[]) => userService.bulkDelete(ids),
    onSuccess: invalidate,
  });

  return { bulkStatus, bulkDelete };
}
