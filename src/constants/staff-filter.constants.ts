import { STAFF_ROLE_OPTIONS } from "@/constants/staff-management.constants";
import type { FilterFieldConfig } from "@/types/filter.types";

export const STAFF_FILTER_CONFIG: FilterFieldConfig[] = [
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
    id: "dashboardRole",
    type: "select",
    label: "Dashboard role",
    urlKey: "role",
    options: STAFF_ROLE_OPTIONS.map((opt) => ({
      label: opt.label,
      value: opt.value,
    })),
    placeholder: "Any role",
  },
];
