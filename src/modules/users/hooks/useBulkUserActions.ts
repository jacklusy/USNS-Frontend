"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersQueryKeys } from "../constants/users.query-keys";
import { userService } from "../services";

export function useBulkUserActions() {
  const queryClient = useQueryClient();

  const bulkDelete = useMutation({
    mutationFn: (ids: string[]) => userService.bulkDelete(ids),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: usersQueryKeys.all });
    },
  });

  return { bulkDelete };
}
