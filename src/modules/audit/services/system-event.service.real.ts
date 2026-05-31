import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type {
  SystemEvent,
  SystemEventDetail,
  SystemEventExportResult,
  SystemEventListQueryParams,
} from "../types/system-event.types";
import type { ISystemEventService } from "./system-event.service";

export class RealSystemEventService implements ISystemEventService {
  async list(
    _params: SystemEventListQueryParams,
  ): Promise<PaginatedResponse<SystemEvent>> {
    throw new Error("System events API not integrated");
  }

  async getById(_id: string): Promise<ApiResponse<SystemEventDetail>> {
    throw new Error("System events API not integrated");
  }

  async exportCsv(
    _params: Omit<SystemEventListQueryParams, "page" | "per_page">,
  ): Promise<ApiResponse<SystemEventExportResult>> {
    throw new Error("System events API not integrated");
  }
}

export const realSystemEventService = new RealSystemEventService();
