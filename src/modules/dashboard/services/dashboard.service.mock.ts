import { MockServiceBase } from "@/lib/mock-service-base";
import {
  mockDashboardActivity,
  mockDashboardAnalytics,
  mockDashboardAnnouncement,
  mockDashboardKpis,
  mockDashboardQuickActions,
  mockDashboardStats,
} from "@/mock/dashboard/dashboard.mock";
import type { IDashboardService } from "./dashboard.service";

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
    return mockDashboardQuickActions;
  }

  async getAnnouncement() {
    await this.delay(150);
    return mockDashboardAnnouncement;
  }

  async getRecentActivity() {
    await this.delay(200);
    return mockDashboardActivity;
  }
}

export const mockDashboardService = new MockDashboardService();
