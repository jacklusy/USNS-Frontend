import { REPORTS_COPY } from "@/modules/reports/constants/reports-management.constants";
import { MockServiceBase } from "@/lib/mock-service-base";
import {
  buildEnrollmentFilterOptions,
  buildEnrollmentReport,
} from "@/mock/reports/enrollment-report.mock";
import type { ApiResponse } from "@/types/api.types";
import { downloadEnrollmentReportCsv } from "../utils/export-reports-csv";
import type {
  EnrollmentExportResult,
  EnrollmentFilterOptions,
  EnrollmentReportData,
  EnrollmentReportFilters,
} from "../types/enrollment-report.types";
import type { IEnrollmentReportService } from "./enrollment-report.service";

export class MockEnrollmentReportService
  extends MockServiceBase
  implements IEnrollmentReportService
{
  async getFilterOptions(): Promise<ApiResponse<EnrollmentFilterOptions>> {
    await this.delay();
    return { data: buildEnrollmentFilterOptions() };
  }

  async getReport(
    params: EnrollmentReportFilters,
  ): Promise<ApiResponse<EnrollmentReportData>> {
    await this.delay();
    return { data: buildEnrollmentReport(params) };
  }

  async exportCsv(
    params: EnrollmentReportFilters,
  ): Promise<ApiResponse<EnrollmentExportResult>> {
    await this.delay();
    const report = buildEnrollmentReport(params);
    const filename = REPORTS_COPY.exportFilenameEnrollment;
    downloadEnrollmentReportCsv(report.departments, filename);
    return {
      data: {
        exported: report.departments.length,
        filename,
      },
    };
  }
}

export const mockEnrollmentReportService = new MockEnrollmentReportService();
