import {
  normalizeEntityStatus,
  STATUS_BADGE_CONFIG,
  type EntityStatus,
} from "@/constants/status-badge.constants";
import { Badge } from "./Badge";

interface StatusBadgeProps {
  status: EntityStatus | string;
  className?: string;
}

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const resolved =
    typeof status === "string" && status in STATUS_BADGE_CONFIG
      ? (status as EntityStatus)
      : normalizeEntityStatus(String(status));

  if (!resolved) {
    return (
      <Badge variant="default" className={className}>
        {String(status)}
      </Badge>
    );
  }

  const config = STATUS_BADGE_CONFIG[resolved];
  const Icon = config.icon;

  return (
    <Badge
      variant={config.variant}
      className={`gap-1 ${className}`}
    >
      <Icon className="h-3 w-3" strokeWidth={1.75} aria-hidden="true" />
      <span aria-label={`Status: ${config.label}`}>{config.label}</span>
    </Badge>
  );
}
