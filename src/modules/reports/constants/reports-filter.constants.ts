import { REPORTS_COPY } from "./reports-management.constants";
import type { FilterFieldConfig } from "@/types/filter.types";

export const ENROLLMENT_REPORT_FILTER_CONFIG: FilterFieldConfig[] = [
  {
    id: "academicYear",
    type: "select",
    label: REPORTS_COPY.filterAcademicYear,
    urlKey: "academicYear",
    options: [],
    placeholder: "Select year",
  },
  {
    id: "semester",
    type: "select",
    label: REPORTS_COPY.filterSemester,
    urlKey: "semester",
    options: [],
    placeholder: "Select semester",
  },
  {
    id: "college",
    type: "select",
    label: REPORTS_COPY.filterCollege,
    urlKey: "college",
    options: [],
    placeholder: "All colleges",
  },
  {
    id: "program",
    type: "select",
    label: REPORTS_COPY.filterProgram,
    urlKey: "program",
    options: [],
    placeholder: "All programs",
  },
];
