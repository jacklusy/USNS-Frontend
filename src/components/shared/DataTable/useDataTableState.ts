"use client";

import { useCallback, useMemo, useState } from "react";
import type {
  DataTableColumn,
  DataTableRowBase,
  DataTableSearchMode,
  DataTableSortState,
} from "@/types/data-table.types";
import {
  filterDataTableRows,
  paginateRows,
  sortDataTableRows,
} from "./data-table.utils";

interface UseDataTableStateOptions<TRow extends DataTableRowBase> {
  data: TRow[];
  columns: readonly DataTableColumn<TRow>[];
  searchMode: DataTableSearchMode;
  enableClientPagination?: boolean;
  clientPage?: number;
  clientPerPage?: number;
}

export function useDataTableState<TRow extends DataTableRowBase>({
  data,
  columns,
  searchMode,
  enableClientPagination = false,
  clientPage = 1,
  clientPerPage = 10,
}: UseDataTableStateOptions<TRow>) {
  const [globalQuery, setGlobalQuery] = useState("");
  const [columnQueries, setColumnQueries] = useState<Record<string, string>>(
    {},
  );
  const [sortState, setSortState] = useState<DataTableSortState>(null);
  const [visibleColumnIds, setVisibleColumnIds] = useState<Set<string>>(() => {
    const initial = columns
      .filter((column) => column.visible !== false)
      .map((column) => column.id);
    return new Set(initial);
  });
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const visibleColumns = useMemo(
    () => columns.filter((column) => visibleColumnIds.has(column.id)),
    [columns, visibleColumnIds],
  );

  const processedRows = useMemo(() => {
    if (searchMode === "server") {
      return data;
    }
    let rows = filterDataTableRows(data, columns, globalQuery, columnQueries);
    if (sortState) {
      rows = sortDataTableRows(
        rows,
        columns,
        sortState.columnId,
        sortState.direction,
      );
    }
    if (enableClientPagination) {
      rows = paginateRows(rows, clientPage, clientPerPage);
    }
    return rows;
  }, [
    clientPage,
    clientPerPage,
    columnQueries,
    columns,
    data,
    enableClientPagination,
    globalQuery,
    searchMode,
    sortState,
  ]);

  const toggleSort = useCallback((columnId: string) => {
    setSortState((prev) => {
      if (!prev || prev.columnId !== columnId) {
        return { columnId, direction: "asc" };
      }
      if (prev.direction === "asc") {
        return { columnId, direction: "desc" };
      }
      return null;
    });
  }, []);

  const setColumnQuery = useCallback((columnId: string, query: string) => {
    setColumnQueries((prev) => ({ ...prev, [columnId]: query }));
  }, []);

  const toggleColumnVisibility = useCallback((columnId: string) => {
    setVisibleColumnIds((prev) => {
      const next = new Set(prev);
      if (next.has(columnId)) {
        if (next.size <= 1) {
          return next;
        }
        next.delete(columnId);
      } else {
        next.add(columnId);
      }
      return next;
    });
  }, []);

  const toggleRowSelection = useCallback((rowId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(rowId)) {
        next.delete(rowId);
      } else {
        next.add(rowId);
      }
      return next;
    });
  }, []);

  const toggleSelectAll = useCallback(
    (rowIds: string[]) => {
      setSelectedIds((prev) => {
        const allSelected = rowIds.every((id) => prev.has(id));
        if (allSelected) {
          const next = new Set(prev);
          rowIds.forEach((id) => next.delete(id));
          return next;
        }
        const next = new Set(prev);
        rowIds.forEach((id) => next.add(id));
        return next;
      });
    },
    [],
  );

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const selectedRows = useMemo(
    () => data.filter((row) => selectedIds.has(row.id)),
    [data, selectedIds],
  );

  return {
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
    setSortState,
  };
}
