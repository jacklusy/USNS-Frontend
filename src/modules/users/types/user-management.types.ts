import type { DataTableRowBase } from "@/types/data-table.types";
import type { UserRole, UserStatus } from "@/types/user.types";

export interface ManagedUser extends DataTableRowBase {
  fullName: string;
  email: string;
  role: UserRole;
  departmentId: string;
  departmentName: string;
  status: UserStatus;
  createdAt: Date;
  forcePasswordChange: boolean;
}

export interface UserListQueryParams {
  page: number;
  per_page: number;
  search?: string;
  roles?: UserRole[];
  status?: UserStatus;
}

export interface CreateUserInput {
  fullName: string;
  email: string;
  role: UserRole;
  departmentId: string;
  temporaryPassword: string;
  forcePasswordChange: boolean;
}

export interface UpdateUserInput {
  fullName: string;
  email: string;
  role: UserRole;
  departmentId: string;
  status?: UserStatus;
  forcePasswordChange?: boolean;
}

export interface RoleOption {
  value: UserRole;
  label: string;
}

export interface DepartmentOption {
  value: string;
  label: string;
}

export interface AssigneeOption {
  value: string;
  label: string;
}

export type UserStatusAction = "activate" | "deactivate" | "suspend";

export type BulkUserStatusAction = UserStatusAction;

export interface UserAccountStats {
  lastLoginAt: Date | null;
  loginCount: number;
  failedLoginAttempts: number;
}

export interface UserDetail extends ManagedUser {
  account: UserAccountStats;
}
