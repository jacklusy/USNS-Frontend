"use client";

import { useQuery } from "@tanstack/react-query";
import { academicQueryKeys } from "@/modules/academic/constants/academic.query-keys";
import { courseService } from "@/modules/academic/services";
import type { CourseListQueryParams } from "@/modules/academic/types/academic.types";

export function useCourseList(params: CourseListQueryParams) {
  return useQuery({
    queryKey: academicQueryKeys.courses.list(params),
    queryFn: () => courseService.list(params),
  });
}

export function useCourseDetail(id: string) {
  return useQuery({
    queryKey: academicQueryKeys.courses.detail(id),
    queryFn: () => courseService.getDetail(id),
    enabled: Boolean(id),
  });
}
