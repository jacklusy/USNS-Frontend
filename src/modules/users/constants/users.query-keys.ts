import type { UserListQueryParams } from "../types/user-management.types";

export const usersQueryKeys = {
  all: ["users"] as const,
  list: (params: UserListQueryParams) =>
    [...usersQueryKeys.all, "list", params] as const,
  detail: (id: string) => [...usersQueryKeys.all, "detail", id] as const,
  roles: ["users", "roles"] as const,
  departments: ["users", "departments"] as const,
};
