export type LoginResult = "success" | "failed" | "blocked";

export interface LoginHistoryEntry {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userEmail: string;
  ipAddress: string;
  browser: string;
  device: string;
  locationCountry: string;
  locationCity: string;
  result: LoginResult;
  suspiciousReasons: string[];
}

export interface LoginHistoryListQueryParams {
  page: number;
  per_page: number;
  search?: string;
  result?: LoginResult;
  dateFrom?: string;
  dateTo?: string;
}

export interface LoginHistoryExportResult {
  exported: number;
  filename: string;
}
