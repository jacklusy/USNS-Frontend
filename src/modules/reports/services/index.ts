import { resolveService } from "@/lib/service-resolver";
import type { IEnrollmentReportService } from "./enrollment-report.service";
import { mockEnrollmentReportService } from "./enrollment-report.service.mock";
import { realEnrollmentReportService } from "./enrollment-report.service.real";
import type { IReportsService } from "./reports.service";
import { mockReportsService } from "./reports.service.mock";
import { realReportsService } from "./reports.service.real";
import type { IUsageReportService } from "./usage-report.service";
import { mockUsageReportService } from "./usage-report.service.mock";
import { realUsageReportService } from "./usage-report.service.real";

export const reportsService = resolveService<IReportsService>(
  mockReportsService,
  realReportsService,
);

export const enrollmentReportService = resolveService<IEnrollmentReportService>(
  mockEnrollmentReportService,
  realEnrollmentReportService,
);

export const usageReportService = resolveService<IUsageReportService>(
  mockUsageReportService,
  realUsageReportService,
);
