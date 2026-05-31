import type { ApiResponse } from "@/types/api.types";
import type {
  GeneratedReport,
  ReportCatalog,
  ReportDownloadResult,
  ReportGenerationStart,
  ReportJob,
} from "../types/reports.types";

export interface IReportsService {
  getCatalog(): Promise<ApiResponse<ReportCatalog>>;
  getRecent(): Promise<ApiResponse<GeneratedReport[]>>;
  startGeneration(reportId: string): Promise<ApiResponse<ReportGenerationStart>>;
  getJobStatus(jobId: string): Promise<ApiResponse<ReportJob>>;
  downloadGenerated(id: string): Promise<ApiResponse<ReportDownloadResult>>;
}
