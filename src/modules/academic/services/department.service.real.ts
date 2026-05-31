import {
  toDepartment,
  toDepartmentDetail,
  toDepartmentOption,
} from "@/lib/transformers/academic.transformer";
import { del, get, getPaginated, post, put } from "@/services/api-client";
import { ENDPOINTS } from "@/services/endpoints";
import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type {
  DepartmentDetailDto,
  DepartmentDto,
  DepartmentOptionDto,
} from "@/types/dto/academic.dto";
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

function buildListQuery(params: DepartmentListQueryParams): string {
  const search = new URLSearchParams();
  search.set("page", String(params.page));
  search.set("per_page", String(params.per_page));
  if (params.search) search.set("search", params.search);
  if (params.collegeId) search.set("college_id", params.collegeId);
  if (params.status) search.set("status", params.status);
  const query = search.toString();
  return query ? `?${query}` : "";
}

export class RealDepartmentService implements IDepartmentService {
  async list(
    params: DepartmentListQueryParams,
  ): Promise<PaginatedResponse<Department>> {
    const response = await getPaginated<DepartmentDto>(
      `${ENDPOINTS.departments.list}${buildListQuery(params)}`,
    );
    return {
      data: response.data.map(toDepartment),
      meta: response.meta,
    };
  }

  async listOptions(): Promise<ApiResponse<DepartmentOption[]>> {
    const data = await get<DepartmentOptionDto[]>(`${ENDPOINTS.departments.list}/options`);
    return { data: data.map(toDepartmentOption) };
  }

  async getById(id: string): Promise<ApiResponse<Department>> {
    const data = await get<DepartmentDto>(ENDPOINTS.departments.byId(id));
    return { data: toDepartment(data) };
  }

  async getDetail(id: string): Promise<ApiResponse<DepartmentDetail>> {
    const data = await get<DepartmentDetailDto>(ENDPOINTS.departments.byId(id));
    return { data: toDepartmentDetail(data) };
  }

  async create(input: CreateDepartmentInput): Promise<ApiResponse<Department>> {
    const data = await post<DepartmentDto, CreateDepartmentInput>(
      ENDPOINTS.departments.create,
      input,
    );
    return { data: toDepartment(data) };
  }

  async update(
    id: string,
    input: UpdateDepartmentInput,
  ): Promise<ApiResponse<Department>> {
    const data = await put<DepartmentDto, UpdateDepartmentInput>(
      ENDPOINTS.departments.update(id),
      input,
    );
    return { data: toDepartment(data) };
  }

  async changeStatus(
    id: string,
    action: EntityStatusAction,
  ): Promise<ApiResponse<Department>> {
    const data = await post<DepartmentDto, { action: EntityStatusAction }>(
      `${ENDPOINTS.departments.update(id)}/status`,
      { action },
    );
    return { data: toDepartment(data) };
  }

  async delete(id: string): Promise<ApiResponse<null>> {
    await del(ENDPOINTS.departments.delete(id));
    return { data: null };
  }
}

export const realDepartmentService = new RealDepartmentService();
