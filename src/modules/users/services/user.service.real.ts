import { del, get, getPaginated, post, put } from "@/services/api-client";
import { ENDPOINTS } from "@/services/endpoints";
import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type {
  BulkUserStatusAction,
  CreateUserInput,
  ManagedUser,
  UpdateUserInput,
  UserListQueryParams,
} from "../types/user-management.types";
import type { IUserService } from "./user.service";

function buildListQuery(params: UserListQueryParams): string {
  const search = new URLSearchParams();
  search.set("page", String(params.page));
  search.set("per_page", String(params.per_page));
  if (params.search) {
    search.set("search", params.search);
  }
  if (params.roles?.length) {
    search.set("role", params.roles.join(","));
  }
  if (params.status) {
    search.set("status", params.status);
  }
  const query = search.toString();
  return query ? `?${query}` : "";
}

export class RealUserService implements IUserService {
  async list(
    params: UserListQueryParams,
  ): Promise<PaginatedResponse<ManagedUser>> {
    return getPaginated<ManagedUser>(
      `${ENDPOINTS.users.list}${buildListQuery(params)}`,
    );
  }

  async getById(id: string): Promise<ApiResponse<ManagedUser>> {
    const data = await get<ManagedUser>(ENDPOINTS.users.byId(id));
    return { data };
  }

  async create(input: CreateUserInput): Promise<ApiResponse<ManagedUser>> {
    const data = await post<ManagedUser, CreateUserInput>(
      ENDPOINTS.users.create,
      input,
    );
    return { data };
  }

  async update(
    id: string,
    input: UpdateUserInput,
  ): Promise<ApiResponse<ManagedUser>> {
    const data = await put<ManagedUser, UpdateUserInput>(
      ENDPOINTS.users.update(id),
      input,
    );
    return { data };
  }

  async delete(id: string): Promise<ApiResponse<null>> {
    await del(ENDPOINTS.users.delete(id));
    return { data: null };
  }

  async bulkUpdateStatus(
    ids: string[],
    action: BulkUserStatusAction,
  ): Promise<ApiResponse<ManagedUser[]>> {
    const data = await post<ManagedUser[], { ids: string[]; action: BulkUserStatusAction }>(
      `${ENDPOINTS.users.list}/bulk-status`,
      { ids, action },
    );
    return { data };
  }

  async bulkDelete(ids: string[]): Promise<ApiResponse<null>> {
    await post<null, { ids: string[] }>(`${ENDPOINTS.users.list}/bulk-delete`, {
      ids,
    });
    return { data: null };
  }
}

export const realUserService = new RealUserService();
