import { MockServiceBase } from "@/lib/mock-service-base";
import { findDepartmentById } from "@/mock/academic/departments.mock";
import { findCourseById } from "@/mock/academic/courses.mock";
import {
  buildFacultyDetail,
  facultyEmployeeIdExists,
  findFacultyById,
  generateFacultyId,
  getFacultyStore,
  listFacultyPaginated,
  recomputeFacultyDisplayFields,
  setFacultyStatus,
} from "@/mock/faculty/faculty.mock";
import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type { EntityStatus } from "@/constants/status-badge.constants";
import {
  notFoundError,
  validationError,
} from "../utils/faculty-errors";
import type {
  CreateFacultyInput,
  EntityStatusAction,
  FacultyDetail,
  FacultyListQueryParams,
  FacultyMember,
  UpdateFacultyInput,
} from "../types/faculty.types";
import type { IFacultyService } from "./faculty.service";

function assertDepartmentValid(departmentId: string): void {
  if (!findDepartmentById(departmentId)) {
    throw validationError({ departmentId: ["Department is invalid"] });
  }
}

function assertCoursesValid(courseIds: string[]): void {
  for (const courseId of courseIds) {
    if (!findCourseById(courseId)) {
      throw validationError({
        assignedCourseIds: ["One or more assigned courses are invalid"],
      });
    }
  }
}

function toFacultyMember(input: CreateFacultyInput, id: string): FacultyMember {
  const dept = findDepartmentById(input.departmentId);
  return {
    id,
    employeeId: input.employeeId.trim().toUpperCase(),
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    fullName: `${input.firstName.trim()} ${input.lastName.trim()}`,
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
    departmentId: input.departmentId,
    departmentName: dept?.name ?? input.departmentId,
    specialization: input.specialization.trim(),
    rank: input.rank,
    status: input.status,
    assignedCourseIds: [...input.assignedCourseIds],
    publicationsCount: input.publicationsCount,
    createdAt: new Date(),
  };
}

export class MockFacultyService
  extends MockServiceBase
  implements IFacultyService
{
  async list(
    params: FacultyListQueryParams,
  ): Promise<PaginatedResponse<FacultyMember>> {
    await this.delay();
    return listFacultyPaginated(params);
  }

  async getById(id: string): Promise<ApiResponse<FacultyMember>> {
    await this.delay();
    recomputeFacultyDisplayFields();
    const member = findFacultyById(id);
    if (!member) throw notFoundError("Faculty member not found");
    return { data: { ...member } };
  }

  async getDetail(id: string): Promise<ApiResponse<FacultyDetail>> {
    await this.delay();
    recomputeFacultyDisplayFields();
    const member = findFacultyById(id);
    if (!member) throw notFoundError("Faculty member not found");
    return { data: buildFacultyDetail(member) };
  }

  async create(input: CreateFacultyInput): Promise<ApiResponse<FacultyMember>> {
    await this.delay(350);
    if (facultyEmployeeIdExists(input.employeeId)) {
      throw validationError({
        employeeId: ["Employee ID is already in use"],
      });
    }
    assertDepartmentValid(input.departmentId);
    assertCoursesValid(input.assignedCourseIds);
    const member = toFacultyMember(input, generateFacultyId());
    getFacultyStore().unshift(member);
    recomputeFacultyDisplayFields();
    return { data: { ...member }, message: "Faculty member created" };
  }

  async update(
    id: string,
    input: UpdateFacultyInput,
  ): Promise<ApiResponse<FacultyMember>> {
    await this.delay(350);
    const index = getFacultyStore().findIndex((m) => m.id === id);
    if (index < 0) throw notFoundError("Faculty member not found");
    if (facultyEmployeeIdExists(input.employeeId, id)) {
      throw validationError({
        employeeId: ["Employee ID is already in use"],
      });
    }
    assertDepartmentValid(input.departmentId);
    assertCoursesValid(input.assignedCourseIds);
    const updated = toFacultyMember(input, id);
    updated.createdAt = getFacultyStore()[index].createdAt;
    getFacultyStore()[index] = updated;
    recomputeFacultyDisplayFields();
    return { data: { ...updated }, message: "Faculty member updated" };
  }

  async delete(id: string): Promise<ApiResponse<null>> {
    await this.delay(300);
    const index = getFacultyStore().findIndex((m) => m.id === id);
    if (index < 0) throw notFoundError("Faculty member not found");
    getFacultyStore().splice(index, 1);
    return { data: null, message: "Faculty member deleted" };
  }

  async changeStatus(
    id: string,
    action: EntityStatusAction,
  ): Promise<ApiResponse<FacultyMember>> {
    await this.delay(300);
    const status: EntityStatus =
      action === "activate" ? "active" : "inactive";
    const member = setFacultyStatus(id, status);
    if (!member) throw notFoundError("Faculty member not found");
    return { data: { ...member }, message: "Status updated" };
  }
}

export const mockFacultyService = new MockFacultyService();
