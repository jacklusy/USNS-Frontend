export type SystemEventCategory =
  | "system"
  | "security"
  | "configuration"
  | "backup";

export type SystemEventSeverity = "info" | "warning" | "critical";

export interface SystemEvent {
  id: string;
  timestamp: string;
  category: SystemEventCategory;
  severity: SystemEventSeverity;
  title: string;
  summary: string;
}

export interface SystemEventDetail extends SystemEvent {
  context: Record<string, string>;
}

export interface SystemEventListQueryParams {
  page: number;
  per_page: number;
  category?: SystemEventCategory;
  severity?: SystemEventSeverity;
  dateFrom?: string;
  dateTo?: string;
}

export interface SystemEventExportResult {
  exported: number;
  filename: string;
}
