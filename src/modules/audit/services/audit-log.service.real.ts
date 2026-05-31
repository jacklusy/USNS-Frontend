import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type {
  AuditExportResult,
  AuditLog,
  AuditLogDetail,
  AuditLogListQueryParams,
} from "../types/audit-log.types";
import type { IAuditLogService } from "./audit-log.service";

export class RealAuditLogService implements IAuditLogService {
  async list(
    _params: AuditLogListQueryParams,
  ): Promise<PaginatedResponse<AuditLog>> {
    throw new Error("Audit logs API not integrated");
  }

  async getById(_id: string): Promise<ApiResponse<AuditLogDetail>> {
    throw new Error("Audit logs API not integrated");
  }

  async exportCsv(
    _params: Omit<AuditLogListQueryParams, "page" | "per_page">,
  ): Promise<ApiResponse<AuditExportResult>> {
    throw new Error("Audit logs API not integrated");
  }
}

export const realAuditLogService = new RealAuditLogService();
