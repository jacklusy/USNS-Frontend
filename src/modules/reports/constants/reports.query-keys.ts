import type { EnrollmentReportFilters } from "../types/enrollment-report.types";
import type { UsageReportParams } from "../types/usage-report.types";

const reportsRoot = ["reports"] as const;

export const reportsQueryKeys = {
  root: reportsRoot,
  all: [...reportsRoot] as const,
  catalog: [...reportsRoot, "catalog"] as const,
  recent: [...reportsRoot, "recent"] as const,
  job: (jobId: string) => [...reportsRoot, "job", jobId] as const,
  enrollment: {
    filterOptions: [...reportsRoot, "enrollment", "filterOptions"] as const,
    report: (params: EnrollmentReportFilters) =>
      [...reportsRoot, "enrollment", "report", params] as const,
  },
  usage: {
    report: (params: UsageReportParams) =>
      [...reportsRoot, "usage", "report", params] as const,
  },
};
