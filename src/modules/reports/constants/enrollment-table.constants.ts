import { REPORTS_COPY } from "./reports-management.constants";
import type { DataTableColumn } from "@/types/data-table.types";
import type { EnrollmentDepartmentRow } from "../types/enrollment-report.types";

export const ENROLLMENT_DEPARTMENT_COLUMNS: readonly DataTableColumn<EnrollmentDepartmentRow>[] =
  [
    {
      id: "department",
      header: REPORTS_COPY.colDepartment,
      accessorKey: "department",
      sortable: true,
      searchable: true,
      priority: true,
    },
    {
      id: "enrolled",
      header: REPORTS_COPY.colEnrolled,
      accessorKey: "enrolled",
      sortable: true,
    },
    {
      id: "newEnrollments",
      header: REPORTS_COPY.colNewEnrollments,
      accessorKey: "newEnrollments",
      sortable: true,
    },
    {
      id: "withdrawals",
      header: REPORTS_COPY.colWithdrawals,
      accessorKey: "withdrawals",
      sortable: true,
    },
    {
      id: "completionRate",
      header: REPORTS_COPY.colCompletionRate,
      accessorKey: "completionRate",
      sortable: true,
    },
  ];
