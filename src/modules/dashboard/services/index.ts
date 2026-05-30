import { resolveService } from "@/lib/service-resolver";
import { mockDashboardService } from "./dashboard.service.mock";
import { realDashboardService } from "./dashboard.service.real";

export const dashboardService = resolveService(
  mockDashboardService,
  realDashboardService,
);

export type { IDashboardService } from "./dashboard.service";
