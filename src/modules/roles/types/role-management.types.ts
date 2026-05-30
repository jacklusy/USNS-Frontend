import type { DataTableRowBase } from "@/types/data-table.types";
import type { Permission } from "@/types/permission.types";

export interface ManagedRole extends DataTableRowBase {
  slug: string;
  name: string;
  description: string;
  isSystem: boolean;
  permissions: Permission[];
  userCount: number;
  createdAt: string;
}

export interface RoleListQueryParams {
  page: number;
  per_page: number;
  search?: string;
}

export interface CreateRoleInput {
  name: string;
  description: string;
  permissions: Permission[];
}

export interface UpdateRoleInput {
  name: string;
  description: string;
  permissions: Permission[];
}

export interface RoleOption {
  value: string;
  label: string;
}

export interface PermissionMatrixData {
  roles: ManagedRole[];
  permissionGroups: readonly {
    category: string;
    permissions: readonly { key: Permission; label: string }[];
  }[];
}
