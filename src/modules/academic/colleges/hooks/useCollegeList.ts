"use client";

import { useQuery } from "@tanstack/react-query";
import { academicQueryKeys } from "@/modules/academic/constants/academic.query-keys";
import { collegeService } from "@/modules/academic/services";
import type { CollegeListQueryParams } from "@/modules/academic/types/academic.types";

export function useCollegeList(params: CollegeListQueryParams) {
  return useQuery({
    queryKey: academicQueryKeys.colleges.list(params),
    queryFn: () => collegeService.list(params),
  });
}
