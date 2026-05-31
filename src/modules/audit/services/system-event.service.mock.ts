import { AUDIT_COPY } from "@/constants/audit-management.constants";
import { MockServiceBase } from "@/lib/mock-service-base";
import {
  getSystemEventByIdFromStore,
  listAllSystemEventsFromStore,
  listSystemEventsFromStore,
} from "@/mock/audit/system-events.mock";
import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type { AppError } from "@/types/error.types";
import { downloadSystemEventsCsv } from "../utils/export-audit-csv";
import type {
  SystemEvent,
  SystemEventDetail,
  SystemEventExportResult,
  SystemEventListQueryParams,
} from "../types/system-event.types";
import type { ISystemEventService } from "./system-event.service";

function notFound(message: string): AppError {
  return { code: "NOT_FOUND", message };
}

export class MockSystemEventService
  extends MockServiceBase
  implements ISystemEventService
{
  async list(
    params: SystemEventListQueryParams,
  ): Promise<PaginatedResponse<SystemEvent>> {
    await this.delay();
    return listSystemEventsFromStore(params);
  }

  async getById(id: string): Promise<ApiResponse<SystemEventDetail>> {
    await this.delay();
    const record = getSystemEventByIdFromStore(id);
    if (!record) throw notFound("System event not found");
    return { data: record };
  }

  async exportCsv(
    params: Omit<SystemEventListQueryParams, "page" | "per_page">,
  ): Promise<ApiResponse<SystemEventExportResult>> {
    await this.delay();
    const rows = listAllSystemEventsFromStore(params);
    downloadSystemEventsCsv(rows, AUDIT_COPY.exportFilenameEvents);
    return {
      data: {
        exported: rows.length,
        filename: AUDIT_COPY.exportFilenameEvents,
      },
    };
  }
}

export const mockSystemEventService = new MockSystemEventService();
