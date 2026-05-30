import { MockServiceBase } from "@/lib/mock-service-base";
import {
  findAcademicYearById,
  findSemesterById,
  generateAcademicYearId,
  generateSemesterId,
  getAcademicYearsStore,
  getSemestersStore,
  recomputeYearMeta,
  semestersByYearId,
  setActiveAcademicYear,
  setSemesterStatus,
  yearHasBlockingLinks,
} from "@/mock/academic/academic-years.mock";
import type { ApiResponse } from "@/types/api.types";
import {
  forbiddenError,
  notFoundError,
  validationError,
} from "../utils/academic-errors";
import type {
  AcademicYear,
  AcademicYearDetail,
  CreateAcademicYearInput,
  CreateSemesterInput,
  Semester,
  UpdateAcademicYearInput,
  UpdateSemesterInput,
} from "../types/academic.types";
import type { IAcademicCalendarService } from "./calendar.service";

function parseDate(value: string): Date {
  return new Date(`${value}T00:00:00.000Z`);
}

function assertDateRange(startDate: string, endDate: string): void {
  if (parseDate(endDate) <= parseDate(startDate)) {
    throw validationError({
      endDate: ["End date must be after start date"],
    });
  }
}

export class MockAcademicCalendarService
  extends MockServiceBase
  implements IAcademicCalendarService
{
  async listYears(): Promise<ApiResponse<AcademicYear[]>> {
    await this.delay();
    recomputeYearMeta();
    return { data: getAcademicYearsStore().map((y) => ({ ...y })) };
  }

  async getYear(id: string): Promise<ApiResponse<AcademicYearDetail>> {
    await this.delay();
    recomputeYearMeta();
    const year = findAcademicYearById(id);
    if (!year) throw notFoundError("Academic year not found");
    return {
      data: {
        year: { ...year },
        semesters: semestersByYearId(id).map((s) => ({ ...s })),
      },
    };
  }

  async createYear(
    input: CreateAcademicYearInput,
  ): Promise<ApiResponse<AcademicYear>> {
    await this.delay(350);
    assertDateRange(input.startDate, input.endDate);
    const year: AcademicYear = {
      id: generateAcademicYearId(),
      label: input.label.trim(),
      startDate: input.startDate,
      endDate: input.endDate,
      isActive: false,
      semesterCount: 0,
      hasLinkedData: false,
      createdAt: new Date().toISOString(),
    };
    getAcademicYearsStore().unshift(year);
    recomputeYearMeta();
    return { data: year, message: "Academic year created" };
  }

  async updateYear(
    id: string,
    input: UpdateAcademicYearInput,
  ): Promise<ApiResponse<AcademicYear>> {
    await this.delay(350);
    const index = getAcademicYearsStore().findIndex((y) => y.id === id);
    if (index < 0) throw notFoundError("Academic year not found");
    assertDateRange(input.startDate, input.endDate);
    const updated: AcademicYear = {
      ...getAcademicYearsStore()[index],
      label: input.label.trim(),
      startDate: input.startDate,
      endDate: input.endDate,
    };
    getAcademicYearsStore()[index] = updated;
    recomputeYearMeta();
    return { data: updated, message: "Academic year updated" };
  }

  async deleteYear(id: string): Promise<ApiResponse<null>> {
    await this.delay(300);
    if (yearHasBlockingLinks(id)) {
      throw forbiddenError(
        "Cannot delete an academic year with linked semesters or registrations.",
      );
    }
    const index = getAcademicYearsStore().findIndex((y) => y.id === id);
    if (index < 0) throw notFoundError("Academic year not found");
    getAcademicYearsStore().splice(index, 1);
    const remaining = getSemestersStore().filter(
      (s) => s.academicYearId !== id,
    );
    getSemestersStore().length = 0;
    getSemestersStore().push(...remaining);
    recomputeYearMeta();
    return { data: null, message: "Academic year deleted" };
  }

  async createSemester(
    input: CreateSemesterInput,
  ): Promise<ApiResponse<Semester>> {
    await this.delay(350);
    if (!findAcademicYearById(input.academicYearId)) {
      throw validationError({ academicYearId: ["Academic year not found"] });
    }
    assertDateRange(input.startDate, input.endDate);
    const semester: Semester = {
      id: generateSemesterId(),
      academicYearId: input.academicYearId,
      name: input.name.trim(),
      type: input.type,
      startDate: input.startDate,
      endDate: input.endDate,
      status: "draft",
      activeRegistrationCount: 0,
    };
    getSemestersStore().push(semester);
    recomputeYearMeta();
    return { data: semester, message: "Semester created" };
  }

  async updateSemester(
    yearId: string,
    semesterId: string,
    input: UpdateSemesterInput,
  ): Promise<ApiResponse<Semester>> {
    await this.delay(350);
    const semester = findSemesterById(semesterId);
    if (!semester || semester.academicYearId !== yearId) {
      throw notFoundError("Semester not found");
    }
    assertDateRange(input.startDate, input.endDate);
    const index = getSemestersStore().findIndex((s) => s.id === semesterId);
    const updated: Semester = {
      ...getSemestersStore()[index],
      name: input.name.trim(),
      type: input.type,
      startDate: input.startDate,
      endDate: input.endDate,
    };
    getSemestersStore()[index] = updated;
    recomputeYearMeta();
    return { data: updated, message: "Semester updated" };
  }

  async activateSemester(
    yearId: string,
    semesterId: string,
  ): Promise<ApiResponse<Semester>> {
    await this.delay(300);
    const semester = findSemesterById(semesterId);
    if (!semester || semester.academicYearId !== yearId) {
      throw notFoundError("Semester not found");
    }
    const updated = setSemesterStatus(semesterId, "active");
    if (!updated) throw notFoundError("Semester not found");
    setActiveAcademicYear(yearId);
    return { data: updated, message: "Semester activated" };
  }

  async closeSemester(
    yearId: string,
    semesterId: string,
  ): Promise<ApiResponse<Semester>> {
    await this.delay(300);
    const semester = findSemesterById(semesterId);
    if (!semester || semester.academicYearId !== yearId) {
      throw notFoundError("Semester not found");
    }
    if (semester.activeRegistrationCount > 0) {
      throw forbiddenError(
        "Cannot close a semester with active registrations.",
      );
    }
    const updated = setSemesterStatus(semesterId, "closed");
    if (!updated) throw notFoundError("Semester not found");
    return { data: updated, message: "Semester closed" };
  }

  async deleteSemester(
    yearId: string,
    semesterId: string,
  ): Promise<ApiResponse<null>> {
    await this.delay(300);
    const semester = findSemesterById(semesterId);
    if (!semester || semester.academicYearId !== yearId) {
      throw notFoundError("Semester not found");
    }
    if (semester.activeRegistrationCount > 0) {
      throw forbiddenError(
        "Cannot delete a semester with active registrations.",
      );
    }
    const index = getSemestersStore().findIndex((s) => s.id === semesterId);
    getSemestersStore().splice(index, 1);
    recomputeYearMeta();
    return { data: null, message: "Semester deleted" };
  }
}

export const mockAcademicCalendarService = new MockAcademicCalendarService();
