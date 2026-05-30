import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type {
  CreateDepartmentInput,
  Department,
  DepartmentDetail,
  DepartmentListQueryParams,
  DepartmentOption,
  EntityStatusAction,
  UpdateDepartmentInput,
} from "../types/academic.types";

export interface IDepartmentService {
  list(
    params: DepartmentListQueryParams,
  ): Promise<PaginatedResponse<Department>>;
  listOptions(): Promise<ApiResponse<DepartmentOption[]>>;
  getById(id: string): Promise<ApiResponse<Department>>;
  getDetail(id: string): Promise<ApiResponse<DepartmentDetail>>;
  create(input: CreateDepartmentInput): Promise<ApiResponse<Department>>;
  update(
    id: string,
    input: UpdateDepartmentInput,
  ): Promise<ApiResponse<Department>>;
  changeStatus(
    id: string,
    action: EntityStatusAction,
  ): Promise<ApiResponse<Department>>;
  delete(id: string): Promise<ApiResponse<null>>;
}
