"use client";

import { Eye, Pencil, Trash2, UserCheck, UserX } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  FACULTY_COPY,
  FACULTY_RANK_LABELS,
  FACULTY_SHARED_COPY,
} from "@/constants/faculty-management.constants";
import { facultyDetailRoute } from "@/constants/routes.constants";
import { usePermissions } from "@/modules/auth/hooks/usePermissions";
import { PERMISSIONS } from "@/types/permission.types";
import type {
  DataTableAction,
  DataTableColumn,
} from "@/types/data-table.types";
import type { FacultyMember } from "../types/faculty.types";

interface FacultyTableProps {
  rows: FacultyMember[];
  page: number;
  perPage: number;
  total: number;
  isLoading: boolean;
  isError: boolean;
  onSearch: (query: string) => void;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  onRetry: () => void;
  onView: (member: FacultyMember) => void;
  onEdit: (member: FacultyMember) => void;
  onDelete: (member: FacultyMember) => void;
  onStatusChange: (
    member: FacultyMember,
    action: "activate" | "deactivate",
  ) => void;
}

export function FacultyTable({
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
}: FacultyTableProps) {
  const { can } = usePermissions();

  const columns = useMemo<readonly DataTableColumn<FacultyMember>[]>(
    () => [
      {
        id: "name",
        header: FACULTY_COPY.columnName,
        cell: (row) => (
          <Link
            href={facultyDetailRoute(row.id)}
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
        header: FACULTY_COPY.columnEmployeeId,
        cell: (row) => <span className="font-mono text-[13px]">{row.employeeId}</span>,
      },
      {
        id: "department",
        header: FACULTY_COPY.columnDepartment,
        cell: (row) => row.departmentName,
      },
      {
        id: "specialization",
        header: FACULTY_COPY.columnSpecialization,
        cell: (row) => row.specialization,
      },
      {
        id: "rank",
        header: FACULTY_COPY.columnRank,
        cell: (row) => FACULTY_RANK_LABELS[row.rank],
      },
      {
        id: "status",
        header: FACULTY_COPY.columnStatus,
        cell: (row) => <StatusBadge status={row.status} />,
      },
    ],
    [],
  );

  const rowActions = useMemo((): readonly DataTableAction<FacultyMember>[] => {
    const actions: DataTableAction<FacultyMember>[] = [
      {
        id: "view",
        label: FACULTY_SHARED_COPY.viewAction,
        icon: Eye,
        onSelect: onView,
      },
    ];
    if (can(PERMISSIONS.faculty.manage)) {
      actions.push(
        {
          id: "edit",
          label: FACULTY_SHARED_COPY.editAction,
          icon: Pencil,
          onSelect: onEdit,
        },
        {
          id: "activate",
          label: FACULTY_SHARED_COPY.activateAction,
          icon: UserCheck,
          isVisible: (row) => row.status !== "active",
          onSelect: (row) => onStatusChange(row, "activate"),
        },
        {
          id: "deactivate",
          label: FACULTY_SHARED_COPY.deactivateAction,
          icon: UserX,
          isVisible: (row) => row.status === "active",
          onSelect: (row) => onStatusChange(row, "deactivate"),
        },
        {
          id: "delete",
          label: FACULTY_SHARED_COPY.deleteAction,
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
      errorTitle={FACULTY_SHARED_COPY.errorTitle}
      errorDescription={FACULTY_SHARED_COPY.errorDescription}
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
            {FACULTY_COPY.emptyTitle}
          </p>
          <p className="mt-2 text-[13px] text-muted-fg">
            {FACULTY_COPY.emptyDescription}
          </p>
        </div>
      }
      ariaLabel="Faculty table"
    />
  );
}
