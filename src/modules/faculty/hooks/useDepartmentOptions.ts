"use client";

import { useQuery } from "@tanstack/react-query";
import { academicQueryKeys } from "@/modules/academic/constants/academic.query-keys";
import { departmentService } from "@/modules/academic/services";

export function useDepartmentOptions() {
  return useQuery({
    queryKey: academicQueryKeys.departments.options,
    queryFn: async () => {
      const response = await departmentService.listOptions();
      return response.data;
    },
    staleTime: 30_000,
  });
}
