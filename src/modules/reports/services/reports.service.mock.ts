import { MockServiceBase } from "@/lib/mock-service-base";
import {
  buildReportCatalog,
  findReportDefinitionById,
  updateReportLastGenerated,
} from "@/mock/reports/report-catalog.mock";
import {
  completeReportJob,
  createReportJob,
  getReportJobStatus,
} from "@/mock/reports/report-jobs.store";
import {
  findRecentReportById,
  generateRecentId,
  listRecentReports,
  prependRecentReport,
} from "@/mock/reports/recent-reports.store";
import type { ApiResponse } from "@/types/api.types";
import type { AppError } from "@/types/error.types";
import { downloadGeneratedReportCsv } from "../utils/export-reports-csv";
import type {
  GeneratedReport,
  ReportCatalog,
  ReportDownloadResult,
  ReportGenerationStart,
  ReportJob,
} from "../types/reports.types";
import type { IReportsService } from "./reports.service";

function notFound(message: string): AppError {
  return { code: "NOT_FOUND", message };
}

export class MockReportsService extends MockServiceBase implements IReportsService {
  async getCatalog(): Promise<ApiResponse<ReportCatalog>> {
    await this.delay();
    return { data: buildReportCatalog() };
  }

  async getRecent(): Promise<ApiResponse<GeneratedReport[]>> {
    await this.delay();
    return { data: listRecentReports() };
  }

  async startGeneration(
    reportId: string,
  ): Promise<ApiResponse<ReportGenerationStart>> {
    await this.delay(80);
    const definition = findReportDefinitionById(reportId);
    if (!definition) throw notFound("Report not found");
    const job = createReportJob(reportId, definition.name);
    return { data: { jobId: job.id } };
  }

  async getJobStatus(jobId: string): Promise<ApiResponse<ReportJob>> {
    await this.delay(80);
    const job = getReportJobStatus(jobId);
    if (!job) throw notFound("Report job not found");
    if (job.status === "completed" && !job.generatedReportId) {
      const definition = findReportDefinitionById(job.reportId);
      const generatedAt = new Date().toISOString();
      const generatedId = generateRecentId();
      const filename = `usns-${definition?.slug ?? "report"}-${generatedAt.slice(0, 10)}.csv`;
      const entry: GeneratedReport = {
        id: generatedId,
        reportId: job.reportId,
        name: job.reportName,
        generatedAt,
        filename,
        status: "ready",
      };
      prependRecentReport(entry);
      updateReportLastGenerated(job.reportId, generatedAt);
      completeReportJob(jobId, generatedId);
      const updated = getReportJobStatus(jobId);
      if (!updated) throw notFound("Report job not found");
      return { data: updated };
    }
    return { data: job };
  }

  async downloadGenerated(id: string): Promise<ApiResponse<ReportDownloadResult>> {
    await this.delay();
    const report = findRecentReportById(id);
    if (!report) throw notFound("Generated report not found");
    downloadGeneratedReportCsv(report);
    return {
      data: {
        filename: report.filename,
        rowCount: 3,
      },
    };
  }
}

export const mockReportsService = new MockReportsService();
