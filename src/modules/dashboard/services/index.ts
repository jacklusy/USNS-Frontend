import { resolveService } from "@/lib/service-resolver";
import type { IDashboardService } from "./dashboard.service";
import { mockDashboardService } from "./dashboard.service.mock";
import { realDashboardService } from "./dashboard.service.real";

export const dashboardService = resolveService<IDashboardService>(
  mockDashboardService,
  realDashboardService,
);

export type { IDashboardService } from "./dashboard.service";
