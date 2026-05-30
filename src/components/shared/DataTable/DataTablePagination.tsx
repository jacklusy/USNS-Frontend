import { Pagination } from "@/components/shared/Pagination";
import type { DataTablePaginationProps } from "@/types/data-table.types";

interface DataTablePaginationComponentProps extends DataTablePaginationProps {
  disabled?: boolean;
}

export function DataTablePagination({
  page,
  perPage,
  total,
  onPageChange,
  onPerPageChange,
  disabled = false,
}: DataTablePaginationComponentProps) {
  return (
    <Pagination
      page={page}
      perPage={perPage}
      total={total}
      onPageChange={onPageChange}
      onPerPageChange={onPerPageChange}
      disabled={disabled}
    />
  );
}
