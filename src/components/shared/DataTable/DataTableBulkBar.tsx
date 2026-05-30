"use client";

import { usePermissions } from "@/modules/auth/hooks/usePermissions";
import { DATA_TABLE_COPY } from "@/constants/data-table.constants";
import type {
  DataTableBulkAction,
  DataTableRowBase,
} from "@/types/data-table.types";

interface DataTableBulkBarProps<TRow extends DataTableRowBase> {
  selectedRows: TRow[];
  bulkActions: readonly DataTableBulkAction<TRow>[];
  onClearSelection: () => void;
}

export function DataTableBulkBar<TRow extends DataTableRowBase>({
  selectedRows,
  bulkActions,
  onClearSelection,
}: DataTableBulkBarProps<TRow>) {
  const { can } = usePermissions();

  const visibleActions = bulkActions.filter(
    (action) => !action.requiredPermission || can(action.requiredPermission),
  );

  if (selectedRows.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-brand/30 bg-usns-green-light/40 px-4 py-3">
      <p className="text-[13px] font-medium text-foreground">
        {DATA_TABLE_COPY.selectedCount(selectedRows.length)}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        {visibleActions.map((action) => (
          <button
            key={action.id}
            type="button"
            onClick={() => {
              action.onAction(selectedRows);
            }}
            className="inline-flex h-9 items-center justify-center rounded-md border border-brand bg-surface px-3 text-[13px] font-medium text-brand transition-colors hover:bg-usns-green-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            {action.label}
          </button>
        ))}
        <button
          type="button"
          onClick={onClearSelection}
          className="inline-flex h-9 items-center justify-center rounded-md px-3 text-[13px] font-medium text-muted-fg transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
