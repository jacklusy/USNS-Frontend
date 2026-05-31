"use client";

import { Printer } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { DataTable } from "@/components/shared/DataTable";
import { ErrorState } from "@/components/shared/ErrorState";
import { FilterChips, FilterPanel } from "@/components/shared/FilterPanel";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes.constants";
import { useFilterUrlState } from "@/hooks/useFilterUrlState";
import { useToast } from "@/hooks/useToast";
import { DashboardBarChart } from "@/modules/dashboard/components/charts/DashboardBarChart";
import { usePermissions } from "@/modules/auth/hooks/usePermissions";
import { PERMISSIONS } from "@/types/permission.types";
import type { FilterFieldConfig } from "@/types/filter.types";
import { ENROLLMENT_REPORT_FILTER_CONFIG } from "../constants/reports-filter.constants";
import { ENROLLMENT_DEPARTMENT_COLUMNS } from "../constants/enrollment-table.constants";
import { REPORTS_COPY } from "../constants/reports-management.constants";
import {
  useEnrollmentFilterOptions,
  useEnrollmentReport,
  useExportEnrollmentReport,
} from "../hooks/useEnrollmentReport";
import {
  getDefaultEnrollmentFilters,
  parseEnrollmentFilterValues,
} from "../utils/parse-enrollment-filters";
import { ReportMetricCard } from "./ReportMetricCard";

export function EnrollmentReportPageContent() {
  const toast = useToast();
  const { can } = usePermissions();
  const [filterOpen, setFilterOpen] = useState(false);
  const exportMutation = useExportEnrollmentReport();
  const optionsQuery = useEnrollmentFilterOptions();

  const baseConfig = ENROLLMENT_REPORT_FILTER_CONFIG;
  const {
    draftValues,
    appliedValues,
    setDraftField,
    applyFilters,
    clearAllFilters,
    removeAppliedFilter,
    syncDraftFromUrl,
  } = useFilterUrlState({ config: baseConfig });

  const filterConfig = useMemo((): FilterFieldConfig[] => {
    const options = optionsQuery.data?.data;
    if (!options) return baseConfig;
    return baseConfig.map((field) => {
      if (field.id === "academicYear") {
        return { ...field, options: options.academicYears };
      }
      if (field.id === "semester") {
        return { ...field, options: options.semesters };
      }
      if (field.id === "college") {
        return { ...field, options: options.colleges };
      }
      if (field.id === "program") {
        return { ...field, options: options.programs };
      }
      return field;
    });
  }, [baseConfig, optionsQuery.data?.data]);

  const filters = useMemo(() => {
    const parsed = parseEnrollmentFilterValues(appliedValues);
    const hasApplied = Object.keys(appliedValues).length > 0;
    return hasApplied ? parsed : getDefaultEnrollmentFilters();
  }, [appliedValues]);

  const reportQuery = useEnrollmentReport(filters);

  const report = reportQuery.data?.data;
  const canExport = can(PERMISSIONS.reports.export);

  const handleExport = () => {
    exportMutation.mutate(filters, {
      onSuccess: (response) => {
        toast.success({
          title: REPORTS_COPY.exportSuccess,
          description: `${response.data.exported} rows exported to ${response.data.filename}`,
        });
      },
      onError: () => {
        toast.error({ title: REPORTS_COPY.exportError });
      },
    });
  };

  const handlePrint = () => {
    window.print();
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

  const summary = report?.summary;
  const isLoading = reportQuery.isLoading || optionsQuery.isLoading;

  return (
    <div className="reports-print-area mx-auto flex w-full max-w-[1440px] flex-col gap-6">
      <Breadcrumbs
        dynamicLabels={{
          enrollment: REPORTS_COPY.enrollmentPageTitle,
        }}
      />
      <div className="flex flex-col gap-1 print:hidden">
        <Link
          href={ROUTES.REPORTS}
          className="text-[13px] font-medium text-brand hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          {REPORTS_COPY.backToReports}
        </Link>
        <h1 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.01em] text-foreground md:text-[36px] md:leading-[1.1]">
          {REPORTS_COPY.enrollmentPageTitle}
        </h1>
        <p className="max-w-2xl text-[15px] leading-relaxed text-muted-fg">
          {REPORTS_COPY.enrollmentPageDescription}
        </p>
      </div>

      <div className="print:hidden">
        <FilterPanel
          config={filterConfig}
          values={draftValues}
          appliedValues={appliedValues}
          open={filterOpen}
          onOpenChange={(open) => {
            if (open) syncDraftFromUrl();
            setFilterOpen(open);
          }}
          onFieldChange={setDraftField}
          onApply={() => {
            applyFilters();
            setFilterOpen(false);
          }}
          onClearAll={clearAllFilters}
        />
        <FilterChips
          config={filterConfig}
          values={appliedValues}
          onRemove={removeAppliedFilter}
          onClearAll={clearAllFilters}
        />
      </div>

      <div className="flex flex-wrap gap-2 print:hidden">
        {canExport ? (
          <Button
            variant="primary"
            size="md"
            loading={exportMutation.isPending}
            onClick={handleExport}
          >
            {REPORTS_COPY.exportLabel}
          </Button>
        ) : null}
        <Button
          variant="secondary"
          size="md"
          leadingIcon={
            <Printer className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          }
          onClick={handlePrint}
        >
          {REPORTS_COPY.printLabel}
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <ReportMetricCard
          title={REPORTS_COPY.metricTotalEnrolled}
          value={summary ? summary.totalEnrolled.toLocaleString() : "—"}
          isLoading={isLoading}
        />
        <ReportMetricCard
          title={REPORTS_COPY.metricNewEnrollments}
          value={summary ? summary.newEnrollments.toLocaleString() : "—"}
          isLoading={isLoading}
        />
        <ReportMetricCard
          title={REPORTS_COPY.metricWithdrawals}
          value={summary ? summary.withdrawals.toLocaleString() : "—"}
          isLoading={isLoading}
        />
        <ReportMetricCard
          title={REPORTS_COPY.metricCompletionRate}
          value={summary ? `${summary.completionRate}%` : "—"}
          isLoading={isLoading}
        />
      </div>

      {report && !isLoading ? (
        <DashboardBarChart
          title={REPORTS_COPY.enrollmentChartTitle}
          points={report.trend}
          ariaLabel={REPORTS_COPY.enrollmentChartAria}
        />
      ) : (
        <div className="h-[360px] animate-pulse rounded-lg bg-border" />
      )}

      <DataTable
        columns={ENROLLMENT_DEPARTMENT_COLUMNS}
        data={report?.departments ?? []}
        isLoading={isLoading}
        enableClientPagination
        clientPerPage={10}
        ariaLabel={REPORTS_COPY.enrollmentTableAria}
        showColumnFilters={false}
      />
    </div>
  );
}
