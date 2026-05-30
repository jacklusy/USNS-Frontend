"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rolesQueryKeys } from "../constants/roles.query-keys";
import { roleManagementService } from "../services";
import type { CreateRoleInput } from "../types/role-management.types";

export function useCreateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateRoleInput) => roleManagementService.create(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: rolesQueryKeys.all });
    },
  });
}
