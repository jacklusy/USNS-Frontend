import type { FilterValues } from "@/types/filter.types";
import type { EnrollmentReportFilters } from "../types/enrollment-report.types";

const DEFAULT_FILTERS: EnrollmentReportFilters = {
  academicYear: "2025-2026",
  semester: "spring",
  collegeId: "",
  programId: "",
};

function readSelectValue(values: FilterValues, key: string): string {
  const raw = values[key];
  return typeof raw === "string" ? raw : "";
}

export function parseEnrollmentFilterValues(
  values: FilterValues,
): EnrollmentReportFilters {
  const academicYear = readSelectValue(values, "academicYear");
  const semester = readSelectValue(values, "semester");
  const collegeId = readSelectValue(values, "college");
  const programId = readSelectValue(values, "program");
  return {
    academicYear: academicYear || DEFAULT_FILTERS.academicYear,
    semester: semester || DEFAULT_FILTERS.semester,
    collegeId,
    programId,
  };
}

export function getDefaultEnrollmentFilters(): EnrollmentReportFilters {
  return { ...DEFAULT_FILTERS };
}
