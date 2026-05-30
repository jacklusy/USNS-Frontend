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
import type { IDepartmentService } from "./department.service";

export class RealDepartmentService implements IDepartmentService {
  async list(
    _params: DepartmentListQueryParams,
  ): Promise<PaginatedResponse<Department>> {
    throw new Error("Department API not integrated");
  }

  async listOptions(): Promise<ApiResponse<DepartmentOption[]>> {
    throw new Error("Department API not integrated");
  }

  async getById(_id: string): Promise<ApiResponse<Department>> {
    throw new Error("Department API not integrated");
  }

  async getDetail(_id: string): Promise<ApiResponse<DepartmentDetail>> {
    throw new Error("Department API not integrated");
  }

  async create(
    _input: CreateDepartmentInput,
  ): Promise<ApiResponse<Department>> {
    throw new Error("Department API not integrated");
  }

  async update(
    _id: string,
    _input: UpdateDepartmentInput,
  ): Promise<ApiResponse<Department>> {
    throw new Error("Department API not integrated");
  }

  async changeStatus(
    _id: string,
    _action: EntityStatusAction,
  ): Promise<ApiResponse<Department>> {
    throw new Error("Department API not integrated");
  }

  async delete(_id: string): Promise<ApiResponse<null>> {
    throw new Error("Department API not integrated");
  }
}

export const realDepartmentService = new RealDepartmentService();
