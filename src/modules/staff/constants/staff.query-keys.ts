import type { StaffListQueryParams } from "../types/staff.types";

const staffRoot = ["staff"] as const;

export const staffQueryKeys = {
  root: staffRoot,
  list: (params: StaffListQueryParams) =>
    [...staffRoot, "list", params] as const,
  detail: (id: string) => [...staffRoot, "detail", id] as const,
  all: [...staffRoot] as const,
};
