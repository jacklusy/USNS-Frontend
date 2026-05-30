"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { academicQueryKeys } from "@/modules/academic/constants/academic.query-keys";
import { departmentService } from "@/modules/academic/services";
import type {
  CreateDepartmentInput,
  EntityStatusAction,
  UpdateDepartmentInput,
} from "@/modules/academic/types/academic.types";

export function useCreateDepartment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateDepartmentInput) => departmentService.create(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: academicQueryKeys.departments.all,
      });
      await queryClient.invalidateQueries({
        queryKey: academicQueryKeys.colleges.all,
      });
    },
  });
}

export function useUpdateDepartment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateDepartmentInput }) =>
      departmentService.update(id, input),
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: academicQueryKeys.departments.all,
      });
      await queryClient.invalidateQueries({
        queryKey: academicQueryKeys.departments.detail(variables.id),
      });
    },
  });
}

export function useDeleteDepartment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => departmentService.delete(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: academicQueryKeys.departments.all,
      });
    },
  });
}

export function useChangeDepartmentStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      action,
    }: {
      id: string;
      action: EntityStatusAction;
    }) => departmentService.changeStatus(id, action),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: academicQueryKeys.departments.all,
      });
    },
  });
}
