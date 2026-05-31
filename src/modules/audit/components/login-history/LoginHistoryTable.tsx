"use client";

import { AlertTriangle } from "lucide-react";
import { useMemo } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { Badge } from "@/components/ui/Badge";
import { LOGIN_RESULT_LABELS } from "@/constants/audit-log.constants";
import { AUDIT_COPY } from "@/constants/audit-management.constants";
import type { DataTableColumn } from "@/types/data-table.types";
import type { LoginHistoryEntry } from "../../types/login-history.types";
import { formatAuditTimestamp } from "../../utils/audit-display";

interface LoginHistoryTableProps {
  rows: LoginHistoryEntry[];
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

export function LoginHistoryTable({
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
}: LoginHistoryTableProps) {
  const columns = useMemo<readonly DataTableColumn<LoginHistoryEntry>[]>(
    () => [
      {
        id: "timestamp",
        header: "Timestamp",
        cell: (row) => formatAuditTimestamp(row.timestamp),
        sortable: true,
        priority: true,
      },
      {
        id: "user",
        header: "User",
        cell: (row) => (
          <div className="flex flex-col">
            <span className="text-[15px] font-medium text-foreground">
              {row.userName}
            </span>
            <span className="text-[13px] text-muted-fg">{row.userEmail}</span>
          </div>
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
        id: "browser",
        header: "Browser / device",
        cell: (row) => (
          <div className="flex flex-col text-[13px]">
            <span>{row.browser}</span>
            <span className="text-muted-fg">{row.device}</span>
          </div>
        ),
      },
      {
        id: "location",
        header: "Location",
        cell: (row) => `${row.locationCity}, ${row.locationCountry}`,
      },
      {
        id: "result",
        header: "Result",
        cell: (row) => {
          const isFailure = row.result === "failed" || row.result === "blocked";
          return (
            <div
              className={`flex flex-col gap-2 ${isFailure ? "text-danger" : ""}`}
            >
              <Badge variant={isFailure ? "danger" : "success"}>
                {LOGIN_RESULT_LABELS[row.result]}
              </Badge>
              {row.suspiciousReasons.length > 0 ? (
                <div className="flex items-start gap-1.5">
                  <AlertTriangle
                    className="mt-0.5 h-4 w-4 shrink-0 text-warn"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <div className="flex flex-col gap-1">
                    <span className="text-[12px] font-medium text-warn">
                      {AUDIT_COPY.suspiciousLabel}
                    </span>
                    <Badge variant="warning">{row.suspiciousReasons[0]}</Badge>
                    {row.suspiciousReasons.length > 1 ? (
                      <span className="text-[12px] text-muted-fg">
                        +{row.suspiciousReasons.length - 1} more
                      </span>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
          );
        },
      },
    ],
    [],
  );

  return (
    <DataTable
      columns={columns}
      data={rows}
      searchMode="client"
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
      ariaLabel="Login history table"
    />
  );
}
