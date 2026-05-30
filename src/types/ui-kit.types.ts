import type { DataTableRowBase } from "@/types/data-table.types";

export interface UiKitUserRow extends DataTableRowBase {
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
}
