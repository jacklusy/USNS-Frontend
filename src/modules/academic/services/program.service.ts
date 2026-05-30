import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type {
  CreateProgramInput,
  EntityStatusAction,
  Program,
  ProgramDetail,
  ProgramListQueryParams,
  UpdateProgramInput,
} from "../types/academic.types";

export interface IProgramService {
  list(params: ProgramListQueryParams): Promise<PaginatedResponse<Program>>;
  getById(id: string): Promise<ApiResponse<Program>>;
  getDetail(id: string): Promise<ApiResponse<ProgramDetail>>;
  create(input: CreateProgramInput): Promise<ApiResponse<Program>>;
  update(id: string, input: UpdateProgramInput): Promise<ApiResponse<Program>>;
  changeStatus(
    id: string,
    action: EntityStatusAction,
  ): Promise<ApiResponse<Program>>;
  delete(id: string): Promise<ApiResponse<null>>;
}
