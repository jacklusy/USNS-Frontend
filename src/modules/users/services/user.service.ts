import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type { UserActivityQueryParams } from "../types/user-audit.types";
import type { UserAuditEntry } from "../types/user-audit.types";
import type {
  BulkUserStatusAction,
  CreateUserInput,
  ManagedUser,
  UpdateUserInput,
  UserDetail,
  UserListQueryParams,
  UserStatusAction,
} from "../types/user-management.types";

export interface IUserService {
  list(params: UserListQueryParams): Promise<PaginatedResponse<ManagedUser>>;
  getById(id: string): Promise<ApiResponse<ManagedUser>>;
  getDetail(id: string): Promise<ApiResponse<UserDetail>>;
  create(input: CreateUserInput): Promise<ApiResponse<ManagedUser>>;
  update(id: string, input: UpdateUserInput): Promise<ApiResponse<ManagedUser>>;
  delete(id: string): Promise<ApiResponse<null>>;
  changeStatus(
    id: string,
    action: UserStatusAction,
  ): Promise<ApiResponse<ManagedUser>>;
  listActivity(
    userId: string,
    params?: UserActivityQueryParams,
  ): Promise<PaginatedResponse<UserAuditEntry>>;
  bulkUpdateStatus(
    ids: string[],
    action: BulkUserStatusAction,
  ): Promise<ApiResponse<ManagedUser[]>>;
  bulkDelete(ids: string[]): Promise<ApiResponse<null>>;
}
