import type { ApiResponse } from "@/types/api.types";
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

export class RealAcademicCalendarService implements IAcademicCalendarService {
  async listYears(): Promise<ApiResponse<AcademicYear[]>> {
    throw new Error("Academic calendar API not integrated");
  }

  async getYear(_id: string): Promise<ApiResponse<AcademicYearDetail>> {
    throw new Error("Academic calendar API not integrated");
  }

  async createYear(
    _input: CreateAcademicYearInput,
  ): Promise<ApiResponse<AcademicYear>> {
    throw new Error("Academic calendar API not integrated");
  }

  async updateYear(
    _id: string,
    _input: UpdateAcademicYearInput,
  ): Promise<ApiResponse<AcademicYear>> {
    throw new Error("Academic calendar API not integrated");
  }

  async deleteYear(_id: string): Promise<ApiResponse<null>> {
    throw new Error("Academic calendar API not integrated");
  }

  async createSemester(
    _input: CreateSemesterInput,
  ): Promise<ApiResponse<Semester>> {
    throw new Error("Academic calendar API not integrated");
  }

  async updateSemester(
    _yearId: string,
    _semesterId: string,
    _input: UpdateSemesterInput,
  ): Promise<ApiResponse<Semester>> {
    throw new Error("Academic calendar API not integrated");
  }

  async activateSemester(
    _yearId: string,
    _semesterId: string,
  ): Promise<ApiResponse<Semester>> {
    throw new Error("Academic calendar API not integrated");
  }

  async closeSemester(
    _yearId: string,
    _semesterId: string,
  ): Promise<ApiResponse<Semester>> {
    throw new Error("Academic calendar API not integrated");
  }

  async deleteSemester(
    _yearId: string,
    _semesterId: string,
  ): Promise<ApiResponse<null>> {
    throw new Error("Academic calendar API not integrated");
  }
}

export const realAcademicCalendarService = new RealAcademicCalendarService();
