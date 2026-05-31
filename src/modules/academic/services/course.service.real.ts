import { toCourse, toCourseDetail } from "@/lib/transformers/academic.transformer";
import { del, get, getPaginated, post, put } from "@/services/api-client";
import { ENDPOINTS } from "@/services/endpoints";
import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type { CourseDetailDto, CourseDto } from "@/types/dto/academic.dto";
import type {
  Course,
  CourseDetail,
  CourseListQueryParams,
  CreateCourseInput,
  EntityStatusAction,
  UpdateCourseInput,
} from "../types/academic.types";
import type { ICourseService } from "./course.service";

function buildListQuery(params: CourseListQueryParams): string {
  const search = new URLSearchParams();
  search.set("page", String(params.page));
  search.set("per_page", String(params.per_page));
  if (params.search) search.set("search", params.search);
  if (params.departmentId) search.set("department_id", params.departmentId);
  if (params.status) search.set("status", params.status);
  const query = search.toString();
  return query ? `?${query}` : "";
}

export class RealCourseService implements ICourseService {
  async listOptions(
    excludeId?: string,
  ): Promise<ApiResponse<{ value: string; label: string }[]>> {
    const query = excludeId ? `?exclude_id=${encodeURIComponent(excludeId)}` : "";
    const data = await get<{ value: string; label: string }[]>(
      `${ENDPOINTS.courses.list}/options${query}`,
    );
    return { data };
  }

  async list(
    params: CourseListQueryParams,
  ): Promise<PaginatedResponse<Course>> {
    const response = await getPaginated<CourseDto>(
      `${ENDPOINTS.courses.list}${buildListQuery(params)}`,
    );
    return {
      data: response.data.map(toCourse),
      meta: response.meta,
    };
  }

  async getById(id: string): Promise<ApiResponse<Course>> {
    const data = await get<CourseDto>(ENDPOINTS.courses.byId(id));
    return { data: toCourse(data) };
  }

  async getDetail(id: string): Promise<ApiResponse<CourseDetail>> {
    const data = await get<CourseDetailDto>(ENDPOINTS.courses.byId(id));
    return { data: toCourseDetail(data) };
  }

  async create(input: CreateCourseInput): Promise<ApiResponse<Course>> {
    const data = await post<CourseDto, CreateCourseInput>(
      ENDPOINTS.courses.create,
      input,
    );
    return { data: toCourse(data) };
  }

  async update(
    id: string,
    input: UpdateCourseInput,
  ): Promise<ApiResponse<Course>> {
    const data = await put<CourseDto, UpdateCourseInput>(
      ENDPOINTS.courses.update(id),
      input,
    );
    return { data: toCourse(data) };
  }

  async changeStatus(
    id: string,
    action: EntityStatusAction,
  ): Promise<ApiResponse<Course>> {
    const data = await post<CourseDto, { action: EntityStatusAction }>(
      `${ENDPOINTS.courses.update(id)}/status`,
      { action },
    );
    return { data: toCourse(data) };
  }

  async delete(id: string): Promise<ApiResponse<null>> {
    await del(ENDPOINTS.courses.delete(id));
    return { data: null };
  }
}

export const realCourseService = new RealCourseService();
