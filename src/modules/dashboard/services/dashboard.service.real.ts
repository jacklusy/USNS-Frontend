import { get } from "@/services/api-client";
import { ENDPOINTS } from "@/services/endpoints";
import type { ApiResponse } from "@/types/api.types";
import type {
  DashboardActivityItem,
  DashboardStats,
} from "../types/dashboard.types";
import type { IDashboardService } from "./dashboard.service";

export class RealDashboardService implements IDashboardService {
  async getStats(): Promise<ApiResponse<DashboardStats>> {
    const data = await get<DashboardStats>(ENDPOINTS.dashboard.stats);
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
