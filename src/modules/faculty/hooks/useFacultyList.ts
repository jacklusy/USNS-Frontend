"use client";

import { useQuery } from "@tanstack/react-query";
import { facultyQueryKeys } from "../constants/faculty.query-keys";
import { facultyService } from "../services";
import type { FacultyListQueryParams } from "../types/faculty.types";

export function useFacultyList(params: FacultyListQueryParams) {
  return useQuery({
    queryKey: facultyQueryKeys.list(params),
    queryFn: () => facultyService.list(params),
  });
}

export function useFacultyDetail(id: string) {
  return useQuery({
    queryKey: facultyQueryKeys.detail(id),
    queryFn: () => facultyService.getDetail(id),
    enabled: Boolean(id),
  });
}
