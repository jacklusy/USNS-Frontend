import type { ChartDataPoint } from "@/modules/dashboard/types/dashboard.types";

export interface EnrollmentReportFilters {
  academicYear: string;
  semester: string;
  collegeId: string;
  programId: string;
}

export interface EnrollmentFilterOption {
  value: string;
  label: string;
}

export interface EnrollmentFilterOptions {
  academicYears: EnrollmentFilterOption[];
  semesters: EnrollmentFilterOption[];
  colleges: EnrollmentFilterOption[];
  programs: EnrollmentFilterOption[];
}

export interface EnrollmentSummary {
  totalEnrolled: number;
  newEnrollments: number;
  withdrawals: number;
  completionRate: number;
}

export interface EnrollmentDepartmentRow {
  id: string;
  department: string;
  enrolled: number;
  newEnrollments: number;
  withdrawals: number;
  completionRate: number;
}

export interface EnrollmentReportData {
  summary: EnrollmentSummary;
  trend: ChartDataPoint[];
  departments: EnrollmentDepartmentRow[];
}

export interface EnrollmentExportResult {
  exported: number;
  filename: string;
}
