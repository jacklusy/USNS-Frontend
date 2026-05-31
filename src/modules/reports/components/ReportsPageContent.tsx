"use client";

import Link from "next/link";
import { ErrorState } from "@/components/shared/ErrorState";
import { REPORTS_COPY } from "@/modules/reports/constants/reports-management.constants";
import { useReportCatalog } from "../hooks/useReportCatalog";
import { useRecentReports } from "../hooks/useRecentReports";
import { RecentReportsPanel } from "./RecentReportsPanel";
import { ReportCatalogSection } from "./ReportCatalogSection";

export function ReportsPageContent() {
  const catalogQuery = useReportCatalog();
  const recentQuery = useRecentReports();

  const isLoading = catalogQuery.isLoading || recentQuery.isLoading;
  const isError = catalogQuery.isError || recentQuery.isError;

  if (isError) {
    return (
      <ErrorState
        title={REPORTS_COPY.loadErrorTitle}
        description={REPORTS_COPY.loadErrorDescription}
        onRetry={() => {
          void catalogQuery.refetch();
          void recentQuery.refetch();
        }}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6">
        <div className="h-24 animate-pulse rounded-lg bg-border" />
        <div className="h-64 animate-pulse rounded-lg bg-border" />
        <div className="h-96 animate-pulse rounded-lg bg-border" />
      </div>
    );
  }

  const catalog = catalogQuery.data?.data;
  const recent = recentQuery.data?.data ?? [];

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.01em] text-foreground md:text-[36px] md:leading-[1.1]">
          {REPORTS_COPY.pageTitle}
        </h1>
        <p className="max-w-2xl text-[15px] leading-relaxed text-muted-fg">
          {REPORTS_COPY.pageDescription}
        </p>
      </div>

      {catalog?.shortcuts.length ? (
        <section aria-labelledby="report-shortcuts-heading" className="flex flex-col gap-3">
          <h2
            id="report-shortcuts-heading"
            className="text-[18px] font-semibold leading-[1.3] text-foreground"
          >
            {REPORTS_COPY.shortcutsTitle}
          </h2>
          <div className="flex flex-wrap gap-2">
            {catalog.shortcuts.map((shortcut) => (
              <Link
                key={shortcut.id}
                href={shortcut.href}
                className="inline-flex h-11 items-center rounded-md border border-border bg-surface-elevated px-4 text-[15px] font-medium text-brand transition-colors hover:bg-usns-green-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                {shortcut.label}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <RecentReportsPanel reports={recent} />
      <ReportCatalogSection groups={catalog?.groups ?? []} />
    </div>
  );
}
