import type { ApiResponse } from "@/types/api.types";
import type { UsageReportData, UsageReportParams } from "../types/usage-report.types";

export interface IUsageReportService {
  getReport(params: UsageReportParams): Promise<ApiResponse<UsageReportData>>;
}
