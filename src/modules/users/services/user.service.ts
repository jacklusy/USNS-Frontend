import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type {
  BulkUserStatusAction,
  CreateUserInput,
  ManagedUser,
  UpdateUserInput,
  UserListQueryParams,
} from "../types/user-management.types";

export interface IUserService {
  list(params: UserListQueryParams): Promise<PaginatedResponse<ManagedUser>>;
  getById(id: string): Promise<ApiResponse<ManagedUser>>;
  create(input: CreateUserInput): Promise<ApiResponse<ManagedUser>>;
  update(id: string, input: UpdateUserInput): Promise<ApiResponse<ManagedUser>>;
  delete(id: string): Promise<ApiResponse<null>>;
  bulkUpdateStatus(
    ids: string[],
    action: BulkUserStatusAction,
  ): Promise<ApiResponse<ManagedUser[]>>;
  bulkDelete(ids: string[]): Promise<ApiResponse<null>>;
}
