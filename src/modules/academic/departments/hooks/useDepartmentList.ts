"use client";

import { useQuery } from "@tanstack/react-query";
import { academicQueryKeys } from "@/modules/academic/constants/academic.query-keys";
import { departmentService } from "@/modules/academic/services";
import type { DepartmentListQueryParams } from "@/modules/academic/types/academic.types";

export function useDepartmentList(params: DepartmentListQueryParams) {
  return useQuery({
    queryKey: academicQueryKeys.departments.list(params),
    queryFn: () => departmentService.list(params),
  });
}
