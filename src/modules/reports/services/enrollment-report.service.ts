import type { ApiResponse } from "@/types/api.types";
import type {
  EnrollmentExportResult,
  EnrollmentFilterOptions,
  EnrollmentReportData,
  EnrollmentReportFilters,
} from "../types/enrollment-report.types";

export interface IEnrollmentReportService {
  getFilterOptions(): Promise<ApiResponse<EnrollmentFilterOptions>>;
  getReport(
    params: EnrollmentReportFilters,
  ): Promise<ApiResponse<EnrollmentReportData>>;
  exportCsv(
    params: EnrollmentReportFilters,
  ): Promise<ApiResponse<EnrollmentExportResult>>;
}
