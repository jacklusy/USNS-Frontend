import type { FilterValues } from "@/types/filter.types";
import type { UserRole, UserStatus } from "@/types/user.types";
import { UserStatus as UserStatusEnum } from "@/types/user.types";
import type { UserListQueryParams } from "../types/user-management.types";

function isUserRole(value: string): value is UserRole {
  return (
    value === "president" ||
    value === "dean" ||
    value === "dba" ||
    value === "admin" ||
    value === "faculty" ||
    value === "staff"
  );
}

function isUserStatus(value: string): value is UserStatus {
  return (
    value === UserStatusEnum.Active ||
    value === UserStatusEnum.Inactive ||
    value === UserStatusEnum.Suspended
  );
}

export function parseUsersFilterValues(
  values: FilterValues,
): Pick<UserListQueryParams, "roles" | "status"> {
  const rolesRaw = values.roles;
  const roles = Array.isArray(rolesRaw)
    ? rolesRaw.filter((item): item is UserRole => isUserRole(String(item)))
    : undefined;

  const statusRaw = values.status;
  const status =
    typeof statusRaw === "string" && isUserStatus(statusRaw)
      ? statusRaw
      : undefined;

  return {
    roles: roles && roles.length > 0 ? roles : undefined,
    status,
  };
}
