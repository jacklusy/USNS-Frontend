import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type {
  LoginHistoryEntry,
  LoginHistoryExportResult,
  LoginHistoryListQueryParams,
} from "../types/login-history.types";

export interface ILoginHistoryService {
  list(
    params: LoginHistoryListQueryParams,
  ): Promise<PaginatedResponse<LoginHistoryEntry>>;
  exportCsv(
    params: Omit<LoginHistoryListQueryParams, "page" | "per_page">,
  ): Promise<ApiResponse<LoginHistoryExportResult>>;
}
