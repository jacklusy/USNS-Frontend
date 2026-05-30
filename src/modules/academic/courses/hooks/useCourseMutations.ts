"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { academicQueryKeys } from "@/modules/academic/constants/academic.query-keys";
import { courseService } from "@/modules/academic/services";
import type { CreateCourseInput, UpdateCourseInput } from "@/modules/academic/types/academic.types";

export function useCreateCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateCourseInput) => courseService.create(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: academicQueryKeys.courses.all });
    },
  });
}

export function useUpdateCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateCourseInput }) =>
      courseService.update(id, input),
    onSuccess: async (_d, v) => {
      await queryClient.invalidateQueries({ queryKey: academicQueryKeys.courses.all });
      await queryClient.invalidateQueries({
        queryKey: academicQueryKeys.courses.detail(v.id),
      });
    },
  });
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => courseService.delete(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: academicQueryKeys.courses.all });
    },
  });
}
