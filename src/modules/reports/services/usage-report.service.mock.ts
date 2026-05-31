import { MockServiceBase } from "@/lib/mock-service-base";
import { buildUsageReport } from "@/mock/reports/usage-report.mock";
import type { ApiResponse } from "@/types/api.types";
import type { UsageReportData, UsageReportParams } from "../types/usage-report.types";
import type { IUsageReportService } from "./usage-report.service";

export class MockUsageReportService
  extends MockServiceBase
  implements IUsageReportService
{
  async getReport(
    params: UsageReportParams,
  ): Promise<ApiResponse<UsageReportData>> {
    await this.delay();
    return { data: buildUsageReport(params) };
  }
}

export const mockUsageReportService = new MockUsageReportService();
