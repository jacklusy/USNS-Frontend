import {
  Check,
  Download,
  Eye,
  Pencil,
  Plus,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import {
  ACTIVITY_ACTION_STYLES,
  type ActivityActionIconKey,
} from "@/constants/activity-action.constants";
import type { DashboardActivityItem } from "../types/dashboard.types";
import { formatActivityDescription } from "@/utils/format-activity-description";
import { formatRelativeTime } from "@/utils/format-relative-time";
import { getUserInitials } from "@/utils/user-initials";

const ACTION_ICON_MAP: Record<ActivityActionIconKey, LucideIcon> = {
  plus: Plus,
  pencil: Pencil,
  trash: Trash2,
  download: Download,
  check: Check,
  eye: Eye,
};

interface ActivityFeedItemProps {
  item: DashboardActivityItem;
}

export function ActivityFeedItem({ item }: ActivityFeedItemProps) {
  const style = ACTIVITY_ACTION_STYLES[item.actionType];
  const ActionIcon = ACTION_ICON_MAP[style.icon];

  return (
    <li className="flex gap-3 rounded-lg border border-border bg-surface-elevated p-4">
      <span
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-[13px] font-medium text-white"
        aria-hidden="true"
      >
        {getUserInitials(item.actorName)}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-2">
          <span
            className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-usns-green-light ${style.toneClass}`}
            aria-hidden="true"
          >
            <ActionIcon className="h-4 w-4" strokeWidth={1.75} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[15px] text-foreground">
              {formatActivityDescription(item)}
            </p>
            <p className="mt-0.5 text-[13px] text-muted-fg">
              {item.resourceType}
            </p>
          </div>
        </div>
        <time
          className="mt-2 block text-[13px] text-muted-fg"
          dateTime={item.createdAt}
        >
          {formatRelativeTime(item.createdAt)}
        </time>
      </div>
    </li>
  );
}
