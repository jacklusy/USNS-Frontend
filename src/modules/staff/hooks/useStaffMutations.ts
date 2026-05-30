"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { academicQueryKeys } from "@/modules/academic/constants/academic.query-keys";
import { staffQueryKeys } from "../constants/staff.query-keys";
import { staffService } from "../services";
import type {
  CreateStaffInput,
  EntityStatusAction,
  UpdateStaffInput,
} from "../types/staff.types";

export function useCreateStaff() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateStaffInput) => staffService.create(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: staffQueryKeys.all });
      await queryClient.invalidateQueries({
        queryKey: academicQueryKeys.departments.all,
      });
    },
  });
}

export function useUpdateStaff() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateStaffInput }) =>
      staffService.update(id, input),
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({ queryKey: staffQueryKeys.all });
      await queryClient.invalidateQueries({
        queryKey: staffQueryKeys.detail(variables.id),
      });
      await queryClient.invalidateQueries({
        queryKey: academicQueryKeys.departments.all,
      });
    },
  });
}

export function useDeleteStaff() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => staffService.delete(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: staffQueryKeys.all });
      await queryClient.invalidateQueries({
        queryKey: academicQueryKeys.departments.all,
      });
    },
  });
}

export function useChangeStaffStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      action,
    }: {
      id: string;
      action: EntityStatusAction;
    }) => staffService.changeStatus(id, action),
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({ queryKey: staffQueryKeys.all });
      await queryClient.invalidateQueries({
        queryKey: staffQueryKeys.detail(variables.id),
      });
      await queryClient.invalidateQueries({
        queryKey: academicQueryKeys.departments.all,
      });
    },
  });
}
