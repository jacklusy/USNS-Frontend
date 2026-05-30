"use client";

import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/Checkbox";
import { DATA_TABLE_COPY } from "@/constants/data-table.constants";
import type {
  DataTableColumn,
  DataTableRowBase,
  DataTableSortState,
} from "@/types/data-table.types";

interface DataTableHeadProps<TRow extends DataTableRowBase> {
  columns: readonly DataTableColumn<TRow>[];
  sortState: DataTableSortState;
  onSort: (columnId: string) => void;
  enableSelection?: boolean;
  allPageRowIds: string[];
  selectedIds: Set<string>;
  onToggleSelectAll: (rowIds: string[]) => void;
  hasActions?: boolean;
}

export function DataTableHead<TRow extends DataTableRowBase>({
  columns,
  sortState,
  onSort,
  enableSelection = false,
  allPageRowIds,
  selectedIds,
  onToggleSelectAll,
  hasActions = false,
}: DataTableHeadProps<TRow>) {
  const allSelected =
    allPageRowIds.length > 0 &&
    allPageRowIds.every((id) => selectedIds.has(id));
  const someSelected =
    allPageRowIds.some((id) => selectedIds.has(id)) && !allSelected;

  return (
    <thead className="sticky top-0 z-20 bg-surface-elevated">
      <tr className="border-b border-border">
        {enableSelection ? (
          <th scope="col" className="w-12 px-2 py-3">
            <Checkbox
              checked={allSelected}
              indeterminate={someSelected}
              onChange={() => {
                onToggleSelectAll(allPageRowIds);
              }}
              aria-label={DATA_TABLE_COPY.selectAllLabel}
            />
          </th>
        ) : null}
        {columns.map((column) => {
          const isSorted = sortState?.columnId === column.id;
          const sortIcon = !column.sortable ? null : isSorted ? (
            sortState.direction === "asc" ? (
              <ArrowUp className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            ) : (
              <ArrowDown className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            )
          ) : (
            <ArrowUpDown
              className="h-4 w-4 text-muted-fg"
              strokeWidth={1.75}
              aria-hidden="true"
            />
          );

          return (
            <th
              key={column.id}
              scope="col"
              aria-sort={
                column.sortable && isSorted
                  ? sortState.direction === "asc"
                    ? "ascending"
                    : "descending"
                  : column.sortable
                    ? "none"
                    : undefined
              }
              className={`px-4 py-3 text-left text-[12px] font-medium uppercase tracking-[0.04em] text-muted-fg ${
                column.priority
                  ? "sticky left-0 z-10 bg-surface-elevated shadow-[2px_0_4px_-2px_var(--border)]"
                  : ""
              } ${column.className ?? ""}`}
            >
              {column.sortable ? (
                <button
                  type="button"
                  onClick={() => {
                    onSort(column.id);
                  }}
                  className="inline-flex min-h-11 items-center gap-1.5 text-muted-fg transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  {column.header}
                  {sortIcon}
                </button>
              ) : (
                column.header
              )}
            </th>
          );
        })}
        {hasActions ? (
          <th
            scope="col"
            className="sticky right-0 z-10 bg-surface-elevated px-4 py-3 text-right text-[12px] font-medium uppercase tracking-[0.04em] text-muted-fg shadow-[-2px_0_4px_-2px_var(--border)]"
          >
            {DATA_TABLE_COPY.actionsLabel}
          </th>
        ) : null}
      </tr>
    </thead>
  );
}
