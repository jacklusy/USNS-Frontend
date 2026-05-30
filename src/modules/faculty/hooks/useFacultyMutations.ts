"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { facultyQueryKeys } from "../constants/faculty.query-keys";
import { facultyService } from "../services";
import type {
  CreateFacultyInput,
  EntityStatusAction,
  UpdateFacultyInput,
} from "../types/faculty.types";

export function useCreateFaculty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateFacultyInput) => facultyService.create(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: facultyQueryKeys.all });
    },
  });
}

export function useUpdateFaculty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateFacultyInput }) =>
      facultyService.update(id, input),
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({ queryKey: facultyQueryKeys.all });
      await queryClient.invalidateQueries({
        queryKey: facultyQueryKeys.detail(variables.id),
      });
    },
  });
}

export function useDeleteFaculty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => facultyService.delete(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: facultyQueryKeys.all });
    },
  });
}

export function useChangeFacultyStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      action,
    }: {
      id: string;
      action: EntityStatusAction;
    }) => facultyService.changeStatus(id, action),
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({ queryKey: facultyQueryKeys.all });
      await queryClient.invalidateQueries({
        queryKey: facultyQueryKeys.detail(variables.id),
      });
    },
  });
}
