"use client";

import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/shared/EmptyState";
import { REPORTS_COPY } from "@/modules/reports/constants/reports-management.constants";
import { useToast } from "@/hooks/useToast";
import type { GeneratedReport } from "../types/reports.types";
import { useDownloadGeneratedReport } from "../hooks/useReportGeneration";

interface RecentReportsPanelProps {
  reports: GeneratedReport[];
}

function formatGeneratedAt(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function RecentReportsPanel({ reports }: RecentReportsPanelProps) {
  const toast = useToast();
  const downloadMutation = useDownloadGeneratedReport();

  const handleDownload = (id: string) => {
    downloadMutation.mutate(id, {
      onSuccess: (response) => {
        toast.success({
          title: REPORTS_COPY.exportSuccess,
          description: response.data.filename,
        });
      },
      onError: () => {
        toast.error({ title: REPORTS_COPY.exportError });
      },
    });
  };

  if (reports.length === 0) {
    return (
      <section aria-labelledby="recent-reports-heading" className="flex flex-col gap-4">
        <h2
          id="recent-reports-heading"
          className="text-[18px] font-semibold leading-[1.3] text-foreground md:text-[24px] md:leading-[1.2]"
        >
          {REPORTS_COPY.recentTitle}
        </h2>
        <EmptyState
          icon={FileText}
          title={REPORTS_COPY.recentEmptyTitle}
          description={REPORTS_COPY.recentEmptyDescription}
        />
      </section>
    );
  }

  return (
    <section aria-labelledby="recent-reports-heading" className="flex flex-col gap-4">
      <h2
        id="recent-reports-heading"
        className="text-[18px] font-semibold leading-[1.3] text-foreground md:text-[24px] md:leading-[1.2]"
      >
        {REPORTS_COPY.recentTitle}
      </h2>
      <ul className="divide-y divide-border rounded-lg border border-border bg-surface-elevated">
        {reports.map((report) => (
          <li
            key={report.id}
            className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
          >
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-medium text-foreground">{report.name}</p>
              <p className="mt-1 text-[13px] text-muted-fg">
                {formatGeneratedAt(report.generatedAt)}
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              loading={downloadMutation.isPending}
              leadingIcon={
                <Download className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
              }
              onClick={() => handleDownload(report.id)}
              disabled={report.status !== "ready"}
              aria-label={`${REPORTS_COPY.downloadLabel} ${report.name}`}
            >
              {REPORTS_COPY.downloadLabel}
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
}
