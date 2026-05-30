import type { ApiResponse } from "@/types/api.types";
import type {
  DashboardActivityItem,
  DashboardStats,
} from "../types/dashboard.types";

export interface IDashboardService {
  getStats(): Promise<ApiResponse<DashboardStats>>;
  getRecentActivity(): Promise<ApiResponse<DashboardActivityItem[]>>;
}
