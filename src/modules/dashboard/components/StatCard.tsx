import {
  AlertTriangle,
  Clock,
  Minus,
  TrendingDown,
  TrendingUp,
  UserCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";
import type { StatIconKey, StatTrend } from "../types/dashboard.types";

const STAT_ICON_MAP: Record<StatIconKey, LucideIcon> = {
  users: Users,
  sessions: Clock,
  approvals: UserCheck,
  alerts: AlertTriangle,
};

interface StatCardProps {
  title: string;
  value: number | string;
  trend: StatTrend;
  changePercent: number;
  icon: StatIconKey;
  isLoading?: boolean;
}

function formatChangePercent(value: number): string {
  const abs = Math.abs(value);
  return `${abs.toFixed(1)}%`;
}

function buildAriaLabel(
  title: string,
  value: number | string,
  trend: StatTrend,
  changePercent: number,
): string {
  const trendWord =
    trend === "up" ? "increased" : trend === "down" ? "decreased" : "unchanged";
  return `${title}: ${value}, ${trendWord} by ${formatChangePercent(changePercent)}`;
}

export function StatCard({
  title,
  value,
  trend,
  changePercent,
  icon,
  isLoading = false,
}: StatCardProps) {
  const Icon = STAT_ICON_MAP[icon];

  if (isLoading) {
    return (
      <div
        className="rounded-lg border border-border bg-surface-elevated p-5"
        aria-busy="true"
        aria-label={`Loading ${title}`}
      >
        <Skeleton className="h-4 w-24" />
        <Skeleton className="mt-4 h-9 w-28" />
        <Skeleton className="mt-3 h-4 w-20" />
      </div>
    );
  }

  const TrendIcon =
    trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColorClass =
    trend === "up"
      ? "text-success"
      : trend === "down"
        ? "text-danger"
        : "text-muted-fg";
  const trendPrefix =
    trend === "up" ? "+" : trend === "down" ? "-" : "";

  const displayValue =
    typeof value === "number" ? value.toLocaleString() : value;

  return (
    <div
      className="rounded-lg border border-border bg-surface-elevated p-5 transition-shadow duration-120 hover:shadow-[0_4px_12px_rgba(15,31,24,0.08)]"
      aria-label={buildAriaLabel(title, displayValue, trend, changePercent)}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-[12px] font-medium uppercase tracking-widest text-muted-fg">
          {title}
        </p>
        <Icon
          className="h-5 w-5 shrink-0 text-muted-fg"
          strokeWidth={1.75}
          aria-hidden="true"
        />
      </div>
      <p className="mt-2 font-mono text-3xl font-medium tabular-nums text-foreground">
        {displayValue}
      </p>
      <p
        className={`mt-2 flex items-center gap-1 text-[13px] font-medium ${trendColorClass}`}
      >
        <TrendIcon className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
        <span>
          {trendPrefix}
          {formatChangePercent(changePercent)}
        </span>
        <span className="sr-only">
          {trend === "up"
            ? "Trending up"
            : trend === "down"
              ? "Trending down"
              : "No change"}
        </span>
      </p>
    </div>
  );
}
