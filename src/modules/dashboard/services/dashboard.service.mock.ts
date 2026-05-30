import { MockServiceBase } from "@/lib/mock-service-base";
import {
  mockDashboardActivity,
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

  async getRecentActivity() {
    await this.delay(200);
    return mockDashboardActivity;
  }
}

export const mockDashboardService = new MockDashboardService();
