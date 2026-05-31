import {
  toAdministrativeStaff,
  toStaffDetail,
} from "@/lib/transformers/staff.transformer";
import { del, get, getPaginated, post, put } from "@/services/api-client";
import { ENDPOINTS } from "@/services/endpoints";
import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type {
  AdministrativeStaffDto,
  StaffDetailDto,
} from "@/types/dto/staff.dto";
import type {
  CreateStaffInput,
  EntityStatusAction,
  AdministrativeStaff,
  StaffDetail,
  StaffListQueryParams,
  UpdateStaffInput,
} from "../types/staff.types";
import type { IStaffService } from "./staff.service";

function buildListQuery(params: StaffListQueryParams): string {
  const search = new URLSearchParams();
  search.set("page", String(params.page));
  search.set("per_page", String(params.per_page));
  if (params.search) search.set("search", params.search);
  if (params.departmentId) search.set("department_id", params.departmentId);
  if (params.office) search.set("office", params.office);
  if (params.dashboardRole) search.set("dashboard_role", params.dashboardRole);
  if (params.status) search.set("status", params.status);
  const query = search.toString();
  return query ? `?${query}` : "";
}

export class RealStaffService implements IStaffService {
  async list(
    params: StaffListQueryParams,
  ): Promise<PaginatedResponse<AdministrativeStaff>> {
    const response = await getPaginated<AdministrativeStaffDto>(
      `${ENDPOINTS.staff.list}${buildListQuery(params)}`,
    );
    return {
      data: response.data.map(toAdministrativeStaff),
      meta: response.meta,
    };
  }

  async getById(id: string): Promise<ApiResponse<AdministrativeStaff>> {
    const data = await get<AdministrativeStaffDto>(ENDPOINTS.staff.byId(id));
    return { data: toAdministrativeStaff(data) };
  }

  async getDetail(id: string): Promise<ApiResponse<StaffDetail>> {
    const data = await get<StaffDetailDto>(ENDPOINTS.staff.byId(id));
    return { data: toStaffDetail(data) };
  }

  async create(input: CreateStaffInput): Promise<ApiResponse<AdministrativeStaff>> {
    const data = await post<AdministrativeStaffDto, CreateStaffInput>(
      ENDPOINTS.staff.create,
      input,
    );
    return { data: toAdministrativeStaff(data) };
  }

  async update(
    id: string,
    input: UpdateStaffInput,
  ): Promise<ApiResponse<AdministrativeStaff>> {
    const data = await put<AdministrativeStaffDto, UpdateStaffInput>(
      ENDPOINTS.staff.update(id),
      input,
    );
    return { data: toAdministrativeStaff(data) };
  }

  async delete(id: string): Promise<ApiResponse<null>> {
    await del(ENDPOINTS.staff.delete(id));
    return { data: null };
  }

  async changeStatus(
    id: string,
    action: EntityStatusAction,
  ): Promise<ApiResponse<AdministrativeStaff>> {
    const data = await post<AdministrativeStaffDto, { action: EntityStatusAction }>(
      `${ENDPOINTS.staff.update(id)}/status`,
      { action },
    );
    return { data: toAdministrativeStaff(data) };
  }
}

export const realStaffService = new RealStaffService();
