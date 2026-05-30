"use client";

import { Columns3, Download, Search } from "lucide-react";
import { useId, useRef, useState, useEffect, useCallback } from "react";
import { DATA_TABLE_COPY } from "@/constants/data-table.constants";
import { getInputClassName } from "@/utils/input-classes";
import type { DataTableColumn, DataTableRowBase } from "@/types/data-table.types";

interface DataTableToolbarProps<TRow extends DataTableRowBase> {
  columns: readonly DataTableColumn<TRow>[];
  visibleColumnIds: Set<string>;
  globalQuery: string;
  columnQueries: Record<string, string>;
  onGlobalQueryChange: (query: string) => void;
  onColumnQueryChange: (columnId: string, query: string) => void;
  onToggleColumnVisibility: (columnId: string) => void;
  onExport?: () => void;
  showColumnFilters?: boolean;
  exportDisabled?: boolean;
}

export function DataTableToolbar<TRow extends DataTableRowBase>({
  columns,
  visibleColumnIds,
  globalQuery,
  columnQueries,
  onGlobalQueryChange,
  onColumnQueryChange,
  onToggleColumnVisibility,
  onExport,
  showColumnFilters = false,
  exportDisabled = false,
}: DataTableToolbarProps<TRow>) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const pickerId = useId();
  const pickerRef = useRef<HTMLDivElement>(null);

  const closePicker = useCallback(() => {
    setPickerOpen(false);
  }, []);

  useEffect(() => {
    if (!pickerOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        closePicker();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closePicker();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [pickerOpen, closePicker]);

  const searchableColumns = columns.filter((column) => column.searchable);

  return (
    <div className="flex flex-col gap-3 border-b border-border px-4 py-3">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-[200px] flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-fg"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <input
            type="search"
            value={globalQuery}
            onChange={(event) => {
              onGlobalQueryChange(event.target.value);
            }}
            placeholder={DATA_TABLE_COPY.searchPlaceholder}
            className={`${getInputClassName(false, false)} pl-9`}
            aria-label={DATA_TABLE_COPY.searchPlaceholder}
          />
        </div>
        <div ref={pickerRef} className="relative">
          <button
            type="button"
            onClick={() => {
              setPickerOpen((prev) => !prev);
            }}
            className="inline-flex h-11 items-center gap-2 rounded-md border border-border bg-surface px-3 text-[13px] font-medium text-foreground transition-colors hover:bg-usns-green-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            aria-expanded={pickerOpen}
            aria-controls={pickerOpen ? pickerId : undefined}
          >
            <Columns3 className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            {DATA_TABLE_COPY.columnsLabel}
          </button>
          {pickerOpen ? (
            <div
              id={pickerId}
              className="absolute right-0 z-30 mt-1 min-w-[180px] rounded-md border border-border bg-surface-elevated py-1 shadow-[var(--shadow-e3)]"
            >
              {columns.map((column) => (
                <label
                  key={column.id}
                  className="flex min-h-11 cursor-pointer items-center gap-2 px-3 text-[13px] text-foreground hover:bg-usns-green-light/40"
                >
                  <input
                    type="checkbox"
                    checked={visibleColumnIds.has(column.id)}
                    onChange={() => {
                      onToggleColumnVisibility(column.id);
                    }}
                    className="h-4 w-4 rounded border-border text-brand focus-visible:ring-2 focus-visible:ring-accent"
                  />
                  {column.header}
                </label>
              ))}
            </div>
          ) : null}
        </div>
        {onExport ? (
          <button
            type="button"
            disabled={exportDisabled}
            onClick={onExport}
            className="inline-flex h-11 items-center gap-2 rounded-md border border-border bg-surface px-3 text-[13px] font-medium text-foreground transition-colors hover:bg-usns-green-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Download className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            {DATA_TABLE_COPY.exportLabel}
          </button>
        ) : null}
      </div>
      {showColumnFilters && searchableColumns.length > 0 ? (
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {searchableColumns.map((column) => (
            <input
              key={column.id}
              type="search"
              value={columnQueries[column.id] ?? ""}
              onChange={(event) => {
                onColumnQueryChange(column.id, event.target.value);
              }}
              placeholder={`${DATA_TABLE_COPY.columnFilterPlaceholder} ${column.header}`}
              className={getInputClassName(false, false)}
              aria-label={`Filter ${column.header}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
