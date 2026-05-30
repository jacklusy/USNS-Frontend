"use client";

import { Inbox } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { EMPTY_STATE_COPY } from "@/constants/empty-state.constants";
import { ERROR_STATE_COPY } from "@/constants/error-state.constants";
import type {
  DataTableAction,
  DataTableBulkAction,
  DataTableColumn,
  DataTablePaginationProps,
  DataTableRowBase,
  DataTableSearchMode,
} from "@/types/data-table.types";
import { DataTableBody } from "./DataTableBody";
import { DataTableBulkBar } from "./DataTableBulkBar";
import { DataTableHead } from "./DataTableHead";
import { DataTablePagination } from "./DataTablePagination";
import { DataTableToolbar } from "./DataTableToolbar";
import { useDataTableState } from "./useDataTableState";

interface DataTableProps<TRow extends DataTableRowBase> {
  columns: readonly DataTableColumn<TRow>[];
  data: TRow[];
  searchMode?: DataTableSearchMode;
  enableSelection?: boolean;
  rowActions?: readonly DataTableAction<TRow>[];
  bulkActions?: readonly DataTableBulkAction<TRow>[];
  pagination?: DataTablePaginationProps;
  enableClientPagination?: boolean;
  clientPerPage?: number;
  onSearch?: (query: string) => void;
  onColumnSearch?: (columnId: string, query: string) => void;
  onSortChange?: (
    columnId: string,
    direction: "asc" | "desc" | null,
  ) => void;
  onExport?: (selectedRows: TRow[]) => void;
  isLoading?: boolean;
  isError?: boolean;
  errorTitle?: string;
  errorDescription?: string;
  onRetry?: () => void;
  emptyState?: ReactNode;
  showColumnFilters?: boolean;
  ariaLabel?: string;
}

export function DataTable<TRow extends DataTableRowBase>({
  columns,
  data,
  searchMode = "client",
  enableSelection = false,
  rowActions = [],
  bulkActions = [],
  pagination,
  enableClientPagination = false,
  clientPerPage = 10,
  onSearch,
  onColumnSearch,
  onSortChange,
  onExport,
  isLoading = false,
  isError = false,
  errorTitle = ERROR_STATE_COPY.defaultTitle,
  errorDescription = ERROR_STATE_COPY.tableLoadError,
  onRetry,
  emptyState,
  showColumnFilters = true,
  ariaLabel = "Data table",
}: DataTableProps<TRow>) {
  const [clientPage, setClientPage] = useState(1);

  const {
    globalQuery,
    setGlobalQuery,
    columnQueries,
    setColumnQuery,
    sortState,
    toggleSort,
    visibleColumns,
    visibleColumnIds,
    toggleColumnVisibility,
    processedRows,
    selectedIds,
    selectedRows,
    toggleRowSelection,
    toggleSelectAll,
    clearSelection,
  } = useDataTableState({
    data,
    columns,
    searchMode,
    enableClientPagination: enableClientPagination && !pagination,
    clientPage,
    clientPerPage,
  });

  const pageRowIds = useMemo(
    () => processedRows.map((row) => row.id),
    [processedRows],
  );

  function handleGlobalQueryChange(query: string) {
    setGlobalQuery(query);
    if (searchMode === "server") {
      onSearch?.(query);
    }
    if (enableClientPagination) {
      setClientPage(1);
    }
  }

  function handleColumnQueryChange(columnId: string, query: string) {
    setColumnQuery(columnId, query);
    if (searchMode === "server") {
      onColumnSearch?.(columnId, query);
    }
    if (enableClientPagination) {
      setClientPage(1);
    }
  }

  function handleSort(columnId: string) {
    toggleSort(columnId);
    if (searchMode === "server" && onSortChange) {
      const next =
        sortState?.columnId === columnId && sortState.direction === "asc"
          ? "desc"
          : sortState?.columnId === columnId && sortState.direction === "desc"
            ? null
            : "asc";
      onSortChange(columnId, next);
    }
  }

  function handleExport() {
    const rows = selectedRows.length > 0 ? selectedRows : data;
    onExport?.(rows);
  }

  const showEmpty =
    !isLoading && !isError && processedRows.length === 0 && data.length === 0;

  const defaultEmpty = (
    <EmptyState
      icon={Inbox}
      title={EMPTY_STATE_COPY.tableNoDataTitle}
      description={EMPTY_STATE_COPY.tableNoDataDescription}
      variant="inPage"
    />
  );

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface-elevated">
      <DataTableToolbar
        columns={columns}
        visibleColumnIds={visibleColumnIds}
        globalQuery={globalQuery}
        columnQueries={columnQueries}
        onGlobalQueryChange={handleGlobalQueryChange}
        onColumnQueryChange={handleColumnQueryChange}
        onToggleColumnVisibility={toggleColumnVisibility}
        onExport={onExport ? handleExport : undefined}
        showColumnFilters={showColumnFilters && searchMode === "client"}
        exportDisabled={isLoading}
      />
      {enableSelection && bulkActions.length > 0 ? (
        <DataTableBulkBar
          selectedRows={selectedRows}
          bulkActions={bulkActions}
          onClearSelection={clearSelection}
        />
      ) : null}
      {isError ? (
        <ErrorState
          title={errorTitle}
          description={errorDescription}
          variant="inPage"
          onRetry={onRetry}
        />
      ) : showEmpty ? (
        emptyState ?? defaultEmpty
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse" aria-label={ariaLabel}>
            <DataTableHead
              columns={visibleColumns}
              sortState={searchMode === "client" ? sortState : null}
              onSort={handleSort}
              enableSelection={enableSelection}
              allPageRowIds={pageRowIds}
              selectedIds={selectedIds}
              onToggleSelectAll={toggleSelectAll}
              hasActions={rowActions.length > 0}
            />
            <DataTableBody
              columns={visibleColumns}
              rows={processedRows}
              enableSelection={enableSelection}
              selectedIds={selectedIds}
              onToggleRowSelection={toggleRowSelection}
              rowActions={rowActions}
              isLoading={isLoading}
              loadingRowCount={clientPerPage}
            />
          </table>
        </div>
      )}
      {pagination && !isError && !showEmpty ? (
        <DataTablePagination {...pagination} disabled={isLoading} />
      ) : null}
    </div>
  );
}
