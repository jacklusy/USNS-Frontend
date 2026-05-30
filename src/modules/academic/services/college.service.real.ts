import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type {
  College,
  CollegeDetail,
  CollegeListQueryParams,
  CreateCollegeInput,
  EntityStatusAction,
  UpdateCollegeInput,
} from "../types/academic.types";
import type { ICollegeService } from "./college.service";

export class RealCollegeService implements ICollegeService {
  async list(
    _params: CollegeListQueryParams,
  ): Promise<PaginatedResponse<College>> {
    throw new Error("College API not integrated");
  }

  async getById(_id: string): Promise<ApiResponse<College>> {
    throw new Error("College API not integrated");
  }

  async getDetail(_id: string): Promise<ApiResponse<CollegeDetail>> {
    throw new Error("College API not integrated");
  }

  async create(_input: CreateCollegeInput): Promise<ApiResponse<College>> {
    throw new Error("College API not integrated");
  }

  async update(
    _id: string,
    _input: UpdateCollegeInput,
  ): Promise<ApiResponse<College>> {
    throw new Error("College API not integrated");
  }

  async changeStatus(
    _id: string,
    _action: EntityStatusAction,
    _cascadeDepartments?: boolean,
  ): Promise<ApiResponse<College>> {
    throw new Error("College API not integrated");
  }

  async delete(_id: string): Promise<ApiResponse<null>> {
    throw new Error("College API not integrated");
  }
}

export const realCollegeService = new RealCollegeService();
