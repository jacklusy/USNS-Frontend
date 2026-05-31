"use client";

import { AlertCircle, AlertTriangle, Eye, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { Badge } from "@/components/ui/Badge";
import {
  SYSTEM_EVENT_CATEGORY_LABELS,
  SYSTEM_EVENT_SEVERITY_LABELS,
} from "@/constants/audit-log.constants";
import { AUDIT_COPY } from "@/constants/audit-management.constants";
import { systemEventDetailRoute } from "@/constants/routes.constants";
import type {
  DataTableAction,
  DataTableColumn,
} from "@/types/data-table.types";
import type { SystemEvent } from "../../types/system-event.types";
import type { SystemEventSeverity } from "../../types/system-event.types";
import { formatAuditTimestamp } from "../../utils/audit-display";

function SeverityIndicator({ severity }: { severity: SystemEventSeverity }) {
  const Icon =
    severity === "critical"
      ? AlertCircle
      : severity === "warning"
        ? AlertTriangle
        : Info;
  const tone =
    severity === "critical"
      ? "text-danger"
      : severity === "warning"
        ? "text-warn"
        : "text-muted-fg";
  return (
    <span className={`inline-flex items-center gap-1.5 text-[15px] ${tone}`}>
      <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
      {SYSTEM_EVENT_SEVERITY_LABELS[severity]}
    </span>
  );
}

interface SystemEventsTableProps {
  rows: SystemEvent[];
  page: number;
  perPage: number;
  total: number;
  isLoading: boolean;
  isError: boolean;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  onRetry: () => void;
  onExport?: () => void;
  exportDisabled?: boolean;
}

export function SystemEventsTable({
  rows,
  page,
  perPage,
  total,
  isLoading,
  isError,
  onPageChange,
  onPerPageChange,
  onRetry,
  onExport,
  exportDisabled = false,
}: SystemEventsTableProps) {
  const router = useRouter();

  const columns = useMemo<readonly DataTableColumn<SystemEvent>[]>(
    () => [
      {
        id: "timestamp",
        header: "Timestamp",
        cell: (row) => formatAuditTimestamp(row.timestamp),
        sortable: true,
        priority: true,
      },
      {
        id: "category",
        header: "Category",
        cell: (row) => (
          <Badge variant="neutral">
            {SYSTEM_EVENT_CATEGORY_LABELS[row.category]}
          </Badge>
        ),
        sortable: true,
      },
      {
        id: "severity",
        header: "Severity",
        cell: (row) => <SeverityIndicator severity={row.severity} />,
        sortable: true,
      },
      {
        id: "title",
        header: "Event",
        cell: (row) => (
          <div className="flex flex-col">
            <span className="text-[15px] font-medium text-foreground">
              {row.title}
            </span>
            <span className="text-[13px] text-muted-fg">{row.summary}</span>
          </div>
        ),
        sortable: true,
      },
    ],
    [],
  );

  const rowActions = useMemo<readonly DataTableAction<SystemEvent>[]>(
    () => [
      {
        id: "view",
        label: AUDIT_COPY.viewDetail,
        icon: Eye,
        onSelect: (row) => router.push(systemEventDetailRoute(row.id)),
      },
    ],
    [router],
  );

  return (
    <DataTable
      columns={columns}
      data={rows}
      searchMode="client"
      rowActions={rowActions}
      pagination={{
        page,
        perPage,
        total,
        onPageChange,
        onPerPageChange,
      }}
      onExport={onExport}
      isLoading={isLoading}
      isError={isError}
      onRetry={onRetry}
      showColumnFilters={false}
      ariaLabel="System events table"
    />
  );
}
