"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { CHART_SERIES_COLORS } from "@/constants/chart-theme.constants";
import type { ChartDataPoint } from "../../types/dashboard.types";
import { ChartDataTable } from "./ChartDataTable";

interface DashboardDonutChartProps {
  title: string;
  segments: ChartDataPoint[];
  ariaLabel: string;
}

export function DashboardDonutChart({
  title,
  segments,
  ariaLabel,
}: DashboardDonutChartProps) {
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
          <PieChart>
            <Pie
              data={segments}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
            >
              {segments.map((entry, index) => (
                <Cell
                  key={entry.label}
                  fill={CHART_SERIES_COLORS[index % CHART_SERIES_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--surface-elevated)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                fontSize: "13px",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ChartDataTable caption={`${title} data`} points={segments} />
    </div>
  );
}
