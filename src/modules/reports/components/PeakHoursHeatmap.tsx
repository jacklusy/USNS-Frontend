"use client";

import { Fragment, useMemo } from "react";
import { REPORTS_COPY } from "@/modules/reports/constants/reports-management.constants";
import type { PeakHourCell, PeakHourDayOfWeek } from "../types/usage-report.types";
import { PEAK_HOUR_DAY_LABELS } from "../types/usage-report.types";

const DAY_ORDER: PeakHourDayOfWeek[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

interface PeakHoursHeatmapProps {
  cells: PeakHourCell[];
}

function formatHourLabel(hour: number): string {
  if (hour === 0) return "12a";
  if (hour < 12) return `${hour}a`;
  if (hour === 12) return "12p";
  return `${hour - 12}p`;
}

export function PeakHoursHeatmap({ cells }: PeakHoursHeatmapProps) {
  const { maxCount, grid } = useMemo(() => {
    const max = Math.max(1, ...cells.map((cell) => cell.count));
    const lookup = new Map<string, number>();
    for (const cell of cells) {
      lookup.set(`${cell.dayOfWeek}-${cell.hour}`, cell.count);
    }
    return { maxCount: max, grid: lookup };
  }, [cells]);

  return (
    <div
      className="rounded-lg border border-border bg-surface-elevated p-5"
      role="img"
      aria-label={REPORTS_COPY.peakHoursAria}
    >
      <h3 className="text-[18px] font-semibold leading-[1.3] text-foreground">
        {REPORTS_COPY.peakHoursTitle}
      </h3>
      <p className="mt-1 text-[13px] text-muted-fg">{REPORTS_COPY.peakHoursHint}</p>
      <div className="mt-4 overflow-x-auto">
        <div
          className="inline-grid min-w-[640px] gap-1"
          style={{ gridTemplateColumns: "48px repeat(24, minmax(20px, 1fr))" }}
        >
          <div aria-hidden="true" />
          {Array.from({ length: 24 }, (_, hour) => (
            <div
              key={`hour-label-${hour}`}
              className="text-center text-[11px] text-muted-fg"
              aria-hidden="true"
            >
              {hour % 3 === 0 ? formatHourLabel(hour) : ""}
            </div>
          ))}
          {DAY_ORDER.map((day) => (
            <Fragment key={day}>
              <div className="flex items-center text-[12px] font-medium text-muted-fg">
                {PEAK_HOUR_DAY_LABELS[day]}
              </div>
              {Array.from({ length: 24 }, (_, hour) => {
                const count = grid.get(`${day}-${hour}`) ?? 0;
                const intensity = count / maxCount;
                const opacity = 0.12 + intensity * 0.88;
                return (
                  <div
                    key={`${day}-${hour}`}
                    className="h-6 rounded-sm bg-brand"
                    style={{ opacity }}
                    role="img"
                    aria-label={`${PEAK_HOUR_DAY_LABELS[day]} ${formatHourLabel(hour)}: ${count} sessions`}
                  />
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
