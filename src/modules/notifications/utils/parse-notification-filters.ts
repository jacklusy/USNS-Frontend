import type { FilterValues } from "@/types/filter.types";
import type {
  NotificationCategory,
  NotificationListQueryParams,
  NotificationReadFilter,
} from "../types/notification.types";

function isCategory(value: string): value is NotificationCategory {
  return value === "system" || value === "academic" || value === "security";
}

function isReadFilter(value: string): value is NotificationReadFilter {
  return value === "all" || value === "true" || value === "false";
}

export function parseNotificationFilterValues(
  values: FilterValues,
): Pick<NotificationListQueryParams, "category" | "read"> {
  const categoryRaw = values.category;
  const category =
    typeof categoryRaw === "string" && isCategory(categoryRaw)
      ? categoryRaw
      : undefined;

  const readRaw = values.read;
  const read =
    typeof readRaw === "string" && isReadFilter(readRaw) ? readRaw : undefined;

  return { category, read };
}
