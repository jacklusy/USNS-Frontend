"use client";

import { useQuery } from "@tanstack/react-query";
import { academicQueryKeys } from "@/modules/academic/constants/academic.query-keys";
import { collegeService } from "@/modules/academic/services";

export function useCollegeDetail(id: string, enabled = true) {
  return useQuery({
    queryKey: academicQueryKeys.colleges.detail(id),
    queryFn: () => collegeService.getDetail(id),
    enabled: enabled && Boolean(id),
  });
}
