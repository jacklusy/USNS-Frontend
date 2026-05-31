import type { ApiResponse } from "@/types/api.types";
import type { UsageReportData, UsageReportParams } from "../types/usage-report.types";
import type { IUsageReportService } from "./usage-report.service";

export class RealUsageReportService implements IUsageReportService {
  async getReport(
    _params: UsageReportParams,
  ): Promise<ApiResponse<UsageReportData>> {
    throw new Error("Usage report API not integrated");
  }
}

export const realUsageReportService = new RealUsageReportService();
