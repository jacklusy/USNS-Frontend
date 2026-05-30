import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { Permission } from "@/types/permission.types";

export type DataTableRowId = string;

export interface DataTableRowBase {
  id: DataTableRowId;
}

export type DataTableSortDirection = "asc" | "desc";

export interface DataTableColumn<TRow extends DataTableRowBase> {
  id: string;
  header: string;
  accessorKey?: keyof TRow;
  cell?: (row: TRow) => ReactNode;
  sortable?: boolean;
  searchable?: boolean;
  priority?: boolean;
  visible?: boolean;
  className?: string;
}

export interface DataTableAction<TRow extends DataTableRowBase> {
  id: string;
  label: string;
  icon?: LucideIcon;
  onSelect: (row: TRow) => void;
  requiredPermission?: Permission;
  destructive?: boolean;
  /** When set, the action is shown only for rows where this returns true. */
  isVisible?: (row: TRow) => boolean;
}

export interface DataTableBulkAction<TRow extends DataTableRowBase> {
  id: string;
  label: string;
  onAction: (rows: TRow[]) => void;
  requiredPermission?: Permission;
}

export interface DataTablePaginationProps {
  page: number;
  perPage: number;
  total: number;
  onPageChange: (page: number) => void;
  onPerPageChange?: (perPage: number) => void;
}

export type DataTableSearchMode = "client" | "server";

export type DataTableSortState = {
  columnId: string;
  direction: DataTableSortDirection;
} | null;
