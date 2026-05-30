import { ChevronLeft, ChevronRight } from "lucide-react";
import { DATA_TABLE_COPY } from "@/constants/data-table.constants";
import type { DataTablePaginationProps } from "@/types/data-table.types";

interface DataTablePaginationComponentProps extends DataTablePaginationProps {
  disabled?: boolean;
}

export function DataTablePagination({
  page,
  perPage,
  total,
  onPageChange,
  disabled = false,
}: DataTablePaginationComponentProps) {
  const lastPage = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(Math.max(1, page), lastPage);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3">
      <p className="text-[13px] text-muted-fg">
        {DATA_TABLE_COPY.pageLabel} {safePage} {DATA_TABLE_COPY.ofLabel}{" "}
        {lastPage} · {total} total
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={disabled || safePage <= 1}
          onClick={() => {
            onPageChange(safePage - 1);
          }}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-usns-green-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={DATA_TABLE_COPY.previousPage}
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
        </button>
        <button
          type="button"
          disabled={disabled || safePage >= lastPage}
          onClick={() => {
            onPageChange(safePage + 1);
          }}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-usns-green-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={DATA_TABLE_COPY.nextPage}
        >
          <ChevronRight className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
