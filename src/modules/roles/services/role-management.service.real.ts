import { del, get, getPaginated, post, put } from "@/services/api-client";
import { ENDPOINTS } from "@/services/endpoints";
import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type {
  CreateRoleInput,
  ManagedRole,
  PermissionMatrixData,
  RoleListQueryParams,
  RoleOption,
  UpdateRoleInput,
} from "../types/role-management.types";
import type { IRoleManagementService } from "./role-management.service";

function buildListQuery(params: RoleListQueryParams): string {
  const search = new URLSearchParams();
  search.set("page", String(params.page));
  search.set("per_page", String(params.per_page));
  if (params.search) {
    search.set("search", params.search);
  }
  const query = search.toString();
  return query ? `?${query}` : "";
}

export class RealRoleManagementService implements IRoleManagementService {
  async list(
    params: RoleListQueryParams,
  ): Promise<PaginatedResponse<ManagedRole>> {
    return getPaginated<ManagedRole>(
      `${ENDPOINTS.roles.list}${buildListQuery(params)}`,
    );
  }

  async listOptions(): Promise<ApiResponse<RoleOption[]>> {
    const data = await get<RoleOption[]>(ENDPOINTS.roles.list);
    return { data };
  }

  async getById(id: string): Promise<ApiResponse<ManagedRole>> {
    const data = await get<ManagedRole>(ENDPOINTS.roles.byId(id));
    return { data };
  }

  async getPermissionMatrix(): Promise<ApiResponse<PermissionMatrixData>> {
    const data = await get<PermissionMatrixData>(
      `${ENDPOINTS.roles.list}/permission-matrix`,
    );
    return { data };
  }

  async create(input: CreateRoleInput): Promise<ApiResponse<ManagedRole>> {
    const data = await post<ManagedRole, CreateRoleInput>(
      ENDPOINTS.roles.create,
      input,
    );
    return { data };
  }

  async update(
    id: string,
    input: UpdateRoleInput,
  ): Promise<ApiResponse<ManagedRole>> {
    const data = await put<ManagedRole, UpdateRoleInput>(
      ENDPOINTS.roles.update(id),
      input,
    );
    return { data };
  }

  async delete(id: string): Promise<ApiResponse<null>> {
    await del(ENDPOINTS.roles.delete(id));
    return { data: null };
  }
}

export const realRoleManagementService = new RealRoleManagementService();
