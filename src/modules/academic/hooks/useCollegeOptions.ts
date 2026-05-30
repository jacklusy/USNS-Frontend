"use client";

import { useQuery } from "@tanstack/react-query";
import { academicQueryKeys } from "@/modules/academic/constants/academic.query-keys";
import { collegeService } from "@/modules/academic/services";

export function useCollegeOptions() {
  return useQuery({
    queryKey: [...academicQueryKeys.colleges.all, "options"] as const,
    queryFn: async () => {
      const response = await collegeService.list({ page: 1, per_page: 100 });
      return response.data.map((college) => ({
        value: college.id,
        label: college.name,
      }));
    },
    staleTime: 60_000,
  });
}
