"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rolesQueryKeys } from "../constants/roles.query-keys";
import { roleManagementService } from "../services";
import type { UpdateRoleInput } from "../types/role-management.types";

export function useUpdateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateRoleInput }) =>
      roleManagementService.update(id, input),
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({ queryKey: rolesQueryKeys.all });
      await queryClient.invalidateQueries({
        queryKey: rolesQueryKeys.detail(variables.id),
      });
    },
  });
}
