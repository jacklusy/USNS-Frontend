"use client";

import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { Badge } from "@/components/ui/Badge";
import { AUDIT_LOG_RESULT_LABELS } from "@/constants/audit-log.constants";
import { AUDIT_COPY } from "@/constants/audit-management.constants";
import { auditLogDetailRoute } from "@/constants/routes.constants";
import type {
  DataTableAction,
  DataTableColumn,
} from "@/types/data-table.types";
import type { AuditLog } from "../../types/audit-log.types";
import {
  formatAuditActionLabel,
  formatAuditTimestamp,
} from "../../utils/audit-display";

interface AuditLogsTableProps {
  rows: AuditLog[];
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

export function AuditLogsTable({
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
}: AuditLogsTableProps) {
  const router = useRouter();

  const columns = useMemo<readonly DataTableColumn<AuditLog>[]>(
    () => [
      {
        id: "timestamp",
        header: "Timestamp",
        cell: (row) => formatAuditTimestamp(row.timestamp),
        sortable: true,
        priority: true,
      },
      {
        id: "actorName",
        header: "Actor",
        accessorKey: "actorName",
        sortable: true,
      },
      {
        id: "action",
        header: "Action",
        cell: (row) => formatAuditActionLabel(row.action),
        sortable: true,
      },
      {
        id: "resourceType",
        header: "Resource type",
        accessorKey: "resourceType",
        sortable: true,
      },
      {
        id: "resourceId",
        header: "Resource ID",
        cell: (row) => (
          <span className="font-mono text-[13px]">{row.resourceId}</span>
        ),
        sortable: true,
      },
      {
        id: "ipAddress",
        header: "IP address",
        accessorKey: "ipAddress",
        sortable: true,
      },
      {
        id: "result",
        header: "Result",
        cell: (row) => (
          <Badge variant={row.result === "success" ? "success" : "danger"}>
            {AUDIT_LOG_RESULT_LABELS[row.result]}
          </Badge>
        ),
        sortable: true,
      },
    ],
    [],
  );

  const rowActions = useMemo<readonly DataTableAction<AuditLog>[]>(
    () => [
      {
        id: "view",
        label: AUDIT_COPY.viewDetail,
        icon: Eye,
        onSelect: (row) => router.push(auditLogDetailRoute(row.id)),
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
      ariaLabel="Audit logs table"
    />
  );
}
