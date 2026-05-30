import type { DashboardActivityItem } from "@/modules/dashboard/types/dashboard.types";

export function formatActivityDescription(item: DashboardActivityItem): string {
  return `${item.actorName} ${item.action} ${item.targetLabel}`;
}
