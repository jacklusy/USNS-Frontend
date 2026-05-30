import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type {
  ActivityQueryParams,
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
  getAnnouncements(): Promise<ApiResponse<DashboardAnnouncement[]>>;
  getBannerAnnouncement(): Promise<ApiResponse<DashboardAnnouncement | null>>;
  getRecentActivity(
    params?: ActivityQueryParams,
  ): Promise<PaginatedResponse<DashboardActivityItem>>;
}
