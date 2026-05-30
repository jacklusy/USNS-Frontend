import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type {
  CreateFacultyInput,
  EntityStatusAction,
  FacultyDetail,
  FacultyListQueryParams,
  FacultyMember,
  UpdateFacultyInput,
} from "../types/faculty.types";
import type { IFacultyService } from "./faculty.service";

export class RealFacultyService implements IFacultyService {
  async list(
    _params: FacultyListQueryParams,
  ): Promise<PaginatedResponse<FacultyMember>> {
    throw new Error("Faculty API not integrated");
  }

  async getById(_id: string): Promise<ApiResponse<FacultyMember>> {
    throw new Error("Faculty API not integrated");
  }

  async getDetail(_id: string): Promise<ApiResponse<FacultyDetail>> {
    throw new Error("Faculty API not integrated");
  }

  async create(_input: CreateFacultyInput): Promise<ApiResponse<FacultyMember>> {
    throw new Error("Faculty API not integrated");
  }

  async update(
    _id: string,
    _input: UpdateFacultyInput,
  ): Promise<ApiResponse<FacultyMember>> {
    throw new Error("Faculty API not integrated");
  }

  async delete(_id: string): Promise<ApiResponse<null>> {
    throw new Error("Faculty API not integrated");
  }

  async changeStatus(
    _id: string,
    _action: EntityStatusAction,
  ): Promise<ApiResponse<FacultyMember>> {
    throw new Error("Faculty API not integrated");
  }
}

export const realFacultyService = new RealFacultyService();
