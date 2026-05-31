import { getCollegesStore } from "@/mock/academic/colleges.mock";
import { getDepartmentsStore } from "@/mock/academic/departments.mock";
import { getProgramsStore } from "@/mock/academic/programs.mock";
import type {
  EnrollmentDepartmentRow,
  EnrollmentFilterOptions,
  EnrollmentReportData,
  EnrollmentReportFilters,
  EnrollmentSummary,
} from "@/modules/reports/types/enrollment-report.types";
import type { ChartDataPoint } from "@/modules/dashboard/types/dashboard.types";

const ACADEMIC_YEARS = [
  { value: "2024-2025", label: "2024–2025" },
  { value: "2025-2026", label: "2025–2026" },
  { value: "2026-2027", label: "2026–2027" },
];

const SEMESTERS = [
  { value: "fall", label: "Fall" },
  { value: "spring", label: "Spring" },
  { value: "summer", label: "Summer" },
];

function hashSeed(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) % 1000;
  }
  return hash;
}

export function buildEnrollmentFilterOptions(): EnrollmentFilterOptions {
  const colleges = getCollegesStore().map((college) => ({
    value: college.id,
    label: college.name,
  }));
  const programs = getProgramsStore().map((program) => ({
    value: program.id,
    label: program.name,
  }));
  return {
    academicYears: ACADEMIC_YEARS,
    semesters: SEMESTERS,
    colleges: [{ value: "", label: "All colleges" }, ...colleges],
    programs: [{ value: "", label: "All programs" }, ...programs],
  };
}

function buildSummary(seed: number): EnrollmentSummary {
  const base = 1200 + (seed % 400);
  const newEnrollments = Math.round(base * 0.12);
  const withdrawals = Math.round(base * 0.04);
  const completionRate = 72 + (seed % 18);
  return {
    totalEnrolled: base,
    newEnrollments,
    withdrawals,
    completionRate,
  };
}

function buildTrend(seed: number): ChartDataPoint[] {
  const labels = ["Fall 24", "Spring 25", "Fall 25", "Spring 26"];
  return labels.map((label, index) => ({
    label,
    value: 900 + seed % 200 + index * 45 + (seed % 30),
  }));
}

function buildDepartments(
  filters: EnrollmentReportFilters,
  seed: number,
): EnrollmentDepartmentRow[] {
  let departments = getDepartmentsStore().filter((dept) => dept.status === "active");
  if (filters.collegeId) {
    departments = departments.filter(
      (dept) => dept.collegeId === filters.collegeId,
    );
  }
  if (filters.programId) {
    const program = getProgramsStore().find((p) => p.id === filters.programId);
    if (program) {
      departments = departments.filter(
        (dept) => dept.id === program.departmentId,
      );
    }
  }
  return departments.slice(0, 12).map((dept, index) => {
    const rowSeed = seed + index * 17;
    const enrolled = 80 + (rowSeed % 120);
    const newEnrollments = Math.round(enrolled * 0.1);
    const withdrawals = Math.round(enrolled * 0.03);
    const completionRate = 65 + (rowSeed % 25);
    return {
      id: dept.id,
      department: dept.name,
      enrolled,
      newEnrollments,
      withdrawals,
      completionRate,
    };
  });
}

export function buildEnrollmentReport(
  filters: EnrollmentReportFilters,
): EnrollmentReportData {
  const seedKey = `${filters.academicYear}-${filters.semester}-${filters.collegeId}-${filters.programId}`;
  const seed = hashSeed(seedKey);
  return {
    summary: buildSummary(seed),
    trend: buildTrend(seed),
    departments: buildDepartments(filters, seed),
  };
}
