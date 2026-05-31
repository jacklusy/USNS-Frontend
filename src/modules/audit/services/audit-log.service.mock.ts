import { AUDIT_COPY } from "@/constants/audit-management.constants";
import { MockServiceBase } from "@/lib/mock-service-base";
import {
  getAuditLogByIdFromStore,
  listAllAuditLogsFromStore,
  listAuditLogsFromStore,
} from "@/mock/audit/audit-logs.mock";
import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type { AppError } from "@/types/error.types";
import { downloadAuditLogsCsv } from "../utils/export-audit-csv";
import type {
  AuditExportResult,
  AuditLog,
  AuditLogDetail,
  AuditLogListQueryParams,
} from "../types/audit-log.types";
import type { IAuditLogService } from "./audit-log.service";

function notFound(message: string): AppError {
  return { code: "NOT_FOUND", message };
}

export class MockAuditLogService
  extends MockServiceBase
  implements IAuditLogService
{
  async list(
    params: AuditLogListQueryParams,
  ): Promise<PaginatedResponse<AuditLog>> {
    await this.delay();
    return listAuditLogsFromStore(params);
  }

  async getById(id: string): Promise<ApiResponse<AuditLogDetail>> {
    await this.delay();
    const record = getAuditLogByIdFromStore(id);
    if (!record) throw notFound("Audit log not found");
    return { data: record };
  }

  async exportCsv(
    params: Omit<AuditLogListQueryParams, "page" | "per_page">,
  ): Promise<ApiResponse<AuditExportResult>> {
    await this.delay();
    const rows = listAllAuditLogsFromStore(params);
    downloadAuditLogsCsv(rows, AUDIT_COPY.exportFilenameLogs);
    return {
      data: {
        exported: rows.length,
        filename: AUDIT_COPY.exportFilenameLogs,
      },
    };
  }
}

export const mockAuditLogService = new MockAuditLogService();
