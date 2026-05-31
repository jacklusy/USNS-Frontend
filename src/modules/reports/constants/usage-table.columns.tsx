import { REPORTS_COPY } from "./reports-management.constants";
import type { DataTableColumn } from "@/types/data-table.types";
import type { FeatureUsageRow, TopActiveUser } from "../types/usage-report.types";

export const TOP_ACTIVE_USER_COLUMNS: readonly DataTableColumn<TopActiveUser>[] =
  [
    {
      id: "name",
      header: REPORTS_COPY.colUser,
      accessorKey: "name",
      sortable: true,
      searchable: true,
      priority: true,
    },
    {
      id: "role",
      header: REPORTS_COPY.colRole,
      accessorKey: "role",
      sortable: true,
    },
    {
      id: "actionCount",
      header: REPORTS_COPY.colActionCount,
      accessorKey: "actionCount",
      sortable: true,
      cell: (row) => (
        <span className="font-mono tabular-nums">
          {row.actionCount.toLocaleString()}
        </span>
      ),
    },
    {
      id: "lastActiveAt",
      header: REPORTS_COPY.colLastActive,
      accessorKey: "lastActiveAt",
      sortable: true,
      cell: (row) => (
        <span className="text-[13px] text-muted-fg">
          {new Date(row.lastActiveAt).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })}
        </span>
      ),
    },
  ];

export const FEATURE_USAGE_COLUMNS: readonly DataTableColumn<FeatureUsageRow>[] =
  [
    {
      id: "module",
      header: REPORTS_COPY.colModule,
      accessorKey: "module",
      sortable: true,
      searchable: true,
      priority: true,
    },
    {
      id: "sessionCount",
      header: REPORTS_COPY.colSessions,
      accessorKey: "sessionCount",
      sortable: true,
      cell: (row) => (
        <span className="font-mono tabular-nums">
          {row.sessionCount.toLocaleString()}
        </span>
      ),
    },
    {
      id: "sharePercent",
      header: REPORTS_COPY.colShare,
      accessorKey: "sharePercent",
      sortable: true,
      cell: (row) => (
        <span className="font-mono tabular-nums">{row.sharePercent}%</span>
      ),
    },
  ];
