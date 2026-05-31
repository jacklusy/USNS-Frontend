import {
  toGeneratedReport,
  toReportCatalog,
  toReportDownloadResult,
  toReportGenerationStart,
  toReportJob,
} from "@/lib/transformers/reports.transformer";
import { get, post } from "@/services/api-client";
import { ENDPOINTS } from "@/services/endpoints";
import type { ApiResponse } from "@/types/api.types";
import type {
  GeneratedReportDto,
  ReportCatalogDto,
  ReportDownloadResultDto,
  ReportGenerationStartDto,
  ReportJobDto,
} from "@/types/dto/reports.dto";
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
    const data = await get<ReportCatalogDto>(ENDPOINTS.reports.list);
    return { data: toReportCatalog(data) };
  }

  async getRecent(): Promise<ApiResponse<GeneratedReport[]>> {
    const data = await get<GeneratedReportDto[]>(ENDPOINTS.reports.recent);
    return { data: data.map(toGeneratedReport) };
  }

  async startGeneration(
    reportId: string,
  ): Promise<ApiResponse<ReportGenerationStart>> {
    const data = await post<ReportGenerationStartDto, { report_id: string }>(
      ENDPOINTS.reports.generate,
      { report_id: reportId },
    );
    return { data: toReportGenerationStart(data) };
  }

  async getJobStatus(jobId: string): Promise<ApiResponse<ReportJob>> {
    const data = await get<ReportJobDto>(ENDPOINTS.reports.jobById(jobId));
    return { data: toReportJob(data) };
  }

  async downloadGenerated(
    id: string,
  ): Promise<ApiResponse<ReportDownloadResult>> {
    const data = await get<ReportDownloadResultDto>(ENDPOINTS.reports.export(id));
    return { data: toReportDownloadResult(data) };
  }
}

export const realReportsService = new RealReportsService();
