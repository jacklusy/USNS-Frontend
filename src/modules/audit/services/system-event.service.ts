import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type {
  SystemEvent,
  SystemEventDetail,
  SystemEventExportResult,
  SystemEventListQueryParams,
} from "../types/system-event.types";

export interface ISystemEventService {
  list(
    params: SystemEventListQueryParams,
  ): Promise<PaginatedResponse<SystemEvent>>;
  getById(id: string): Promise<ApiResponse<SystemEventDetail>>;
  exportCsv(
    params: Omit<SystemEventListQueryParams, "page" | "per_page">,
  ): Promise<ApiResponse<SystemEventExportResult>>;
}
