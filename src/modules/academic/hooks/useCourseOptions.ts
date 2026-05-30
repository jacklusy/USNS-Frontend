"use client";

import { useQuery } from "@tanstack/react-query";
import { academicQueryKeys } from "@/modules/academic/constants/academic.query-keys";
import { courseService } from "@/modules/academic/services";

export function useCourseOptions(excludeId?: string) {
  return useQuery({
    queryKey: [...academicQueryKeys.courses.options, excludeId ?? "all"] as const,
    queryFn: async () => {
      const response = await courseService.listOptions(excludeId);
      return response.data;
    },
    staleTime: 30_000,
  });
}
