"use client";

import { useQuery } from "@tanstack/react-query";
import { staffQueryKeys } from "../constants/staff.query-keys";
import { staffService } from "../services";
import type { StaffListQueryParams } from "../types/staff.types";

export function useStaffList(params: StaffListQueryParams) {
  return useQuery({
    queryKey: staffQueryKeys.list(params),
    queryFn: () => staffService.list(params),
  });
}

export function useStaffDetail(id: string) {
  return useQuery({
    queryKey: staffQueryKeys.detail(id),
    queryFn: () => staffService.getDetail(id),
    enabled: Boolean(id),
  });
}
