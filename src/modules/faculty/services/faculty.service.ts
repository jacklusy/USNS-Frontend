import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type {
  CreateFacultyInput,
  EntityStatusAction,
  FacultyDetail,
  FacultyListQueryParams,
  FacultyMember,
  UpdateFacultyInput,
} from "../types/faculty.types";

export interface IFacultyService {
  list(
    params: FacultyListQueryParams,
  ): Promise<PaginatedResponse<FacultyMember>>;
  getById(id: string): Promise<ApiResponse<FacultyMember>>;
  getDetail(id: string): Promise<ApiResponse<FacultyDetail>>;
  create(input: CreateFacultyInput): Promise<ApiResponse<FacultyMember>>;
  update(
    id: string,
    input: UpdateFacultyInput,
  ): Promise<ApiResponse<FacultyMember>>;
  delete(id: string): Promise<ApiResponse<null>>;
  changeStatus(
    id: string,
    action: EntityStatusAction,
  ): Promise<ApiResponse<FacultyMember>>;
}
