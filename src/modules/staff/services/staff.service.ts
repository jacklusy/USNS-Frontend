import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type {
  AdministrativeStaff,
  CreateStaffInput,
  EntityStatusAction,
  StaffDetail,
  StaffListQueryParams,
  UpdateStaffInput,
} from "../types/staff.types";

export interface IStaffService {
  list(
    params: StaffListQueryParams,
  ): Promise<PaginatedResponse<AdministrativeStaff>>;
  getById(id: string): Promise<ApiResponse<AdministrativeStaff>>;
  getDetail(id: string): Promise<ApiResponse<StaffDetail>>;
  create(input: CreateStaffInput): Promise<ApiResponse<AdministrativeStaff>>;
  update(
    id: string,
    input: UpdateStaffInput,
  ): Promise<ApiResponse<AdministrativeStaff>>;
  delete(id: string): Promise<ApiResponse<null>>;
  changeStatus(
    id: string,
    action: EntityStatusAction,
  ): Promise<ApiResponse<AdministrativeStaff>>;
}
