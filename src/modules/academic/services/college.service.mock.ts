import { MockServiceBase } from "@/lib/mock-service-base";
import { departmentsByCollegeId } from "@/mock/academic/departments.mock";
import {
  collegeCodeExists,
  findCollegeById,
  generateCollegeId,
  getCollegesStore,
  listCollegesPaginated,
  recomputeCollegeCounts,
  setCollegeStatus,
} from "@/mock/academic/colleges.mock";
import { findUserNameById } from "@/mock/academic/user-labels.mock";
import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type { EntityStatus } from "@/constants/status-badge.constants";
import {
  forbiddenError,
  notFoundError,
  validationError,
} from "../utils/academic-errors";
import type {
  College,
  CollegeDetail,
  CollegeListQueryParams,
  CreateCollegeInput,
  EntityStatusAction,
  UpdateCollegeInput,
} from "../types/academic.types";
import type { ICollegeService } from "./college.service";

export class MockCollegeService extends MockServiceBase implements ICollegeService {
  async list(
    params: CollegeListQueryParams,
  ): Promise<PaginatedResponse<College>> {
    await this.delay();
    return listCollegesPaginated(params);
  }

  async getById(id: string): Promise<ApiResponse<College>> {
    await this.delay();
    recomputeCollegeCounts();
    const college = findCollegeById(id);
    if (!college) throw notFoundError("College not found");
    return { data: { ...college } };
  }

  async getDetail(id: string): Promise<ApiResponse<CollegeDetail>> {
    await this.delay();
    recomputeCollegeCounts();
    const college = findCollegeById(id);
    if (!college) throw notFoundError("College not found");
    return {
      data: {
        college: { ...college },
        departments: departmentsByCollegeId(id).map((dept) => ({ ...dept })),
      },
    };
  }

  async create(input: CreateCollegeInput): Promise<ApiResponse<College>> {
    await this.delay(350);
    if (collegeCodeExists(input.code)) {
      throw validationError({ code: ["College code is already in use"] });
    }
    const college: College = {
      id: generateCollegeId(),
      code: input.code.trim().toUpperCase(),
      name: input.name.trim(),
      description: input.description.trim(),
      deanUserId: input.deanUserId,
      deanName: findUserNameById(input.deanUserId),
      status: input.status,
      departmentCount: 0,
      studentCount: 0,
      createdAt: new Date(),
    };
    getCollegesStore().unshift(college);
    recomputeCollegeCounts();
    return { data: college, message: "College created" };
  }

  async update(
    id: string,
    input: UpdateCollegeInput,
  ): Promise<ApiResponse<College>> {
    await this.delay(350);
    const index = getCollegesStore().findIndex((c) => c.id === id);
    if (index < 0) throw notFoundError("College not found");
    if (collegeCodeExists(input.code, id)) {
      throw validationError({ code: ["College code is already in use"] });
    }
    const existing = getCollegesStore()[index];
    const updated: College = {
      ...existing,
      code: input.code.trim().toUpperCase(),
      name: input.name.trim(),
      description: input.description.trim(),
      deanUserId: input.deanUserId,
      deanName: findUserNameById(input.deanUserId),
      status: input.status,
    };
    getCollegesStore()[index] = updated;
    recomputeCollegeCounts();
    return { data: updated, message: "College updated" };
  }

  async changeStatus(
    id: string,
    action: EntityStatusAction,
    cascadeDepartments = false,
  ): Promise<ApiResponse<College>> {
    await this.delay(300);
    const status: EntityStatus =
      action === "activate" ? "active" : "inactive";
    const updated = setCollegeStatus(id, status, cascadeDepartments);
    if (!updated) throw notFoundError("College not found");
    return { data: updated, message: "College status updated" };
  }

  async delete(id: string): Promise<ApiResponse<null>> {
    await this.delay(300);
    const linked = departmentsByCollegeId(id);
    if (linked.length > 0) {
      throw forbiddenError(
        "Cannot delete a college with linked departments. Deactivate instead.",
      );
    }
    const index = getCollegesStore().findIndex((c) => c.id === id);
    if (index < 0) throw notFoundError("College not found");
    getCollegesStore().splice(index, 1);
    return { data: null, message: "College deleted" };
  }
}

export const mockCollegeService = new MockCollegeService();
