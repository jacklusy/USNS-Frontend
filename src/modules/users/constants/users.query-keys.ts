import type { UserActivityQueryParams } from "../types/user-audit.types";
import type { UserListQueryParams } from "../types/user-management.types";

export const usersQueryKeys = {
  all: ["users"] as const,
  list: (params: UserListQueryParams) =>
    [...usersQueryKeys.all, "list", params] as const,
  byId: (id: string) => [...usersQueryKeys.all, "byId", id] as const,
  detail: (id: string) => [...usersQueryKeys.all, "detail", id] as const,
  activity: (userId: string, params?: UserActivityQueryParams) =>
    [...usersQueryKeys.all, "activity", userId, params ?? {}] as const,
  roles: ["users", "roles"] as const,
  departments: ["users", "departments"] as const,
};
