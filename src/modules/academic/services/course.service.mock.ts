import { MockServiceBase } from "@/lib/mock-service-base";
import { findDepartmentById } from "@/mock/academic/departments.mock";
import {
  courseCodeExists,
  findCourseById,
  generateCourseId,
  getCoursesStore,
  listCourseOptions,
  listCoursesPaginated,
  recomputeCourseDisplayFields,
  sectionsForCourse,
} from "@/mock/academic/courses.mock";
import { syncProgramCourseLinks } from "@/mock/academic/programs.mock";
import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type { EntityStatus } from "@/constants/status-badge.constants";
import {
  buildPrerequisiteAdjacency,
  wouldCreatePrerequisiteCycle,
} from "../utils/validate-prerequisite-graph";
import {
  notFoundError,
  validationError,
} from "../utils/academic-errors";
import type {
  Course,
  CourseDetail,
  CourseListQueryParams,
  CreateCourseInput,
  EntityStatusAction,
  UpdateCourseInput,
} from "../types/academic.types";
import type { ICourseService } from "./course.service";

function assertPrerequisitesValid(
  courseId: string | undefined,
  prerequisiteIds: string[],
): void {
  const store = getCoursesStore();
  for (const prereqId of prerequisiteIds) {
    if (!store.some((c) => c.id === prereqId)) {
      throw validationError({
        prerequisiteIds: ["One or more prerequisites are invalid"],
      });
    }
  }
  const adjacency = buildPrerequisiteAdjacency(store);
  if (wouldCreatePrerequisiteCycle(courseId, prerequisiteIds, adjacency)) {
    throw validationError({
      prerequisiteIds: ["Prerequisites would create a circular dependency"],
    });
  }
}

export class MockCourseService extends MockServiceBase implements ICourseService {
  async listOptions(excludeId?: string) {
    await this.delay(100);
    return { data: listCourseOptions(excludeId) };
  }

  async list(
    params: CourseListQueryParams,
  ): Promise<PaginatedResponse<Course>> {
    await this.delay();
    return listCoursesPaginated(params);
  }

  async getById(id: string): Promise<ApiResponse<Course>> {
    await this.delay();
    recomputeCourseDisplayFields();
    const course = findCourseById(id);
    if (!course) throw notFoundError("Course not found");
    return { data: { ...course } };
  }

  async getDetail(id: string): Promise<ApiResponse<CourseDetail>> {
    await this.delay();
    recomputeCourseDisplayFields();
    const course = findCourseById(id);
    if (!course) throw notFoundError("Course not found");
    return {
      data: {
        course: { ...course },
        sections: sectionsForCourse(id).map((s) => ({ ...s })),
      },
    };
  }

  async create(input: CreateCourseInput): Promise<ApiResponse<Course>> {
    await this.delay(350);
    if (!findDepartmentById(input.departmentId)) {
      throw validationError({ departmentId: ["Department not found"] });
    }
    if (courseCodeExists(input.code)) {
      throw validationError({ code: ["Course code is already in use"] });
    }
    assertPrerequisitesValid(undefined, input.prerequisiteIds);
    const dept = findDepartmentById(input.departmentId);
    const course: Course = {
      id: generateCourseId(),
      code: input.code.trim().toUpperCase(),
      name: input.name.trim(),
      creditHours: input.creditHours,
      departmentId: input.departmentId,
      departmentName: dept?.name ?? input.departmentId,
      description: input.description.trim(),
      prerequisiteIds: [...input.prerequisiteIds],
      status: input.status,
      sectionCount: 0,
      enrollmentCount: 0,
      programIds: [],
      createdAt: new Date().toISOString(),
    };
    getCoursesStore().unshift(course);
    recomputeCourseDisplayFields();
    syncProgramCourseLinks();
    return { data: course, message: "Course created" };
  }

  async update(
    id: string,
    input: UpdateCourseInput,
  ): Promise<ApiResponse<Course>> {
    await this.delay(350);
    const index = getCoursesStore().findIndex((c) => c.id === id);
    if (index < 0) throw notFoundError("Course not found");
    if (!findDepartmentById(input.departmentId)) {
      throw validationError({ departmentId: ["Department not found"] });
    }
    if (courseCodeExists(input.code, id)) {
      throw validationError({ code: ["Course code is already in use"] });
    }
    const filteredPrereqs = input.prerequisiteIds.filter((p) => p !== id);
    assertPrerequisitesValid(id, filteredPrereqs);
    const dept = findDepartmentById(input.departmentId);
    const existing = getCoursesStore()[index];
    const updated: Course = {
      ...existing,
      code: input.code.trim().toUpperCase(),
      name: input.name.trim(),
      creditHours: input.creditHours,
      departmentId: input.departmentId,
      departmentName: dept?.name ?? input.departmentId,
      description: input.description.trim(),
      prerequisiteIds: filteredPrereqs,
      status: input.status,
    };
    getCoursesStore()[index] = updated;
    recomputeCourseDisplayFields();
    syncProgramCourseLinks();
    return { data: updated, message: "Course updated" };
  }

  async changeStatus(
    id: string,
    action: EntityStatusAction,
  ): Promise<ApiResponse<Course>> {
    await this.delay(300);
    const index = getCoursesStore().findIndex((c) => c.id === id);
    if (index < 0) throw notFoundError("Course not found");
    const status: EntityStatus =
      action === "activate" ? "active" : "inactive";
    getCoursesStore()[index] = {
      ...getCoursesStore()[index],
      status,
    };
    recomputeCourseDisplayFields();
    return { data: getCoursesStore()[index], message: "Course status updated" };
  }

  async delete(id: string): Promise<ApiResponse<null>> {
    await this.delay(300);
    const dependents = getCoursesStore().filter((c) =>
      c.prerequisiteIds.includes(id),
    );
    if (dependents.length > 0) {
      throw validationError({
        code: ["Cannot delete a course required as a prerequisite"],
      });
    }
    const index = getCoursesStore().findIndex((c) => c.id === id);
    if (index < 0) throw notFoundError("Course not found");
    getCoursesStore().splice(index, 1);
    syncProgramCourseLinks();
    return { data: null, message: "Course deleted" };
  }
}

export const mockCourseService = new MockCourseService();
