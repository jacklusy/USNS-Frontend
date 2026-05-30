import type { FilterFieldConfig } from "@/types/filter.types";
import { UI_KIT_ROLE_OPTIONS } from "@/constants/ui-kit.constants";

export const UI_KIT_FILTER_CONFIG: FilterFieldConfig[] = [
  {
    id: "query",
    type: "text",
    label: "Name or email",
    urlKey: "q",
    placeholder: "Search by name or email",
  },
  {
    id: "role",
    type: "select",
    label: "Role",
    urlKey: "role",
    multiple: true,
    options: UI_KIT_ROLE_OPTIONS.map((option) => ({
      label: option.label,
      value: option.value,
    })),
    placeholder: "Select roles",
  },
  {
    id: "status",
    type: "select",
    label: "Status",
    urlKey: "status",
    options: [
      { label: "Active", value: "Active" },
      { label: "Pending", value: "Pending" },
      { label: "Inactive", value: "Inactive" },
    ],
    placeholder: "Any status",
  },
  {
    id: "created",
    type: "dateRange",
    label: "Created",
    urlKey: "created",
  },
  {
    id: "activeOnly",
    type: "checkbox",
    label: "Active only",
    urlKey: "activeOnly",
    checkboxLabel: "Show active users only",
  },
];
