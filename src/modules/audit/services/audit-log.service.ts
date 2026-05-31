import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type {
  AuditExportResult,
  AuditLog,
  AuditLogDetail,
  AuditLogListQueryParams,
} from "../types/audit-log.types";

export interface IAuditLogService {
  list(params: AuditLogListQueryParams): Promise<PaginatedResponse<AuditLog>>;
  getById(id: string): Promise<ApiResponse<AuditLogDetail>>;
  exportCsv(
    params: Omit<AuditLogListQueryParams, "page" | "per_page">,
  ): Promise<ApiResponse<AuditExportResult>>;
}
