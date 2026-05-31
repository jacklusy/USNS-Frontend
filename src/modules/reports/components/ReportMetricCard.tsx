"use client";

import { Skeleton } from "@/components/ui/Skeleton";

interface ReportMetricCardProps {
  title: string;
  value: string;
  isLoading?: boolean;
}

export function ReportMetricCard({
  title,
  value,
  isLoading = false,
}: ReportMetricCardProps) {
  if (isLoading) {
    return (
      <div className="rounded-lg border border-border bg-surface-elevated p-5">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="mt-3 h-9 w-20" />
      </div>
    );
  }

  return (
    <div
      className="rounded-lg border border-border bg-surface-elevated p-5"
      aria-label={`${title}: ${value}`}
    >
      <p className="text-[12px] font-medium uppercase tracking-widest text-muted-fg">
        {title}
      </p>
      <p className="mt-2 font-mono text-3xl font-medium tabular-nums text-foreground">
        {value}
      </p>
    </div>
  );
}
