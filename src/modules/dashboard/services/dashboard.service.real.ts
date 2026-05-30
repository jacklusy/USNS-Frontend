import { get } from "@/services/api-client";
import { ENDPOINTS } from "@/services/endpoints";
import type { ApiResponse } from "@/types/api.types";
import type {
  DashboardActivityItem,
  DashboardAnalytics,
  DashboardAnnouncement,
  DashboardKpi,
  DashboardQuickAction,
  DashboardStats,
} from "../types/dashboard.types";
import type { IDashboardService } from "./dashboard.service";

export class RealDashboardService implements IDashboardService {
  async getStats(): Promise<ApiResponse<DashboardStats>> {
    const data = await get<DashboardStats>(ENDPOINTS.dashboard.stats);
    return { data };
  }

  async getKpis(): Promise<ApiResponse<DashboardKpi[]>> {
    const data = await get<DashboardKpi[]>(ENDPOINTS.dashboard.kpis);
    return { data };
  }

  async getAnalytics(): Promise<ApiResponse<DashboardAnalytics>> {
    const data = await get<DashboardAnalytics>(ENDPOINTS.dashboard.analytics);
    return { data };
  }

  async getQuickActions(): Promise<ApiResponse<DashboardQuickAction[]>> {
    const data = await get<DashboardQuickAction[]>(
      ENDPOINTS.dashboard.quickActions,
    );
    return { data };
  }

  async getAnnouncement(): Promise<
    ApiResponse<DashboardAnnouncement | null>
  > {
    const data = await get<DashboardAnnouncement | null>(
      ENDPOINTS.dashboard.announcement,
    );
    return { data };
  }

  async getRecentActivity(): Promise<ApiResponse<DashboardActivityItem[]>> {
    const data = await get<DashboardActivityItem[]>(
      ENDPOINTS.dashboard.recentActivity,
    );
    return { data };
  }
}

export const realDashboardService = new RealDashboardService();
