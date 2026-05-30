import type { ApiResponse } from "@/types/api.types";
import type { RoleOption } from "../types/user-management.types";

export interface IRolesService {
  list(): Promise<ApiResponse<RoleOption[]>>;
}
