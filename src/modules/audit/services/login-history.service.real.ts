import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type {
  LoginHistoryEntry,
  LoginHistoryExportResult,
  LoginHistoryListQueryParams,
} from "../types/login-history.types";
import type { ILoginHistoryService } from "./login-history.service";

export class RealLoginHistoryService implements ILoginHistoryService {
  async list(
    _params: LoginHistoryListQueryParams,
  ): Promise<PaginatedResponse<LoginHistoryEntry>> {
    throw new Error("Login history API not integrated");
  }

  async exportCsv(
    _params: Omit<LoginHistoryListQueryParams, "page" | "per_page">,
  ): Promise<ApiResponse<LoginHistoryExportResult>> {
    throw new Error("Login history API not integrated");
  }
}

export const realLoginHistoryService = new RealLoginHistoryService();
