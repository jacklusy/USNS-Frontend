import type { UserRole } from "@/types/user.types";

export const REPORTS_ALLOWED_ROLES: readonly UserRole[] = [
  "admin",
  "dean",
  "president",
];

export const REPORTS_COPY = {
  pageTitle: "Reports",
  pageDescription:
    "Browse the report catalog, generate exports, and open interactive analytics views.",
  recentTitle: "Recently generated",
  recentEmptyTitle: "No recent reports",
  recentEmptyDescription:
    "Generated reports will appear here with download links.",
  catalogEmptyTitle: "No reports available",
  catalogEmptyDescription: "The report catalog is empty for your role.",
  generateLabel: "Generate",
  generatingLabel: "Generating",
  viewReportLabel: "View report",
  downloadLabel: "Download CSV",
  generateSuccess: "Report ready",
  generateSuccessDescription: "Your report was generated and added to recent downloads.",
  generateError: "Generation failed",
  generateErrorDescription: "Could not complete report generation. Try again.",
  lastGeneratedPrefix: "Last generated",
  lastGeneratedNever: "Not yet generated",
  categoryAcademic: "Academic",
  categoryAdministrative: "Administrative",
  categorySystem: "System",
  categoryFinancial: "Financial",
  shortcutsTitle: "Quick access",
  enrollmentPageTitle: "Enrollment statistics",
  enrollmentPageDescription:
    "Enrollment trends and department drill-down filtered by academic period and program.",
  usagePageTitle: "User activity & system usage",
  usagePageDescription:
    "Daily active users, feature adoption, top actors, and peak usage hours.",
  backToReports: "Back to reports",
  exportLabel: "Export CSV",
  printLabel: "Print",
  exportSuccess: "Export started",
  exportSuccessDescription: "Your CSV file download should begin shortly.",
  exportError: "Export failed",
  loadErrorTitle: "Could not load report",
  loadErrorDescription: "Try again or return to the reports catalog.",
  enrollmentChartTitle: "Enrollment trend by semester",
  enrollmentChartAria: "Bar chart showing enrollment counts across semesters",
  enrollmentTableAria: "Enrollment breakdown by department",
  usageChartTitle: "Daily active users",
  usageChartAria: "Line chart of daily active users for the selected period",
  topUsersTitle: "Top active users",
  featureUsageTitle: "Feature usage by module",
  peakHoursTitle: "Peak usage hours",
  peakHoursHint: "Darker cells indicate higher concurrent usage.",
  peakHoursAria: "Heatmap of system usage intensity by day and hour",
  preset7d: "Last 7 days",
  preset30d: "Last 30 days",
  preset90d: "Last 90 days",
  presetCustom: "Custom range",
  filterAcademicYear: "Academic year",
  filterSemester: "Semester",
  filterCollege: "College",
  filterProgram: "Program",
  metricTotalEnrolled: "Total enrolled",
  metricNewEnrollments: "New enrollments",
  metricWithdrawals: "Withdrawals",
  metricCompletionRate: "Completion rate",
  exportFilenameEnrollment: "usns-enrollment-statistics.csv",
  exportFilenameReport: "usns-report-export.csv",
  colDepartment: "Department",
  colEnrolled: "Enrolled",
  colNewEnrollments: "New",
  colWithdrawals: "Withdrawals",
  colCompletionRate: "Completion rate",
  colUser: "User",
  colRole: "Role",
  colActionCount: "Actions",
  colLastActive: "Last active",
  colModule: "Module",
  colSessions: "Sessions",
  colShare: "Share",
} as const;

export const REPORT_CATEGORY_LABELS: Record<
  import("../types/reports.types").ReportCategory,
  string
> = {
  academic: REPORTS_COPY.categoryAcademic,
  administrative: REPORTS_COPY.categoryAdministrative,
  system: REPORTS_COPY.categorySystem,
  financial: REPORTS_COPY.categoryFinancial,
};

export const REPORT_CATEGORY_ORDER: readonly import("../types/reports.types").ReportCategory[] =
  ["academic", "administrative", "system", "financial"];
