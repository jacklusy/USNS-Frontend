import { toProgram, toProgramDetail } from "@/lib/transformers/academic.transformer";
import { del, get, getPaginated, post, put } from "@/services/api-client";
import { ENDPOINTS } from "@/services/endpoints";
import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type { ProgramDetailDto, ProgramDto } from "@/types/dto/academic.dto";
import type {
  CreateProgramInput,
  EntityStatusAction,
  Program,
  ProgramDetail,
  ProgramListQueryParams,
  UpdateProgramInput,
} from "../types/academic.types";
import type { IProgramService } from "./program.service";

function buildListQuery(params: ProgramListQueryParams): string {
  const search = new URLSearchParams();
  search.set("page", String(params.page));
  search.set("per_page", String(params.per_page));
  if (params.search) search.set("search", params.search);
  if (params.departmentId) search.set("department_id", params.departmentId);
  if (params.status) search.set("status", params.status);
  const query = search.toString();
  return query ? `?${query}` : "";
}

export class RealProgramService implements IProgramService {
  async list(
    params: ProgramListQueryParams,
  ): Promise<PaginatedResponse<Program>> {
    const response = await getPaginated<ProgramDto>(
      `${ENDPOINTS.programs.list}${buildListQuery(params)}`,
    );
    return {
      data: response.data.map(toProgram),
      meta: response.meta,
    };
  }

  async getById(id: string): Promise<ApiResponse<Program>> {
    const data = await get<ProgramDto>(ENDPOINTS.programs.byId(id));
    return { data: toProgram(data) };
  }

  async getDetail(id: string): Promise<ApiResponse<ProgramDetail>> {
    const data = await get<ProgramDetailDto>(ENDPOINTS.programs.byId(id));
    return { data: toProgramDetail(data) };
  }

  async create(input: CreateProgramInput): Promise<ApiResponse<Program>> {
    const data = await post<ProgramDto, CreateProgramInput>(
      ENDPOINTS.programs.create,
      input,
    );
    return { data: toProgram(data) };
  }

  async update(
    id: string,
    input: UpdateProgramInput,
  ): Promise<ApiResponse<Program>> {
    const data = await put<ProgramDto, UpdateProgramInput>(
      ENDPOINTS.programs.update(id),
      input,
    );
    return { data: toProgram(data) };
  }

  async changeStatus(
    id: string,
    action: EntityStatusAction,
  ): Promise<ApiResponse<Program>> {
    const data = await post<ProgramDto, { action: EntityStatusAction }>(
      `${ENDPOINTS.programs.update(id)}/status`,
      { action },
    );
    return { data: toProgram(data) };
  }

  async delete(id: string): Promise<ApiResponse<null>> {
    await del(ENDPOINTS.programs.delete(id));
    return { data: null };
  }
}

export const realProgramService = new RealProgramService();
