"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { academicQueryKeys } from "@/modules/academic/constants/academic.query-keys";
import { collegeService } from "@/modules/academic/services";
import type {
  CreateCollegeInput,
  EntityStatusAction,
  UpdateCollegeInput,
} from "@/modules/academic/types/academic.types";

export function useCreateCollege() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateCollegeInput) => collegeService.create(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: academicQueryKeys.colleges.all,
      });
    },
  });
}

export function useUpdateCollege() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateCollegeInput }) =>
      collegeService.update(id, input),
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: academicQueryKeys.colleges.all,
      });
      await queryClient.invalidateQueries({
        queryKey: academicQueryKeys.colleges.detail(variables.id),
      });
    },
  });
}

export function useDeleteCollege() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => collegeService.delete(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: academicQueryKeys.colleges.all,
      });
    },
  });
}

export function useChangeCollegeStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      action,
      cascadeDepartments,
    }: {
      id: string;
      action: EntityStatusAction;
      cascadeDepartments?: boolean;
    }) => collegeService.changeStatus(id, action, cascadeDepartments),
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: academicQueryKeys.colleges.all,
      });
      await queryClient.invalidateQueries({
        queryKey: academicQueryKeys.colleges.detail(variables.id),
      });
      await queryClient.invalidateQueries({
        queryKey: academicQueryKeys.departments.all,
      });
    },
  });
}
