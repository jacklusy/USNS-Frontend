import { FACULTY_RANK_OPTIONS } from "@/constants/faculty-management.constants";
import type { FilterFieldConfig } from "@/types/filter.types";

export const FACULTY_FILTER_CONFIG: FilterFieldConfig[] = [
  {
    id: "status",
    type: "select",
    label: "Status",
    urlKey: "status",
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
      { label: "Pending", value: "pending" },
    ],
    placeholder: "Any status",
  },
  {
    id: "rank",
    type: "select",
    label: "Rank",
    urlKey: "rank",
    options: FACULTY_RANK_OPTIONS.map((opt) => ({
      label: opt.label,
      value: opt.value,
    })),
    placeholder: "Any rank",
  },
];
