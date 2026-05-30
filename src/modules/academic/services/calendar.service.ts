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

export interface IAcademicCalendarService {
  listYears(): Promise<ApiResponse<AcademicYear[]>>;
  getYear(id: string): Promise<ApiResponse<AcademicYearDetail>>;
  createYear(input: CreateAcademicYearInput): Promise<ApiResponse<AcademicYear>>;
  updateYear(
    id: string,
    input: UpdateAcademicYearInput,
  ): Promise<ApiResponse<AcademicYear>>;
  deleteYear(id: string): Promise<ApiResponse<null>>;
  createSemester(input: CreateSemesterInput): Promise<ApiResponse<Semester>>;
  updateSemester(
    yearId: string,
    semesterId: string,
    input: UpdateSemesterInput,
  ): Promise<ApiResponse<Semester>>;
  activateSemester(
    yearId: string,
    semesterId: string,
  ): Promise<ApiResponse<Semester>>;
  closeSemester(
    yearId: string,
    semesterId: string,
  ): Promise<ApiResponse<Semester>>;
  deleteSemester(
    yearId: string,
    semesterId: string,
  ): Promise<ApiResponse<null>>;
}
