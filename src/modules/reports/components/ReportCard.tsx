"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { REPORTS_COPY } from "@/modules/reports/constants/reports-management.constants";
import type { ReportDefinition } from "../types/reports.types";
import { ReportGenerateButton } from "./ReportGenerateButton";

interface ReportCardProps {
  report: ReportDefinition;
}

function formatLastGenerated(iso: string | null): string {
  if (!iso) return REPORTS_COPY.lastGeneratedNever;
  const date = new Date(iso);
  return `${REPORTS_COPY.lastGeneratedPrefix} ${date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })}`;
}

export function ReportCard({ report }: ReportCardProps) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-border bg-surface-elevated p-5 transition-shadow duration-120 hover:shadow-[0_4px_12px_rgba(15,31,24,0.08)]">
      <h3 className="text-[18px] font-semibold leading-[1.3] text-foreground">
        {report.name}
      </h3>
      <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted-fg">
        {report.description}
      </p>
      <p className="mt-4 text-[13px] text-muted-fg">
        {formatLastGenerated(report.lastGeneratedAt)}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {report.detailRoute ? (
          <Link href={report.detailRoute} className="inline-flex">
            <Button variant="secondary" size="sm" className="min-w-[120px]">
              {REPORTS_COPY.viewReportLabel}
            </Button>
          </Link>
        ) : null}
        <ReportGenerateButton reportId={report.id} reportName={report.name} />
      </div>
    </article>
  );
}
