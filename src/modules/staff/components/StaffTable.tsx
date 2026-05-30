"use client";

import { Eye, Pencil, Trash2, UserCheck, UserX } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  STAFF_COPY,
  STAFF_SHARED_COPY,
} from "@/constants/staff-management.constants";
import { staffDetailRoute } from "@/constants/routes.constants";
import { usePermissions } from "@/modules/auth/hooks/usePermissions";
import { PERMISSIONS } from "@/types/permission.types";
import type {
  DataTableAction,
  DataTableColumn,
} from "@/types/data-table.types";
import type { AdministrativeStaff } from "../types/staff.types";

interface StaffTableProps {
  rows: AdministrativeStaff[];
  page: number;
  perPage: number;
  total: number;
  isLoading: boolean;
  isError: boolean;
  onSearch: (query: string) => void;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  onRetry: () => void;
  onView: (member: AdministrativeStaff) => void;
  onEdit: (member: AdministrativeStaff) => void;
  onDelete: (member: AdministrativeStaff) => void;
  onStatusChange: (
    member: AdministrativeStaff,
    action: "activate" | "deactivate",
  ) => void;
}

function departmentOfficeLabel(row: AdministrativeStaff): string {
  if (row.departmentName) return row.departmentName;
  return row.office;
}

export function StaffTable({
  rows,
  page,
  perPage,
  total,
  isLoading,
  isError,
  onSearch,
  onPageChange,
  onPerPageChange,
  onRetry,
  onView,
  onEdit,
  onDelete,
  onStatusChange,
}: StaffTableProps) {
  const { can } = usePermissions();

  const columns = useMemo<readonly DataTableColumn<AdministrativeStaff>[]>(
    () => [
      {
        id: "name",
        header: STAFF_COPY.columnName,
        cell: (row) => (
          <Link
            href={staffDetailRoute(row.id)}
            className="font-medium text-foreground hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            {row.fullName}
          </Link>
        ),
        sortable: true,
        searchable: true,
        priority: true,
      },
      {
        id: "employeeId",
        header: STAFF_COPY.columnEmployeeId,
        cell: (row) => (
          <span className="font-mono text-[13px]">{row.employeeId}</span>
        ),
      },
      {
        id: "departmentOffice",
        header: STAFF_COPY.columnDepartmentOffice,
        cell: (row) => departmentOfficeLabel(row),
      },
      {
        id: "position",
        header: STAFF_COPY.columnPosition,
        cell: (row) => row.position,
      },
      {
        id: "status",
        header: STAFF_COPY.columnStatus,
        cell: (row) => <StatusBadge status={row.status} />,
      },
    ],
    [],
  );

  const rowActions = useMemo((): readonly DataTableAction<AdministrativeStaff>[] => {
    const actions: DataTableAction<AdministrativeStaff>[] = [
      {
        id: "view",
        label: STAFF_SHARED_COPY.viewAction,
        icon: Eye,
        onSelect: onView,
      },
    ];
    if (can(PERMISSIONS.staff.manage)) {
      actions.push(
        {
          id: "edit",
          label: STAFF_SHARED_COPY.editAction,
          icon: Pencil,
          onSelect: onEdit,
        },
        {
          id: "activate",
          label: STAFF_SHARED_COPY.activateAction,
          icon: UserCheck,
          isVisible: (row) => row.status !== "active",
          onSelect: (row) => onStatusChange(row, "activate"),
        },
        {
          id: "deactivate",
          label: STAFF_SHARED_COPY.deactivateAction,
          icon: UserX,
          isVisible: (row) => row.status === "active",
          onSelect: (row) => onStatusChange(row, "deactivate"),
        },
        {
          id: "delete",
          label: STAFF_SHARED_COPY.deleteAction,
          icon: Trash2,
          destructive: true,
          onSelect: onDelete,
        },
      );
    }
    return actions;
  }, [can, onDelete, onEdit, onStatusChange, onView]);

  return (
    <DataTable
      columns={columns}
      data={rows}
      searchMode="server"
      isLoading={isLoading}
      isError={isError}
      errorTitle={STAFF_SHARED_COPY.errorTitle}
      errorDescription={STAFF_SHARED_COPY.errorDescription}
      onRetry={onRetry}
      onSearch={onSearch}
      pagination={{
        page,
        perPage,
        total,
        onPageChange,
        onPerPageChange,
      }}
      rowActions={rowActions}
      emptyState={
        <div className="px-6 py-12 text-center">
          <p className="text-[18px] font-semibold text-foreground">
            {STAFF_COPY.emptyTitle}
          </p>
          <p className="mt-2 text-[13px] text-muted-fg">
            {STAFF_COPY.emptyDescription}
          </p>
        </div>
      }
      ariaLabel="Administrative staff table"
    />
  );
}
