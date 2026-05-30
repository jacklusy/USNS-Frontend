"use client";

import { MoreHorizontal } from "lucide-react";
import { useId, useRef, useState, useEffect, useCallback } from "react";
import { Checkbox } from "@/components/ui/Checkbox";
import { SkeletonTable } from "@/components/ui/loading-skeleton";
import { DATA_TABLE_COPY } from "@/constants/data-table.constants";
import { usePermissions } from "@/modules/auth/hooks/usePermissions";
import type {
  DataTableAction,
  DataTableColumn,
  DataTableRowBase,
} from "@/types/data-table.types";
import { getCellValue } from "./data-table.utils";

interface DataTableBodyProps<TRow extends DataTableRowBase> {
  columns: readonly DataTableColumn<TRow>[];
  rows: TRow[];
  enableSelection?: boolean;
  selectedIds: Set<string>;
  onToggleRowSelection: (rowId: string) => void;
  rowActions?: readonly DataTableAction<TRow>[];
  isLoading?: boolean;
  loadingRowCount?: number;
}

function RowActionsMenu<TRow extends DataTableRowBase>({
  row,
  actions,
}: {
  row: TRow;
  actions: readonly DataTableAction<TRow>[];
}) {
  const { can } = usePermissions();
  const menuId = useId();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const visibleActions = actions.filter(
    (action) =>
      (!action.requiredPermission || can(action.requiredPermission)) &&
      (!action.isVisible || action.isVisible(row)),
  );

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        close();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [open, close]);

  if (visibleActions.length === 0) {
    return null;
  }

  return (
    <div ref={containerRef} className="relative flex justify-end">
      <button
        type="button"
        onClick={() => {
          setOpen((prev) => !prev);
        }}
        className="inline-flex h-11 w-11 items-center justify-center rounded-md text-muted-fg transition-colors hover:bg-usns-green-light hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        aria-label={DATA_TABLE_COPY.actionsLabel}
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
      >
        <MoreHorizontal className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
      </button>
      {open ? (
        <ul
          id={menuId}
          className="absolute right-0 z-30 mt-1 min-w-[160px] rounded-md border border-border bg-surface-elevated py-1 shadow-[var(--shadow-e3)]"
        >
          {visibleActions.map((action) => {
            const Icon = action.icon;
            return (
              <li key={action.id}>
                <button
                  type="button"
                  onClick={() => {
                    action.onSelect(row);
                    close();
                  }}
                  className={`flex w-full min-h-11 items-center gap-2 px-3 text-left text-[13px] transition-colors hover:bg-usns-green-light/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent ${
                    action.destructive ? "text-danger" : "text-foreground"
                  }`}
                >
                  {Icon ? (
                    <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                  ) : null}
                  {action.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

export function DataTableBody<TRow extends DataTableRowBase>({
  columns,
  rows,
  enableSelection = false,
  selectedIds,
  onToggleRowSelection,
  rowActions = [],
  isLoading = false,
  loadingRowCount = 5,
}: DataTableBodyProps<TRow>) {
  const hasActions = rowActions.length > 0;

  if (isLoading) {
    return (
      <SkeletonTable
        asTableBody
        columns={columns.length}
        rows={loadingRowCount}
        showSelection={enableSelection}
        showActions={hasActions}
      />
    );
  }

  return (
    <tbody>
      {rows.map((row) => (
        <tr
          key={row.id}
          className="border-b border-border transition-colors hover:bg-usns-green-light/40"
        >
          {enableSelection ? (
            <td className="px-2 py-3">
              <Checkbox
                checked={selectedIds.has(row.id)}
                onChange={() => {
                  onToggleRowSelection(row.id);
                }}
                aria-label={DATA_TABLE_COPY.selectRowLabel}
              />
            </td>
          ) : null}
          {columns.map((column) => (
            <td
              key={column.id}
              className={`min-h-12 px-4 py-3 text-[15px] text-foreground ${
                column.priority
                  ? "sticky left-0 z-10 bg-surface-elevated shadow-[2px_0_4px_-2px_var(--border)]"
                  : ""
              } ${column.className ?? ""}`}
            >
              {column.cell
                ? column.cell(row)
                : column.accessorKey
                  ? String(row[column.accessorKey] ?? "")
                  : getCellValue(row, column)}
            </td>
          ))}
          {hasActions ? (
            <td className="sticky right-0 z-10 bg-surface-elevated px-4 py-3 shadow-[-2px_0_4px_-2px_var(--border)]">
              <RowActionsMenu row={row} actions={rowActions} />
            </td>
          ) : null}
        </tr>
      ))}
    </tbody>
  );
}
