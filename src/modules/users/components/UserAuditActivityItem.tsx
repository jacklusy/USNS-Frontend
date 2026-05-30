"use client";

import {
  Check,
  Download,
  Eye,
  Pencil,
  Plus,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import type { ActivityActionIconKey } from "@/constants/activity-action.constants";
import { USER_AUDIT_ACTION_STYLES } from "@/constants/user-audit-action.constants";
import type { UserAuditEntry } from "../types/user-audit.types";
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

interface UserAuditActivityItemProps {
  entry: UserAuditEntry;
}

export function UserAuditActivityItem({ entry }: UserAuditActivityItemProps) {
  const style = USER_AUDIT_ACTION_STYLES[entry.actionType];
  const ActionIcon = ACTION_ICON_MAP[style.icon];

  return (
    <li className="flex gap-3 rounded-lg border border-border bg-surface-elevated p-4">
      <span
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-[13px] font-medium text-white"
        aria-hidden="true"
      >
        {getUserInitials(entry.actorName)}
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
            <p className="text-[15px] text-foreground">{entry.description}</p>
            <p className="mt-0.5 text-[13px] text-muted-fg">
              {entry.actorName} · {entry.action}
            </p>
          </div>
        </div>
        <p className="mt-2 text-[13px] text-muted-fg">
          <time dateTime={entry.createdAt}>
            {formatRelativeTime(entry.createdAt)}
          </time>
        </p>
      </div>
    </li>
  );
}
