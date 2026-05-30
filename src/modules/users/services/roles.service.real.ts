import { roleManagementService } from "@/modules/roles/services";
import type { ApiResponse } from "@/types/api.types";
import type { UserRole } from "@/types/user.types";
import type { RoleOption } from "../types/user-management.types";
import type { IRolesService } from "./roles.service";

export class RealRolesService implements IRolesService {
  async list(): Promise<ApiResponse<RoleOption[]>> {
    const response = await roleManagementService.listOptions();
    return {
      data: response.data.map((option) => ({
        value: option.value as UserRole,
        label: option.label,
      })),
    };
  }
}

export const realRolesService = new RealRolesService();
