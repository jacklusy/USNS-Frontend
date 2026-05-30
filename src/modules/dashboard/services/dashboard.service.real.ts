import { get, getPaginated } from "@/services/api-client";
import { ENDPOINTS } from "@/services/endpoints";
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
import type { IDashboardService } from "./dashboard.service";

function buildActivityQuery(params?: ActivityQueryParams): string {
  const search = new URLSearchParams();
  if (params?.page !== undefined) {
    search.set("page", String(params.page));
  }
  if (params?.per_page !== undefined) {
    search.set("per_page", String(params.per_page));
  }
  const query = search.toString();
  return query ? `?${query}` : "";
}

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

  async getAnnouncements(): Promise<ApiResponse<DashboardAnnouncement[]>> {
    const data = await get<DashboardAnnouncement[]>(
      ENDPOINTS.dashboard.announcements,
    );
    return { data };
  }

  async getBannerAnnouncement(): Promise<
    ApiResponse<DashboardAnnouncement | null>
  > {
    const data = await get<DashboardAnnouncement | null>(
      ENDPOINTS.dashboard.announcementBanner,
    );
    return { data };
  }

  async getRecentActivity(
    params?: ActivityQueryParams,
  ): Promise<PaginatedResponse<DashboardActivityItem>> {
    return getPaginated<DashboardActivityItem>(
      `${ENDPOINTS.dashboard.recentActivity}${buildActivityQuery(params)}`,
    );
  }
}

export const realDashboardService = new RealDashboardService();
