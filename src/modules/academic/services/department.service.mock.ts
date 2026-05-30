import { MockServiceBase } from "@/lib/mock-service-base";
import { recomputeCollegeCounts } from "@/mock/academic/colleges.mock";
import {
  coursesByDepartmentId,
} from "@/mock/academic/courses.mock";
import {
  departmentCodeExists,
  findDepartmentById,
  generateDepartmentId,
  getDepartmentsStore,
  listDepartmentOptions,
  listDepartmentsPaginated,
  recomputeDepartmentCounts,
  setDepartmentStatus,
} from "@/mock/academic/departments.mock";
import { findUserNameById } from "@/mock/academic/user-labels.mock";
import { findCollegeById } from "@/mock/academic/colleges.mock";
import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type { EntityStatus } from "@/constants/status-badge.constants";
import {
  forbiddenError,
  notFoundError,
  validationError,
} from "../utils/academic-errors";
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

export class MockDepartmentService
  extends MockServiceBase
  implements IDepartmentService
{
  async list(
    params: DepartmentListQueryParams,
  ): Promise<PaginatedResponse<Department>> {
    await this.delay();
    return listDepartmentsPaginated(params);
  }

  async listOptions(): Promise<ApiResponse<DepartmentOption[]>> {
    await this.delay(100);
    return { data: listDepartmentOptions() };
  }

  async getById(id: string): Promise<ApiResponse<Department>> {
    await this.delay();
    recomputeDepartmentCounts();
    const dept = findDepartmentById(id);
    if (!dept) throw notFoundError("Department not found");
    return { data: { ...dept } };
  }

  async getDetail(id: string): Promise<ApiResponse<DepartmentDetail>> {
    await this.delay();
    recomputeDepartmentCounts();
    const dept = findDepartmentById(id);
    if (!dept) throw notFoundError("Department not found");
    return {
      data: {
        department: { ...dept },
        courses: coursesByDepartmentId(id).map((c) => ({ ...c })),
      },
    };
  }

  async create(
    input: CreateDepartmentInput,
  ): Promise<ApiResponse<Department>> {
    await this.delay(350);
    if (!findCollegeById(input.collegeId)) {
      throw validationError({ collegeId: ["College not found"] });
    }
    if (departmentCodeExists(input.code)) {
      throw validationError({ code: ["Department code is already in use"] });
    }
    const college = findCollegeById(input.collegeId);
    const dept: Department = {
      id: generateDepartmentId(),
      code: input.code.trim().toUpperCase(),
      name: input.name.trim(),
      collegeId: input.collegeId,
      collegeName: college?.name ?? input.collegeId,
      headUserId: input.headUserId,
      headName: findUserNameById(input.headUserId),
      description: input.description.trim(),
      status: input.status,
      courseCount: 0,
      staffCount: 0,
      createdAt: new Date().toISOString(),
    };
    getDepartmentsStore().unshift(dept);
    recomputeDepartmentCounts();
    recomputeCollegeCounts();
    return { data: dept, message: "Department created" };
  }

  async update(
    id: string,
    input: UpdateDepartmentInput,
  ): Promise<ApiResponse<Department>> {
    await this.delay(350);
    const index = getDepartmentsStore().findIndex((d) => d.id === id);
    if (index < 0) throw notFoundError("Department not found");
    if (!findCollegeById(input.collegeId)) {
      throw validationError({ collegeId: ["College not found"] });
    }
    if (departmentCodeExists(input.code, id)) {
      throw validationError({ code: ["Department code is already in use"] });
    }
    const college = findCollegeById(input.collegeId);
    const existing = getDepartmentsStore()[index];
    const updated: Department = {
      ...existing,
      code: input.code.trim().toUpperCase(),
      name: input.name.trim(),
      collegeId: input.collegeId,
      collegeName: college?.name ?? input.collegeId,
      headUserId: input.headUserId,
      headName: findUserNameById(input.headUserId),
      description: input.description.trim(),
      status: input.status,
    };
    getDepartmentsStore()[index] = updated;
    recomputeDepartmentCounts();
    recomputeCollegeCounts();
    return { data: updated, message: "Department updated" };
  }

  async changeStatus(
    id: string,
    action: EntityStatusAction,
  ): Promise<ApiResponse<Department>> {
    await this.delay(300);
    const status: EntityStatus =
      action === "activate" ? "active" : "inactive";
    const updated = setDepartmentStatus(id, status);
    if (!updated) throw notFoundError("Department not found");
    recomputeCollegeCounts();
    return { data: updated, message: "Department status updated" };
  }

  async delete(id: string): Promise<ApiResponse<null>> {
    await this.delay(300);
    const courses = coursesByDepartmentId(id);
    if (courses.length > 0) {
      throw forbiddenError(
        "Cannot delete a department with linked courses.",
      );
    }
    const index = getDepartmentsStore().findIndex((d) => d.id === id);
    if (index < 0) throw notFoundError("Department not found");
    getDepartmentsStore().splice(index, 1);
    recomputeCollegeCounts();
    return { data: null, message: "Department deleted" };
  }
}

export const mockDepartmentService = new MockDepartmentService();
