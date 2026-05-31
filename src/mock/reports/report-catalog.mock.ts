import {
  REPORT_CATEGORY_ORDER,
} from "@/modules/reports/constants/reports-management.constants";
import {
  reportsEnrollmentRoute,
  reportsUsageRoute,
} from "@/constants/routes.constants";
import type {
  ReportCatalog,
  ReportCatalogGroup,
  ReportDefinition,
  ReportShortcut,
} from "@/modules/reports/types/reports.types";

const SEED_REPORTS: ReportDefinition[] = [
  {
    id: "rpt_enrollment",
    slug: "enrollment-statistics",
    name: "Enrollment statistics",
    description:
      "Semester enrollment trends, new students, withdrawals, and department drill-down.",
    category: "academic",
    detailRoute: reportsEnrollmentRoute(),
    generateOnly: false,
    lastGeneratedAt: "2026-04-15T10:30:00.000Z",
  },
  {
    id: "rpt_usage",
    slug: "user-activity-system-usage",
    name: "User activity & system usage",
    description:
      "Daily active users, feature adoption, top actors, and peak usage hours.",
    category: "system",
    detailRoute: reportsUsageRoute(),
    generateOnly: false,
    lastGeneratedAt: "2026-04-20T14:00:00.000Z",
  },
  {
    id: "rpt_faculty_load",
    slug: "faculty-teaching-load",
    name: "Faculty teaching load",
    description: "Credit hours and section assignments by college and term.",
    category: "academic",
    generateOnly: true,
    lastGeneratedAt: "2026-03-01T09:00:00.000Z",
  },
  {
    id: "rpt_graduation",
    slug: "graduation-candidates",
    name: "Graduation candidates",
    description: "Students meeting degree requirements for the active catalog year.",
    category: "academic",
    generateOnly: true,
    lastGeneratedAt: null,
  },
  {
    id: "rpt_staff_headcount",
    slug: "staff-headcount",
    name: "Staff headcount",
    description: "Administrative staff counts by department and employment type.",
    category: "administrative",
    generateOnly: true,
    lastGeneratedAt: "2026-02-10T11:00:00.000Z",
  },
  {
    id: "rpt_leave_balances",
    slug: "leave-balances",
    name: "Leave balances",
    description: "Accrued and used leave balances for administrative employees.",
    category: "administrative",
    generateOnly: true,
    lastGeneratedAt: null,
  },
  {
    id: "rpt_login_summary",
    slug: "login-summary",
    name: "Login summary",
    description: "Authentication volume and failure rates for the selected period.",
    category: "system",
    generateOnly: true,
    lastGeneratedAt: "2026-04-28T08:00:00.000Z",
  },
  {
    id: "rpt_audit_export",
    slug: "audit-trail-export",
    name: "Audit trail export",
    description: "Compliance audit log extract for external review.",
    category: "system",
    generateOnly: true,
    lastGeneratedAt: "2026-04-01T16:00:00.000Z",
  },
  {
    id: "rpt_tuition",
    slug: "tuition-assessment",
    name: "Tuition assessment",
    description: "Assessed tuition and fee totals by program and billing cycle.",
    category: "financial",
    generateOnly: true,
    lastGeneratedAt: "2026-01-15T12:00:00.000Z",
  },
  {
    id: "rpt_scholarships",
    slug: "scholarship-disbursements",
    name: "Scholarship disbursements",
    description: "Awarded and disbursed scholarship amounts by fund source.",
    category: "financial",
    generateOnly: true,
    lastGeneratedAt: null,
  },
  {
    id: "rpt_budget",
    slug: "department-budget-variance",
    name: "Department budget variance",
    description: "Budget versus actual spend by cost center for the fiscal year.",
    category: "financial",
    generateOnly: true,
    lastGeneratedAt: "2025-12-31T23:59:00.000Z",
  },
  {
    id: "rpt_course_eval",
    slug: "course-evaluation-summary",
    name: "Course evaluation summary",
    description: "Aggregated student evaluation scores by department.",
    category: "academic",
    generateOnly: true,
    lastGeneratedAt: "2026-03-20T13:00:00.000Z",
  },
];

let catalogStore: ReportDefinition[] = structuredClone(SEED_REPORTS);

const SHORTCUTS: ReportShortcut[] = [
  {
    id: "shortcut_enrollment",
    label: "Enrollment statistics",
    href: reportsEnrollmentRoute(),
  },
  {
    id: "shortcut_usage",
    label: "System usage",
    href: reportsUsageRoute(),
  },
];

export function getReportCatalogStore(): ReportDefinition[] {
  return catalogStore;
}

export function findReportDefinitionById(
  id: string,
): ReportDefinition | undefined {
  return catalogStore.find((report) => report.id === id);
}

export function updateReportLastGenerated(
  reportId: string,
  generatedAt: string,
): void {
  catalogStore = catalogStore.map((report) =>
    report.id === reportId ? { ...report, lastGeneratedAt: generatedAt } : report,
  );
}

export function buildReportCatalog(): ReportCatalog {
  const groups: ReportCatalogGroup[] = REPORT_CATEGORY_ORDER.map((category) => ({
    category,
    reports: catalogStore.filter((report) => report.category === category),
  })).filter((group) => group.reports.length > 0);

  return {
    groups,
    shortcuts: SHORTCUTS,
  };
}
