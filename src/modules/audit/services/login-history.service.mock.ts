import { AUDIT_COPY } from "@/constants/audit-management.constants";
import { MockServiceBase } from "@/lib/mock-service-base";
import {
  listAllLoginHistoryFromStore,
  listLoginHistoryFromStore,
} from "@/mock/audit/login-history.mock";
import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import { downloadLoginHistoryCsv } from "../utils/export-audit-csv";
import type {
  LoginHistoryEntry,
  LoginHistoryExportResult,
  LoginHistoryListQueryParams,
} from "../types/login-history.types";
import type { ILoginHistoryService } from "./login-history.service";

export class MockLoginHistoryService
  extends MockServiceBase
  implements ILoginHistoryService
{
  async list(
    params: LoginHistoryListQueryParams,
  ): Promise<PaginatedResponse<LoginHistoryEntry>> {
    await this.delay();
    return listLoginHistoryFromStore(params);
  }

  async exportCsv(
    params: Omit<LoginHistoryListQueryParams, "page" | "per_page">,
  ): Promise<ApiResponse<LoginHistoryExportResult>> {
    await this.delay();
    const rows = listAllLoginHistoryFromStore(params);
    downloadLoginHistoryCsv(rows, AUDIT_COPY.exportFilenameLogin);
    return {
      data: {
        exported: rows.length,
        filename: AUDIT_COPY.exportFilenameLogin,
      },
    };
  }
}

export const mockLoginHistoryService = new MockLoginHistoryService();
