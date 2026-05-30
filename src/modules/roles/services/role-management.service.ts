import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type {
  CreateRoleInput,
  ManagedRole,
  PermissionMatrixData,
  RoleListQueryParams,
  RoleOption,
  UpdateRoleInput,
} from "../types/role-management.types";

export interface IRoleManagementService {
  list(params: RoleListQueryParams): Promise<PaginatedResponse<ManagedRole>>;
  listOptions(): Promise<ApiResponse<RoleOption[]>>;
  getById(id: string): Promise<ApiResponse<ManagedRole>>;
  create(input: CreateRoleInput): Promise<ApiResponse<ManagedRole>>;
  update(id: string, input: UpdateRoleInput): Promise<ApiResponse<ManagedRole>>;
  delete(id: string): Promise<ApiResponse<null>>;
  getPermissionMatrix(): Promise<ApiResponse<PermissionMatrixData>>;
}
