import {
  toDashboardActivityItem,
  toDashboardAnalytics,
  toDashboardAnnouncement,
  toDashboardKpi,
  toDashboardQuickAction,
  toDashboardStats,
} from "@/lib/transformers/dashboard.transformer";
import { get, getPaginated } from "@/services/api-client";
import { ENDPOINTS } from "@/services/endpoints";
import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import type {
  DashboardActivityItemDto,
  DashboardAnalyticsDto,
  DashboardAnnouncementDto,
  DashboardKpiDto,
  DashboardQuickActionDto,
  DashboardStatsDto,
} from "@/types/dto/dashboard.dto";
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
    const data = await get<DashboardStatsDto>(ENDPOINTS.dashboard.stats);
    return { data: toDashboardStats(data) };
  }

  async getKpis(): Promise<ApiResponse<DashboardKpi[]>> {
    const data = await get<DashboardKpiDto[]>(ENDPOINTS.dashboard.kpis);
    return { data: data.map(toDashboardKpi) };
  }

  async getAnalytics(): Promise<ApiResponse<DashboardAnalytics>> {
    const data = await get<DashboardAnalyticsDto>(ENDPOINTS.dashboard.analytics);
    return { data: toDashboardAnalytics(data) };
  }

  async getQuickActions(): Promise<ApiResponse<DashboardQuickAction[]>> {
    const data = await get<DashboardQuickActionDto[]>(
      ENDPOINTS.dashboard.quickActions,
    );
    return { data: data.map(toDashboardQuickAction) };
  }

  async getAnnouncement(): Promise<
    ApiResponse<DashboardAnnouncement | null>
  > {
    const data = await get<DashboardAnnouncementDto | null>(
      ENDPOINTS.dashboard.announcement,
    );
    return { data: data ? toDashboardAnnouncement(data) : null };
  }

  async getAnnouncements(): Promise<ApiResponse<DashboardAnnouncement[]>> {
    const data = await get<DashboardAnnouncementDto[]>(
      ENDPOINTS.dashboard.announcements,
    );
    return { data: data.map(toDashboardAnnouncement) };
  }

  async getBannerAnnouncement(): Promise<
    ApiResponse<DashboardAnnouncement | null>
  > {
    const data = await get<DashboardAnnouncementDto | null>(
      ENDPOINTS.dashboard.announcementBanner,
    );
    return { data: data ? toDashboardAnnouncement(data) : null };
  }

  async getRecentActivity(
    params?: ActivityQueryParams,
  ): Promise<PaginatedResponse<DashboardActivityItem>> {
    const response = await getPaginated<DashboardActivityItemDto>(
      `${ENDPOINTS.dashboard.recentActivity}${buildActivityQuery(params)}`,
    );
    return {
      data: response.data.map(toDashboardActivityItem),
      meta: response.meta,
    };
  }
}

export const realDashboardService = new RealDashboardService();
