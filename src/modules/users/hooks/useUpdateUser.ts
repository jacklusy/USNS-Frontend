"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateUserInput } from "../types/user-management.types";
import { usersQueryKeys } from "../constants/users.query-keys";
import { userService } from "../services";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateUserInput }) =>
      userService.update(id, input),
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({ queryKey: usersQueryKeys.all });
      await queryClient.invalidateQueries({
        queryKey: usersQueryKeys.byId(variables.id),
      });
      await queryClient.invalidateQueries({
        queryKey: usersQueryKeys.detail(variables.id),
      });
    },
  });
}
