import {
  toCollege,
  toCollegeDetail,
} from "@/lib/transformers/academic.transformer";
import { del, get, getPaginated, post, put } from "@/services/api-client";
import { ENDPOINTS } from "@/services/endpoints";
import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type { CollegeDetailDto, CollegeDto } from "@/types/dto/academic.dto";
import type {
  College,
  CollegeDetail,
  CollegeListQueryParams,
  CreateCollegeInput,
  EntityStatusAction,
  UpdateCollegeInput,
} from "../types/academic.types";
import type { ICollegeService } from "./college.service";

function buildListQuery(params: CollegeListQueryParams): string {
  const search = new URLSearchParams();
  search.set("page", String(params.page));
  search.set("per_page", String(params.per_page));
  if (params.search) search.set("search", params.search);
  if (params.status) search.set("status", params.status);
  const query = search.toString();
  return query ? `?${query}` : "";
}

export class RealCollegeService implements ICollegeService {
  async list(
    params: CollegeListQueryParams,
  ): Promise<PaginatedResponse<College>> {
    const response = await getPaginated<CollegeDto>(
      `${ENDPOINTS.colleges.list}${buildListQuery(params)}`,
    );
    return {
      data: response.data.map(toCollege),
      meta: response.meta,
    };
  }

  async getById(id: string): Promise<ApiResponse<College>> {
    const data = await get<CollegeDto>(ENDPOINTS.colleges.byId(id));
    return { data: toCollege(data) };
  }

  async getDetail(id: string): Promise<ApiResponse<CollegeDetail>> {
    const data = await get<CollegeDetailDto>(ENDPOINTS.colleges.byId(id));
    return { data: toCollegeDetail(data) };
  }

  async create(input: CreateCollegeInput): Promise<ApiResponse<College>> {
    const data = await post<CollegeDto, CreateCollegeInput>(
      ENDPOINTS.colleges.create,
      input,
    );
    return { data: toCollege(data) };
  }

  async update(
    id: string,
    input: UpdateCollegeInput,
  ): Promise<ApiResponse<College>> {
    const data = await put<CollegeDto, UpdateCollegeInput>(
      ENDPOINTS.colleges.update(id),
      input,
    );
    return { data: toCollege(data) };
  }

  async changeStatus(
    id: string,
    action: EntityStatusAction,
    _cascadeDepartments?: boolean,
  ): Promise<ApiResponse<College>> {
    const data = await post<CollegeDto, { action: EntityStatusAction }>(
      `${ENDPOINTS.colleges.update(id)}/status`,
      { action },
    );
    return { data: toCollege(data) };
  }

  async delete(id: string): Promise<ApiResponse<null>> {
    await del(ENDPOINTS.colleges.delete(id));
    return { data: null };
  }
}

export const realCollegeService = new RealCollegeService();
