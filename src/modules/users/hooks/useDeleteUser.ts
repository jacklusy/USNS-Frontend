"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersQueryKeys } from "../constants/users.query-keys";
import { userService } from "../services";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userService.delete(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: usersQueryKeys.all });
    },
  });
}
