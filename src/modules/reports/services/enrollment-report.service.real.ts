import type { ApiResponse } from "@/types/api.types";
import type {
  EnrollmentExportResult,
  EnrollmentFilterOptions,
  EnrollmentReportData,
  EnrollmentReportFilters,
} from "../types/enrollment-report.types";
import type { IEnrollmentReportService } from "./enrollment-report.service";

export class RealEnrollmentReportService implements IEnrollmentReportService {
  async getFilterOptions(): Promise<ApiResponse<EnrollmentFilterOptions>> {
    throw new Error("Enrollment report API not integrated");
  }

  async getReport(
    _params: EnrollmentReportFilters,
  ): Promise<ApiResponse<EnrollmentReportData>> {
    throw new Error("Enrollment report API not integrated");
  }

  async exportCsv(
    _params: EnrollmentReportFilters,
  ): Promise<ApiResponse<EnrollmentExportResult>> {
    throw new Error("Enrollment report API not integrated");
  }
}

export const realEnrollmentReportService = new RealEnrollmentReportService();
