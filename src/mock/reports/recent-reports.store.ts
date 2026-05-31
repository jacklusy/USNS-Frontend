import type { GeneratedReport } from "@/modules/reports/types/reports.types";

const SEED_RECENT: GeneratedReport[] = [
  {
    id: "gen_001",
    reportId: "rpt_login_summary",
    name: "Login summary",
    generatedAt: "2026-04-28T08:00:00.000Z",
    filename: "usns-login-summary-2026-04-28.csv",
    status: "ready",
  },
  {
    id: "gen_002",
    reportId: "rpt_usage",
    name: "User activity & system usage",
    generatedAt: "2026-04-20T14:00:00.000Z",
    filename: "usns-system-usage-2026-04-20.csv",
    status: "ready",
  },
  {
    id: "gen_003",
    reportId: "rpt_enrollment",
    name: "Enrollment statistics",
    generatedAt: "2026-04-15T10:30:00.000Z",
    filename: "usns-enrollment-2026-04-15.csv",
    status: "ready",
  },
  {
    id: "gen_004",
    reportId: "rpt_audit_export",
    name: "Audit trail export",
    generatedAt: "2026-04-01T16:00:00.000Z",
    filename: "usns-audit-export-2026-04-01.csv",
    status: "ready",
  },
  {
    id: "gen_005",
    reportId: "rpt_staff_headcount",
    name: "Staff headcount",
    generatedAt: "2026-02-10T11:00:00.000Z",
    filename: "usns-staff-headcount-2026-02-10.csv",
    status: "ready",
  },
  {
    id: "gen_006",
    reportId: "rpt_tuition",
    name: "Tuition assessment",
    generatedAt: "2026-01-15T12:00:00.000Z",
    filename: "usns-tuition-2026-01-15.csv",
    status: "ready",
  },
  {
    id: "gen_007",
    reportId: "rpt_course_eval",
    name: "Course evaluation summary",
    generatedAt: "2026-03-20T13:00:00.000Z",
    filename: "usns-course-eval-2026-03-20.csv",
    status: "ready",
  },
  {
    id: "gen_008",
    reportId: "rpt_faculty_load",
    name: "Faculty teaching load",
    generatedAt: "2026-03-01T09:00:00.000Z",
    filename: "usns-faculty-load-2026-03-01.csv",
    status: "ready",
  },
  {
    id: "gen_009",
    reportId: "rpt_budget",
    name: "Department budget variance",
    generatedAt: "2025-12-31T23:59:00.000Z",
    filename: "usns-budget-variance-2025.csv",
    status: "ready",
  },
  {
    id: "gen_010",
    reportId: "rpt_enrollment",
    name: "Enrollment statistics",
    generatedAt: "2025-11-01T10:00:00.000Z",
    filename: "usns-enrollment-2025-11-01.csv",
    status: "expired",
  },
];

let recentStore: GeneratedReport[] = structuredClone(SEED_RECENT);

const RECENT_LIMIT = 10;

export function listRecentReports(): GeneratedReport[] {
  return [...recentStore].slice(0, RECENT_LIMIT);
}

export function findRecentReportById(
  id: string,
): GeneratedReport | undefined {
  return recentStore.find((item) => item.id === id);
}

export function prependRecentReport(entry: GeneratedReport): void {
  recentStore = [entry, ...recentStore.filter((item) => item.id !== entry.id)].slice(
    0,
    RECENT_LIMIT,
  );
}

export function generateRecentId(): string {
  return `gen_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
}
