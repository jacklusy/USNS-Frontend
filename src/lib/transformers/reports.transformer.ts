import { parseApiDate, parseOptionalApiDate, toApiTimestamp } from "@/lib/transformers/common";
import type {
  GeneratedReport,
  ReportCatalog,
  ReportCatalogGroup,
  ReportDefinition,
  ReportDownloadResult,
  ReportGenerationStart,
  ReportJob,
  ReportShortcut,
} from "@/modules/reports/types/reports.types";
import type {
  GeneratedReportDto,
  ReportCatalogDto,
  ReportCatalogGroupDto,
  ReportDefinitionDto,
  ReportDownloadResultDto,
  ReportGenerationStartDto,
  ReportJobDto,
  ReportShortcutDto,
} from "@/types/dto/reports.dto";

export function toReportDefinition(dto: ReportDefinitionDto): ReportDefinition {
  const lastGenerated = parseOptionalApiDate(dto.last_generated_at);
  return {
    id: dto.id,
    slug: dto.slug,
    name: dto.name,
    description: dto.description,
    category: dto.category,
    detailRoute: dto.detail_route,
    generateOnly: dto.generate_only,
    lastGeneratedAt: lastGenerated ? toApiTimestamp(lastGenerated) : null,
  };
}

export function toReportCatalogGroup(dto: ReportCatalogGroupDto): ReportCatalogGroup {
  return {
    category: dto.category,
    reports: dto.reports.map(toReportDefinition),
  };
}

export function toReportShortcut(dto: ReportShortcutDto): ReportShortcut {
  return {
    id: dto.id,
    label: dto.label,
    href: dto.href,
  };
}

export function toReportCatalog(dto: ReportCatalogDto): ReportCatalog {
  return {
    groups: dto.groups.map(toReportCatalogGroup),
    shortcuts: dto.shortcuts.map(toReportShortcut),
  };
}

export function toGeneratedReport(dto: GeneratedReportDto): GeneratedReport {
  return {
    id: dto.id,
    reportId: dto.report_id,
    name: dto.name,
    generatedAt: toApiTimestamp(parseApiDate(dto.generated_at)),
    filename: dto.filename,
    status: dto.status,
  };
}

export function toReportJob(dto: ReportJobDto): ReportJob {
  return {
    id: dto.id,
    reportId: dto.report_id,
    reportName: dto.report_name,
    status: dto.status,
    progress: dto.progress,
    generatedReportId: dto.generated_report_id,
  };
}

export function toReportDownloadResult(
  dto: ReportDownloadResultDto,
): ReportDownloadResult {
  return {
    filename: dto.filename,
    rowCount: dto.row_count,
  };
}

export function toReportGenerationStart(
  dto: ReportGenerationStartDto,
): ReportGenerationStart {
  return { jobId: dto.job_id };
}
