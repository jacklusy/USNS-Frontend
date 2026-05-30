import type { ApiResponse, PaginatedResponse } from "@/types/api.types";

type CourseOption = { value: string; label: string };
import type {
  Course,
  CourseDetail,
  CourseListQueryParams,
  CreateCourseInput,
  EntityStatusAction,
  UpdateCourseInput,
} from "../types/academic.types";
import type { ICourseService } from "./course.service";

export class RealCourseService implements ICourseService {
  async listOptions(_excludeId?: string): Promise<ApiResponse<{ value: string; label: string }[]>> {
    throw new Error("Course API not integrated");
  }

  async list(
    _params: CourseListQueryParams,
  ): Promise<PaginatedResponse<Course>> {
    throw new Error("Course API not integrated");
  }

  async getById(_id: string): Promise<ApiResponse<Course>> {
    throw new Error("Course API not integrated");
  }

  async getDetail(_id: string): Promise<ApiResponse<CourseDetail>> {
    throw new Error("Course API not integrated");
  }

  async create(_input: CreateCourseInput): Promise<ApiResponse<Course>> {
    throw new Error("Course API not integrated");
  }

  async update(
    _id: string,
    _input: UpdateCourseInput,
  ): Promise<ApiResponse<Course>> {
    throw new Error("Course API not integrated");
  }

  async changeStatus(
    _id: string,
    _action: EntityStatusAction,
  ): Promise<ApiResponse<Course>> {
    throw new Error("Course API not integrated");
  }

  async delete(_id: string): Promise<ApiResponse<null>> {
    throw new Error("Course API not integrated");
  }
}

export const realCourseService = new RealCourseService();
