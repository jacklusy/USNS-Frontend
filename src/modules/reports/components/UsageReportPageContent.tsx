"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { DataTable } from "@/components/shared/DataTable";
import { ErrorState } from "@/components/shared/ErrorState";
import { DateRangePicker } from "@/components/ui/date-picker/DateRangePicker";
import { ROUTES } from "@/constants/routes.constants";
import { DashboardLineChart } from "@/modules/dashboard/components/charts/DashboardLineChart";
import type { DashboardLineSeries } from "@/modules/dashboard/types/dashboard.types";
import type { DateRangeValue } from "@/types/date-picker.types";
import { REPORTS_COPY } from "../constants/reports-management.constants";
import {
  FEATURE_USAGE_COLUMNS,
  TOP_ACTIVE_USER_COLUMNS,
} from "../constants/usage-table.columns";
import { useUsageReport } from "../hooks/useUsageReport";
import type { UsageDatePreset } from "../types/usage-report.types";
import {
  buildUsagePresetHref,
  parseUsageSearchParams,
} from "../utils/parse-usage-filters";
import { PeakHoursHeatmap } from "./PeakHoursHeatmap";

const PRESETS: UsageDatePreset[] = ["7d", "30d", "90d", "custom"];

function presetLabel(preset: UsageDatePreset): string {
  if (preset === "7d") return REPORTS_COPY.preset7d;
  if (preset === "30d") return REPORTS_COPY.preset30d;
  if (preset === "90d") return REPORTS_COPY.preset90d;
  return REPORTS_COPY.presetCustom;
}

function parseDateRangeFromParams(
  searchParams: URLSearchParams,
): DateRangeValue {
  const from = searchParams.get("dateFrom");
  const to = searchParams.get("dateTo");
  return {
    start: from ? new Date(from) : null,
    end: to ? new Date(to) : null,
  };
}

export function UsageReportPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useMemo(
    () => parseUsageSearchParams(searchParams),
    [searchParams],
  );
  const reportQuery = useUsageReport(params);
  const report = reportQuery.data?.data;

  const lineSeries: DashboardLineSeries[] = useMemo(() => {
    if (!report) return [];
    return [
      {
        name: "Active users",
        points: report.dailyActiveUsers,
      },
    ];
  }, [report]);

  const activePreset = params.preset;

  const setPreset = (preset: UsageDatePreset) => {
    router.push(`${ROUTES.REPORTS}/usage${buildUsagePresetHref(preset)}`);
  };

  const handleCustomRangeChange = (range: DateRangeValue) => {
    const next = new URLSearchParams({ preset: "custom" });
    if (range.start) {
      next.set("dateFrom", range.start.toISOString().slice(0, 10));
    }
    if (range.end) {
      next.set("dateTo", range.end.toISOString().slice(0, 10));
    }
    router.push(`${ROUTES.REPORTS}/usage?${next.toString()}`);
  };

  if (reportQuery.isError) {
    return (
      <ErrorState
        title={REPORTS_COPY.loadErrorTitle}
        description={REPORTS_COPY.loadErrorDescription}
        onRetry={() => void reportQuery.refetch()}
      />
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6">
      <Breadcrumbs
        dynamicLabels={{
          usage: REPORTS_COPY.usagePageTitle,
        }}
      />
      <div className="flex flex-col gap-1">
        <Link
          href={ROUTES.REPORTS}
          className="text-[13px] font-medium text-brand hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          {REPORTS_COPY.backToReports}
        </Link>
        <h1 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.01em] text-foreground md:text-[36px] md:leading-[1.1]">
          {REPORTS_COPY.usagePageTitle}
        </h1>
        <p className="max-w-2xl text-[15px] leading-relaxed text-muted-fg">
          {REPORTS_COPY.usagePageDescription}
        </p>
      </div>

      <div className="flex flex-col gap-4 rounded-lg border border-border bg-surface-elevated p-5">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Date range presets">
          {PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setPreset(preset)}
              className={`inline-flex h-11 items-center rounded-md px-4 text-[15px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                activePreset === preset
                  ? "bg-usns-green-light text-brand"
                  : "border border-border bg-surface text-foreground hover:bg-usns-green-light"
              }`}
              aria-pressed={activePreset === preset}
            >
              {presetLabel(preset)}
            </button>
          ))}
        </div>
        {activePreset === "custom" ? (
          <DateRangePicker
            id="usage-custom-range"
            value={parseDateRangeFromParams(searchParams)}
            onChange={handleCustomRangeChange}
            aria-label={REPORTS_COPY.presetCustom}
          />
        ) : null}
        {report ? (
          <p className="text-[13px] text-muted-fg">
            {report.dateFrom} — {report.dateTo}
          </p>
        ) : null}
      </div>

      {reportQuery.isLoading ? (
        <div className="h-[360px] animate-pulse rounded-lg bg-border" />
      ) : report ? (
        <DashboardLineChart
          title={REPORTS_COPY.usageChartTitle}
          series={lineSeries}
          ariaLabel={REPORTS_COPY.usageChartAria}
        />
      ) : null}

      <section aria-labelledby="top-users-heading" className="flex flex-col gap-4">
        <h2
          id="top-users-heading"
          className="text-[18px] font-semibold leading-[1.3] text-foreground"
        >
          {REPORTS_COPY.topUsersTitle}
        </h2>
        <DataTable
          columns={TOP_ACTIVE_USER_COLUMNS}
          data={report?.topActiveUsers ?? []}
          isLoading={reportQuery.isLoading}
          enableClientPagination
          clientPerPage={5}
          showColumnFilters={false}
        />
      </section>

      <section
        aria-labelledby="feature-usage-heading"
        className="flex flex-col gap-4"
      >
        <h2
          id="feature-usage-heading"
          className="text-[18px] font-semibold leading-[1.3] text-foreground"
        >
          {REPORTS_COPY.featureUsageTitle}
        </h2>
        <DataTable
          columns={FEATURE_USAGE_COLUMNS}
          data={report?.featureUsage ?? []}
          isLoading={reportQuery.isLoading}
          enableClientPagination={false}
          showColumnFilters={false}
        />
      </section>

      {report ? <PeakHoursHeatmap cells={report.peakHours} /> : null}
    </div>
  );
}
