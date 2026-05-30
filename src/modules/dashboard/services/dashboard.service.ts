import type { ApiResponse } from "@/types/api.types";
import type {
  DashboardActivityItem,
  DashboardAnalytics,
  DashboardAnnouncement,
  DashboardKpi,
  DashboardQuickAction,
  DashboardStats,
} from "../types/dashboard.types";

export interface IDashboardService {
  getStats(): Promise<ApiResponse<DashboardStats>>;
  getKpis(): Promise<ApiResponse<DashboardKpi[]>>;
  getAnalytics(): Promise<ApiResponse<DashboardAnalytics>>;
  getQuickActions(): Promise<ApiResponse<DashboardQuickAction[]>>;
  getAnnouncement(): Promise<ApiResponse<DashboardAnnouncement | null>>;
  getRecentActivity(): Promise<ApiResponse<DashboardActivityItem[]>>;
}
