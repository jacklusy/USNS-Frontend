import type { ApiResponse, PaginatedResponse } from "@/types/api.types";

export type CourseOption = { value: string; label: string };
import type {
  Course,
  CourseDetail,
  CourseListQueryParams,
  CreateCourseInput,
  EntityStatusAction,
  UpdateCourseInput,
} from "../types/academic.types";

export interface ICourseService {
  listOptions(excludeId?: string): Promise<ApiResponse<{ value: string; label: string }[]>>;
  list(params: CourseListQueryParams): Promise<PaginatedResponse<Course>>;
  getById(id: string): Promise<ApiResponse<Course>>;
  getDetail(id: string): Promise<ApiResponse<CourseDetail>>;
  create(input: CreateCourseInput): Promise<ApiResponse<Course>>;
  update(id: string, input: UpdateCourseInput): Promise<ApiResponse<Course>>;
  changeStatus(
    id: string,
    action: EntityStatusAction,
  ): Promise<ApiResponse<Course>>;
  delete(id: string): Promise<ApiResponse<null>>;
}
