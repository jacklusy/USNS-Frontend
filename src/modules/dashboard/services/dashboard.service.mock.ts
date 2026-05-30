import { MockServiceBase } from "@/lib/mock-service-base";
import {
  buildMockQuickActions,
  getMockBannerAnnouncement,
  mockDashboardAnalytics,
  mockDashboardAnnouncementsList,
  mockDashboardKpis,
  mockDashboardStats,
  paginateMockActivity,
} from "@/mock/dashboard/dashboard.mock";
import type { ActivityQueryParams } from "../types/dashboard.types";
import type { IDashboardService } from "./dashboard.service";

const DEFAULT_ACTIVITY_PER_PAGE = 5;

export class MockDashboardService
  extends MockServiceBase
  implements IDashboardService
{
  async getStats() {
    await this.delay();
    return mockDashboardStats;
  }

  async getKpis() {
    await this.delay();
    return mockDashboardKpis;
  }

  async getAnalytics() {
    await this.delay(300);
    return mockDashboardAnalytics;
  }

  async getQuickActions() {
    await this.delay(200);
    return { data: buildMockQuickActions() };
  }

  async getAnnouncement() {
    await this.delay(150);
    return { data: getMockBannerAnnouncement() };
  }

  async getAnnouncements() {
    await this.delay(200);
    return mockDashboardAnnouncementsList;
  }

  async getBannerAnnouncement() {
    await this.delay(150);
    return { data: getMockBannerAnnouncement() };
  }

  async getRecentActivity(params?: ActivityQueryParams) {
    await this.delay(200);
    const page = params?.page ?? 1;
    const perPage = params?.per_page ?? DEFAULT_ACTIVITY_PER_PAGE;
    return paginateMockActivity(page, perPage);
  }
}

export const mockDashboardService = new MockDashboardService();
