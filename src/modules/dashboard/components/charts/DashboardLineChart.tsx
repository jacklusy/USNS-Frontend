"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CHART_COLORS, CHART_SERIES_COLORS } from "@/constants/chart-theme.constants";
import type { DashboardLineSeries } from "../../types/dashboard.types";
import { ChartDataTable } from "./ChartDataTable";

interface DashboardLineChartProps {
  title: string;
  series: DashboardLineSeries[];
  ariaLabel: string;
}

function buildChartRows(series: DashboardLineSeries[]) {
  const labelSet = new Set<string>();
  for (const s of series) {
    for (const point of s.points) {
      labelSet.add(point.label);
    }
  }
  const labels = Array.from(labelSet);
  return labels.map((label) => {
    const row: Record<string, string | number> = { label };
    for (const s of series) {
      const point = s.points.find((p) => p.label === label);
      row[s.name] = point?.value ?? 0;
    }
    return row;
  });
}

export function DashboardLineChart({
  title,
  series,
  ariaLabel,
}: DashboardLineChartProps) {
  const rows = buildChartRows(series);
  const tablePoints = series[0]?.points ?? [];

  return (
    <div
      className="rounded-lg border border-border bg-surface-elevated p-5"
      role="img"
      aria-label={ariaLabel}
    >
      <h3 className="text-[18px] font-semibold leading-[1.3] text-foreground">
        {title}
      </h3>
      <div className="mt-4 h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={rows}>
            <CartesianGrid stroke={CHART_COLORS.border} strokeDasharray="3 3" />
            <XAxis
              dataKey="label"
              tick={{ fill: CHART_COLORS.muted, fontSize: 13 }}
              axisLine={{ stroke: CHART_COLORS.border }}
            />
            <YAxis
              tick={{ fill: CHART_COLORS.muted, fontSize: 13 }}
              axisLine={{ stroke: CHART_COLORS.border }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--surface-elevated)",
                border: `1px solid ${CHART_COLORS.border}`,
                borderRadius: "10px",
                fontSize: "13px",
              }}
            />
            <Legend />
            {series.map((s, index) => (
              <Line
                key={s.name}
                type="monotone"
                dataKey={s.name}
                stroke={CHART_SERIES_COLORS[index % CHART_SERIES_COLORS.length]}
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <ChartDataTable caption={`${title} data`} points={tablePoints} />
    </div>
  );
}
