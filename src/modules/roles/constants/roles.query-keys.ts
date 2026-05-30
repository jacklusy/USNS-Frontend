import type { RoleListQueryParams } from "../types/role-management.types";

const rolesRoot = ["roles"] as const;

export const rolesQueryKeys = {
  all: rolesRoot,
  list: (params: RoleListQueryParams) =>
    [...rolesRoot, "list", params] as const,
  detail: (id: string) => [...rolesRoot, "detail", id] as const,
  matrix: [...rolesRoot, "matrix"] as const,
  options: [...rolesRoot, "options"] as const,
};
