export type ReportCategory =
  | "academic"
  | "administrative"
  | "system"
  | "financial";

export type ReportJobStatus =
  | "pending"
  | "running"
  | "completed"
  | "failed";

export interface ReportDefinition {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: ReportCategory;
  detailRoute?: string;
  generateOnly: boolean;
  lastGeneratedAt: string | null;
}

export interface ReportCatalogGroup {
  category: ReportCategory;
  reports: ReportDefinition[];
}

export interface ReportCatalog {
  groups: ReportCatalogGroup[];
  shortcuts: ReportShortcut[];
}

export interface ReportShortcut {
  id: string;
  label: string;
  href: string;
}

export type GeneratedReportStatus = "ready" | "expired";

export interface GeneratedReport {
  id: string;
  reportId: string;
  name: string;
  generatedAt: string;
  filename: string;
  status: GeneratedReportStatus;
}

export interface ReportJob {
  id: string;
  reportId: string;
  reportName: string;
  status: ReportJobStatus;
  progress: number;
  generatedReportId?: string;
}

export interface ReportDownloadResult {
  filename: string;
  rowCount: number;
}

export interface ReportGenerationStart {
  jobId: string;
}
