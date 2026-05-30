"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateUserInput } from "../types/user-management.types";
import { usersQueryKeys } from "../constants/users.query-keys";
import { userService } from "../services";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateUserInput) => userService.create(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: usersQueryKeys.all });
    },
  });
}
