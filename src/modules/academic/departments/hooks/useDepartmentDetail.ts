"use client";

import { useQuery } from "@tanstack/react-query";
import { academicQueryKeys } from "@/modules/academic/constants/academic.query-keys";
import { departmentService } from "@/modules/academic/services";

export function useDepartmentDetail(id: string, enabled = true) {
  return useQuery({
    queryKey: academicQueryKeys.departments.detail(id),
    queryFn: () => departmentService.getDetail(id),
    enabled: enabled && Boolean(id),
  });
}
