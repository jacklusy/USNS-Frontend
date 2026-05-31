export type AuditLogResult = "success" | "failure";

export interface AuditLog {
  id: string;
  timestamp: Date;
  actorName: string;
  actorId?: string;
  action: string;
  resourceType: string;
  resourceId: string;
  ipAddress: string;
  result: AuditLogResult;
}

export interface AuditLogDetail extends AuditLog {
  payloadBefore?: Record<string, string>;
  payloadAfter?: Record<string, string>;
  metadata?: Record<string, string>;
}

export interface AuditLogListQueryParams {
  page: number;
  per_page: number;
  search?: string;
  action?: string;
  resourceType?: string;
  result?: AuditLogResult;
  dateFrom?: string;
  dateTo?: string;
}

export interface AuditExportResult {
  exported: number;
  filename: string;
}
