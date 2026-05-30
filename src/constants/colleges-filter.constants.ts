import type { FilterFieldConfig } from "@/types/filter.types";

export const COLLEGES_FILTER_CONFIG: FilterFieldConfig[] = [
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
];
