import { get } from "@/services/api-client";
import { ENDPOINTS } from "@/services/endpoints";
import type { ApiResponse } from "@/types/api.types";
import type { DepartmentOption } from "../types/user-management.types";
import type { IDepartmentsService } from "./departments.service";

export class RealDepartmentsService implements IDepartmentsService {
  async list(): Promise<ApiResponse<DepartmentOption[]>> {
    const data = await get<DepartmentOption[]>(ENDPOINTS.departments.list);
    return { data };
  }
}

export const realDepartmentsService = new RealDepartmentsService();
