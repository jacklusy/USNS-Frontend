import { MockServiceBase } from "@/lib/mock-service-base";
import { coursesByProgramId } from "@/mock/academic/courses.mock";
import { findDepartmentById } from "@/mock/academic/departments.mock";
import {
  findProgramById,
  generateProgramId,
  getProgramsStore,
  listProgramsPaginated,
  programCodeExists,
  syncProgramCourseLinks,
} from "@/mock/academic/programs.mock";
import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type { EntityStatus } from "@/constants/status-badge.constants";
import { notFoundError, validationError } from "../utils/academic-errors";
import type {
  CreateProgramInput,
  EntityStatusAction,
  Program,
  ProgramDetail,
  ProgramListQueryParams,
  UpdateProgramInput,
} from "../types/academic.types";
import type { IProgramService } from "./program.service";

export class MockProgramService extends MockServiceBase implements IProgramService {
  async list(
    params: ProgramListQueryParams,
  ): Promise<PaginatedResponse<Program>> {
    await this.delay();
    return listProgramsPaginated(params);
  }

  async getById(id: string): Promise<ApiResponse<Program>> {
    await this.delay();
    syncProgramCourseLinks();
    const program = findProgramById(id);
    if (!program) throw notFoundError("Program not found");
    return { data: { ...program } };
  }

  async getDetail(id: string): Promise<ApiResponse<ProgramDetail>> {
    await this.delay();
    syncProgramCourseLinks();
    const program = findProgramById(id);
    if (!program) throw notFoundError("Program not found");
    return {
      data: {
        program: { ...program },
        courses: coursesByProgramId(id).map((c) => ({ ...c })),
      },
    };
  }

  async create(input: CreateProgramInput): Promise<ApiResponse<Program>> {
    await this.delay(350);
    if (!findDepartmentById(input.departmentId)) {
      throw validationError({ departmentId: ["Department not found"] });
    }
    if (programCodeExists(input.code)) {
      throw validationError({ code: ["Program code is already in use"] });
    }
    const dept = findDepartmentById(input.departmentId);
    const program: Program = {
      id: generateProgramId(),
      code: input.code.trim().toUpperCase(),
      name: input.name.trim(),
      type: input.type,
      departmentId: input.departmentId,
      departmentName: dept?.name ?? input.departmentId,
      durationYears: input.durationYears,
      description: input.description.trim(),
      status: input.status,
      enrolledCount: 0,
      courseCount: input.courseIds.length,
      courseIds: [...input.courseIds],
      createdAt: new Date().toISOString(),
    };
    getProgramsStore().unshift(program);
    syncProgramCourseLinks();
    return { data: program, message: "Program created" };
  }

  async update(
    id: string,
    input: UpdateProgramInput,
  ): Promise<ApiResponse<Program>> {
    await this.delay(350);
    const index = getProgramsStore().findIndex((p) => p.id === id);
    if (index < 0) throw notFoundError("Program not found");
    if (!findDepartmentById(input.departmentId)) {
      throw validationError({ departmentId: ["Department not found"] });
    }
    if (programCodeExists(input.code, id)) {
      throw validationError({ code: ["Program code is already in use"] });
    }
    const dept = findDepartmentById(input.departmentId);
    const updated: Program = {
      ...getProgramsStore()[index],
      code: input.code.trim().toUpperCase(),
      name: input.name.trim(),
      type: input.type,
      departmentId: input.departmentId,
      departmentName: dept?.name ?? input.departmentId,
      durationYears: input.durationYears,
      description: input.description.trim(),
      status: input.status,
      courseIds: [...input.courseIds],
      courseCount: input.courseIds.length,
    };
    getProgramsStore()[index] = updated;
    syncProgramCourseLinks();
    return { data: updated, message: "Program updated" };
  }

  async changeStatus(
    id: string,
    action: EntityStatusAction,
  ): Promise<ApiResponse<Program>> {
    await this.delay(300);
    const index = getProgramsStore().findIndex((p) => p.id === id);
    if (index < 0) throw notFoundError("Program not found");
    const status: EntityStatus =
      action === "activate" ? "active" : "inactive";
    getProgramsStore()[index] = {
      ...getProgramsStore()[index],
      status,
    };
    syncProgramCourseLinks();
    return {
      data: getProgramsStore()[index],
      message: "Program status updated",
    };
  }

  async delete(id: string): Promise<ApiResponse<null>> {
    await this.delay(300);
    const program = findProgramById(id);
    if (!program) throw notFoundError("Program not found");
    if (program.enrolledCount > 0) {
      throw validationError({
        code: ["Cannot delete a program with enrolled students"],
      });
    }
    const index = getProgramsStore().findIndex((p) => p.id === id);
    getProgramsStore().splice(index, 1);
    syncProgramCourseLinks();
    return { data: null, message: "Program deleted" };
  }
}

export const mockProgramService = new MockProgramService();
