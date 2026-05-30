import { departmentService } from "@/modules/academic/services";
import type { ApiResponse } from "@/types/api.types";
import type { DepartmentOption } from "../types/user-management.types";
import type { IDepartmentsService } from "./departments.service";

export class MockDepartmentsService implements IDepartmentsService {
  async list(): Promise<ApiResponse<DepartmentOption[]>> {
    return departmentService.listOptions();
  }
}

export const mockDepartmentsService = new MockDepartmentsService();
