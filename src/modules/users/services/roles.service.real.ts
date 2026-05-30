import { get } from "@/services/api-client";
import { ENDPOINTS } from "@/services/endpoints";
import type { ApiResponse } from "@/types/api.types";
import type { RoleOption } from "../types/user-management.types";
import type { IRolesService } from "./roles.service";

export class RealRolesService implements IRolesService {
  async list(): Promise<ApiResponse<RoleOption[]>> {
    const data = await get<RoleOption[]>(ENDPOINTS.roles.list);
    return { data };
  }
}

export const realRolesService = new RealRolesService();
