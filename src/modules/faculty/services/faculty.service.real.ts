import { toFacultyDetail, toFacultyMember } from "@/lib/transformers/faculty.transformer";
import { del, get, getPaginated, post, put } from "@/services/api-client";
import { ENDPOINTS } from "@/services/endpoints";
import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type { FacultyDetailDto, FacultyMemberDto } from "@/types/dto/faculty.dto";
import type {
  CreateFacultyInput,
  EntityStatusAction,
  FacultyDetail,
  FacultyListQueryParams,
  FacultyMember,
  UpdateFacultyInput,
} from "../types/faculty.types";
import type { IFacultyService } from "./faculty.service";

function buildListQuery(params: FacultyListQueryParams): string {
  const search = new URLSearchParams();
  search.set("page", String(params.page));
  search.set("per_page", String(params.per_page));
  if (params.search) search.set("search", params.search);
  if (params.departmentId) search.set("department_id", params.departmentId);
  if (params.rank) search.set("rank", params.rank);
  if (params.status) search.set("status", params.status);
  const query = search.toString();
  return query ? `?${query}` : "";
}

export class RealFacultyService implements IFacultyService {
  async list(
    params: FacultyListQueryParams,
  ): Promise<PaginatedResponse<FacultyMember>> {
    const response = await getPaginated<FacultyMemberDto>(
      `${ENDPOINTS.faculty.list}${buildListQuery(params)}`,
    );
    return {
      data: response.data.map(toFacultyMember),
      meta: response.meta,
    };
  }

  async getById(id: string): Promise<ApiResponse<FacultyMember>> {
    const data = await get<FacultyMemberDto>(ENDPOINTS.faculty.byId(id));
    return { data: toFacultyMember(data) };
  }

  async getDetail(id: string): Promise<ApiResponse<FacultyDetail>> {
    const data = await get<FacultyDetailDto>(ENDPOINTS.faculty.byId(id));
    return { data: toFacultyDetail(data) };
  }

  async create(input: CreateFacultyInput): Promise<ApiResponse<FacultyMember>> {
    const data = await post<FacultyMemberDto, CreateFacultyInput>(
      ENDPOINTS.faculty.create,
      input,
    );
    return { data: toFacultyMember(data) };
  }

  async update(
    id: string,
    input: UpdateFacultyInput,
  ): Promise<ApiResponse<FacultyMember>> {
    const data = await put<FacultyMemberDto, UpdateFacultyInput>(
      ENDPOINTS.faculty.update(id),
      input,
    );
    return { data: toFacultyMember(data) };
  }

  async delete(id: string): Promise<ApiResponse<null>> {
    await del(ENDPOINTS.faculty.delete(id));
    return { data: null };
  }

  async changeStatus(
    id: string,
    action: EntityStatusAction,
  ): Promise<ApiResponse<FacultyMember>> {
    const data = await post<FacultyMemberDto, { action: EntityStatusAction }>(
      `${ENDPOINTS.faculty.update(id)}/status`,
      { action },
    );
    return { data: toFacultyMember(data) };
  }
}

export const realFacultyService = new RealFacultyService();
