"use client";

import { FileBarChart } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import {
  REPORT_CATEGORY_LABELS,
  REPORTS_COPY,
} from "@/modules/reports/constants/reports-management.constants";
import type { ReportCatalogGroup } from "../types/reports.types";
import { ReportCard } from "./ReportCard";

interface ReportCatalogSectionProps {
  groups: ReportCatalogGroup[];
}

export function ReportCatalogSection({ groups }: ReportCatalogSectionProps) {
  if (groups.length === 0) {
    return (
      <EmptyState
        icon={FileBarChart}
        title={REPORTS_COPY.catalogEmptyTitle}
        description={REPORTS_COPY.catalogEmptyDescription}
      />
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {groups.map((group) => (
        <section
          key={group.category}
          aria-labelledby={`report-category-${group.category}`}
          className="flex flex-col gap-4"
        >
          <h2
            id={`report-category-${group.category}`}
            className="text-[18px] font-semibold leading-[1.3] text-foreground md:text-[24px] md:leading-[1.2]"
          >
            {REPORT_CATEGORY_LABELS[group.category]}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {group.reports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
