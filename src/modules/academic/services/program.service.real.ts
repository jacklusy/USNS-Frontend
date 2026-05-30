import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type {
  CreateProgramInput,
  EntityStatusAction,
  Program,
  ProgramDetail,
  ProgramListQueryParams,
  UpdateProgramInput,
} from "../types/academic.types";
import type { IProgramService } from "./program.service";

export class RealProgramService implements IProgramService {
  async list(
    _params: ProgramListQueryParams,
  ): Promise<PaginatedResponse<Program>> {
    throw new Error("Program API not integrated");
  }

  async getById(_id: string): Promise<ApiResponse<Program>> {
    throw new Error("Program API not integrated");
  }

  async getDetail(_id: string): Promise<ApiResponse<ProgramDetail>> {
    throw new Error("Program API not integrated");
  }

  async create(_input: CreateProgramInput): Promise<ApiResponse<Program>> {
    throw new Error("Program API not integrated");
  }

  async update(
    _id: string,
    _input: UpdateProgramInput,
  ): Promise<ApiResponse<Program>> {
    throw new Error("Program API not integrated");
  }

  async changeStatus(
    _id: string,
    _action: EntityStatusAction,
  ): Promise<ApiResponse<Program>> {
    throw new Error("Program API not integrated");
  }

  async delete(_id: string): Promise<ApiResponse<null>> {
    throw new Error("Program API not integrated");
  }
}

export const realProgramService = new RealProgramService();
