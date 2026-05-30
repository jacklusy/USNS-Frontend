"use client";

import { DASHBOARD_CHART_TITLES } from "@/constants/dashboard.constants";
import type { DashboardAnalytics } from "../types/dashboard.types";
import { DashboardBarChart } from "./charts/DashboardBarChart";
import { DashboardDonutChart } from "./charts/DashboardDonutChart";
import { DashboardLineChart } from "./charts/DashboardLineChart";

interface DashboardChartsSectionProps {
  analytics: DashboardAnalytics;
}

export function DashboardChartsSection({
  analytics,
}: DashboardChartsSectionProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      <div className="lg:col-span-2 xl:col-span-1">
        <DashboardLineChart
          title={DASHBOARD_CHART_TITLES.enrollment}
          series={analytics.enrollmentTrend}
          ariaLabel="Line chart showing enrollment trend over six months"
        />
      </div>
      <DashboardBarChart
        title={DASHBOARD_CHART_TITLES.approvals}
        points={analytics.approvalsByMonth}
        ariaLabel="Bar chart showing approval counts by month"
      />
      <DashboardDonutChart
        title={DASHBOARD_CHART_TITLES.usersByRole}
        segments={analytics.usersByRole}
        ariaLabel="Donut chart showing user distribution by role"
      />
    </div>
  );
}
