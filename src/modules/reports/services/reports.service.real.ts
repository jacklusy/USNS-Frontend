import type { ApiResponse } from "@/types/api.types";
import type {
  GeneratedReport,
  ReportCatalog,
  ReportDownloadResult,
  ReportGenerationStart,
  ReportJob,
} from "../types/reports.types";
import type { IReportsService } from "./reports.service";

export class RealReportsService implements IReportsService {
  async getCatalog(): Promise<ApiResponse<ReportCatalog>> {
    throw new Error("Reports API not integrated");
  }

  async getRecent(): Promise<ApiResponse<GeneratedReport[]>> {
    throw new Error("Reports API not integrated");
  }

  async startGeneration(
    _reportId: string,
  ): Promise<ApiResponse<ReportGenerationStart>> {
    throw new Error("Reports API not integrated");
  }

  async getJobStatus(_jobId: string): Promise<ApiResponse<ReportJob>> {
    throw new Error("Reports API not integrated");
  }

  async downloadGenerated(
    _id: string,
  ): Promise<ApiResponse<ReportDownloadResult>> {
    throw new Error("Reports API not integrated");
  }
}

export const realReportsService = new RealReportsService();
