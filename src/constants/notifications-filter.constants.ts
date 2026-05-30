import { NOTIFICATIONS_COPY } from "@/constants/notifications-management.constants";
import type { FilterFieldConfig } from "@/types/filter.types";

export const NOTIFICATIONS_FILTER_CONFIG: FilterFieldConfig[] = [
  {
    id: "category",
    type: "select",
    label: NOTIFICATIONS_COPY.filterCategory,
    urlKey: "category",
    options: [
      { label: NOTIFICATIONS_COPY.categorySystem, value: "system" },
      { label: NOTIFICATIONS_COPY.categoryAcademic, value: "academic" },
      { label: NOTIFICATIONS_COPY.categorySecurity, value: "security" },
    ],
    placeholder: "Any category",
  },
  {
    id: "read",
    type: "select",
    label: NOTIFICATIONS_COPY.filterReadStatus,
    urlKey: "read",
    options: [
      { label: NOTIFICATIONS_COPY.filterReadAll, value: "all" },
      { label: NOTIFICATIONS_COPY.filterReadUnread, value: "false" },
      { label: NOTIFICATIONS_COPY.filterReadRead, value: "true" },
    ],
    placeholder: NOTIFICATIONS_COPY.filterReadAll,
  },
];
