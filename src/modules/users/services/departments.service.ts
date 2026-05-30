import type { ApiResponse } from "@/types/api.types";
import type { DepartmentOption } from "../types/user-management.types";

export interface IDepartmentsService {
  list(): Promise<ApiResponse<DepartmentOption[]>>;
}
