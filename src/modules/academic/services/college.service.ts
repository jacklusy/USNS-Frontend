import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type {
  College,
  CollegeDetail,
  CollegeListQueryParams,
  CreateCollegeInput,
  EntityStatusAction,
  UpdateCollegeInput,
} from "../types/academic.types";

export interface ICollegeService {
  list(params: CollegeListQueryParams): Promise<PaginatedResponse<College>>;
  getById(id: string): Promise<ApiResponse<College>>;
  getDetail(id: string): Promise<ApiResponse<CollegeDetail>>;
  create(input: CreateCollegeInput): Promise<ApiResponse<College>>;
  update(id: string, input: UpdateCollegeInput): Promise<ApiResponse<College>>;
  changeStatus(
    id: string,
    action: EntityStatusAction,
    cascadeDepartments?: boolean,
  ): Promise<ApiResponse<College>>;
  delete(id: string): Promise<ApiResponse<null>>;
}
