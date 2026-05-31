import type { ApiTimestamp } from "@/types/dto/common.dto";
import type {
  GeneratedReportStatus,
  ReportCategory,
  ReportJobStatus,
} from "@/modules/reports/types/reports.types";

export interface ReportDefinitionDto {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: ReportCategory;
  detail_route?: string;
  generate_only: boolean;
  last_generated_at: ApiTimestamp | null;
}

export interface ReportCatalogGroupDto {
  category: ReportCategory;
  reports: ReportDefinitionDto[];
}

export interface ReportShortcutDto {
  id: string;
  label: string;
  href: string;
}

export interface ReportCatalogDto {
  groups: ReportCatalogGroupDto[];
  shortcuts: ReportShortcutDto[];
}

export interface GeneratedReportDto {
  id: string;
  report_id: string;
  name: string;
  generated_at: ApiTimestamp;
  filename: string;
  status: GeneratedReportStatus;
}

export interface ReportJobDto {
  id: string;
  report_id: string;
  report_name: string;
  status: ReportJobStatus;
  progress: number;
  generated_report_id?: string;
}

export interface ReportDownloadResultDto {
  filename: string;
  row_count: number;
}

export interface ReportGenerationStartDto {
  job_id: string;
}
