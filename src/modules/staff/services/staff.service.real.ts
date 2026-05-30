import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type {
  AdministrativeStaff,
  CreateStaffInput,
  EntityStatusAction,
  StaffDetail,
  StaffListQueryParams,
  UpdateStaffInput,
} from "../types/staff.types";
import type { IStaffService } from "./staff.service";

export class RealStaffService implements IStaffService {
  async list(
    _params: StaffListQueryParams,
  ): Promise<PaginatedResponse<AdministrativeStaff>> {
    throw new Error("Staff API not integrated");
  }

  async getById(_id: string): Promise<ApiResponse<AdministrativeStaff>> {
    throw new Error("Staff API not integrated");
  }

  async getDetail(_id: string): Promise<ApiResponse<StaffDetail>> {
    throw new Error("Staff API not integrated");
  }

  async create(
    _input: CreateStaffInput,
  ): Promise<ApiResponse<AdministrativeStaff>> {
    throw new Error("Staff API not integrated");
  }

  async update(
    _id: string,
    _input: UpdateStaffInput,
  ): Promise<ApiResponse<AdministrativeStaff>> {
    throw new Error("Staff API not integrated");
  }

  async delete(_id: string): Promise<ApiResponse<null>> {
    throw new Error("Staff API not integrated");
  }

  async changeStatus(
    _id: string,
    _action: EntityStatusAction,
  ): Promise<ApiResponse<AdministrativeStaff>> {
    throw new Error("Staff API not integrated");
  }
}

export const realStaffService = new RealStaffService();
