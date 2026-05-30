"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CHART_COLORS } from "@/constants/chart-theme.constants";
import type { ChartDataPoint } from "../../types/dashboard.types";
import { ChartDataTable } from "./ChartDataTable";

interface DashboardBarChartProps {
  title: string;
  points: ChartDataPoint[];
  ariaLabel: string;
}

export function DashboardBarChart({
  title,
  points,
  ariaLabel,
}: DashboardBarChartProps) {
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
          <BarChart data={points}>
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
            <Bar dataKey="value" fill={CHART_COLORS.brand} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <ChartDataTable caption={`${title} data`} points={points} />
    </div>
  );
}
