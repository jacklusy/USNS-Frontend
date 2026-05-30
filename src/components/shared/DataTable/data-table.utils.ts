import type {
  DataTableColumn,
  DataTableRowBase,
  DataTableSortDirection,
} from "@/types/data-table.types";

export function getCellValue<TRow extends DataTableRowBase>(
  row: TRow,
  column: DataTableColumn<TRow>,
): string {
  if (column.cell) {
    return "";
  }
  if (column.accessorKey) {
    const raw = row[column.accessorKey];
    if (raw === null || raw === undefined) {
      return "";
    }
    return String(raw);
  }
  return "";
}

export function compareValues(
  left: string,
  right: string,
  direction: DataTableSortDirection,
): number {
  const result = left.localeCompare(right, undefined, {
    numeric: true,
    sensitivity: "base",
  });
  return direction === "asc" ? result : -result;
}

export function sortDataTableRows<TRow extends DataTableRowBase>(
  rows: TRow[],
  columns: readonly DataTableColumn<TRow>[],
  columnId: string,
  direction: DataTableSortDirection,
): TRow[] {
  const column = columns.find((item) => item.id === columnId);
  if (!column) {
    return rows;
  }
  return [...rows].sort((left, right) =>
    compareValues(
      getCellValue(left, column),
      getCellValue(right, column),
      direction,
    ),
  );
}

export function filterDataTableRows<TRow extends DataTableRowBase>(
  rows: TRow[],
  columns: readonly DataTableColumn<TRow>[],
  globalQuery: string,
  columnQueries: Record<string, string>,
): TRow[] {
  const normalizedGlobal = globalQuery.trim().toLowerCase();

  return rows.filter((row) => {
    const globalMatch =
      !normalizedGlobal ||
      columns.some((column) => {
        const value = getCellValue(row, column).toLowerCase();
        return value.includes(normalizedGlobal);
      });

    if (!globalMatch) {
      return false;
    }

    return Object.entries(columnQueries).every(([columnId, query]) => {
      const normalizedColumn = query.trim().toLowerCase();
      if (!normalizedColumn) {
        return true;
      }
      const column = columns.find((item) => item.id === columnId);
      if (!column) {
        return true;
      }
      return getCellValue(row, column)
        .toLowerCase()
        .includes(normalizedColumn);
    });
  });
}

export function paginateRows<TRow>(
  rows: TRow[],
  page: number,
  perPage: number,
): TRow[] {
  const start = (page - 1) * perPage;
  return rows.slice(start, start + perPage);
}
