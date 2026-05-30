"use client";

import { Eye, Pencil, Trash2, UserCheck, UserX } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  ACADEMIC_SHARED_COPY,
  COLLEGES_COPY,
} from "@/constants/academic-management.constants";
import { collegeDetailRoute } from "@/constants/routes.constants";
import type {
  DataTableAction,
  DataTableColumn,
} from "@/types/data-table.types";
import type { College } from "@/modules/academic/types/academic.types";

interface CollegesTableProps {
  rows: College[];
  page: number;
  perPage: number;
  total: number;
  isLoading: boolean;
  isError: boolean;
  onSearch: (query: string) => void;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  onRetry: () => void;
  onView: (college: College) => void;
  onEdit: (college: College) => void;
  onDelete: (college: College) => void;
  onStatusChange: (college: College, action: "activate" | "deactivate") => void;
}

export function CollegesTable({
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
}: CollegesTableProps) {
  const columns = useMemo<readonly DataTableColumn<College>[]>(
    () => [
      {
        id: "name",
        header: "College",
        cell: (row) => (
          <div className="flex flex-col gap-0.5">
            <Link
              href={collegeDetailRoute(row.id)}
              className="font-medium text-foreground hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              {row.name}
            </Link>
            <span className="text-[13px] text-muted-fg">{row.code}</span>
          </div>
        ),
        sortable: true,
        searchable: true,
        priority: true,
      },
      {
        id: "dean",
        header: COLLEGES_COPY.columnDean,
        cell: (row) => <span>{row.deanName}</span>,
      },
      {
        id: "departments",
        header: COLLEGES_COPY.columnDepartments,
        cell: (row) => (
          <span className="tabular-nums">{row.departmentCount}</span>
        ),
      },
      {
        id: "students",
        header: COLLEGES_COPY.columnStudents,
        cell: (row) => (
          <span className="tabular-nums">{row.studentCount}</span>
        ),
      },
      {
        id: "status",
        header: COLLEGES_COPY.columnStatus,
        cell: (row) => <StatusBadge status={row.status} />,
      },
    ],
    [],
  );

  const rowActions = useMemo<readonly DataTableAction<College>[]>(
    () => [
      {
        id: "view",
        label: ACADEMIC_SHARED_COPY.viewAction,
        icon: Eye,
        onSelect: onView,
      },
      {
        id: "edit",
        label: ACADEMIC_SHARED_COPY.editAction,
        icon: Pencil,
        onSelect: onEdit,
      },
      {
        id: "activate",
        label: ACADEMIC_SHARED_COPY.activateAction,
        icon: UserCheck,
        isVisible: (row) => row.status !== "active",
        onSelect: (row) => onStatusChange(row, "activate"),
      },
      {
        id: "deactivate",
        label: ACADEMIC_SHARED_COPY.deactivateAction,
        icon: UserX,
        isVisible: (row) => row.status === "active",
        onSelect: (row) => onStatusChange(row, "deactivate"),
      },
      {
        id: "delete",
        label: ACADEMIC_SHARED_COPY.deleteAction,
        icon: Trash2,
        destructive: true,
        onSelect: onDelete,
      },
    ],
    [onDelete, onEdit, onStatusChange, onView],
  );

  return (
    <DataTable
      columns={columns}
      data={rows}
      searchMode="server"
      isLoading={isLoading}
      isError={isError}
      errorTitle={ACADEMIC_SHARED_COPY.errorTitle}
      errorDescription={ACADEMIC_SHARED_COPY.errorDescription}
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
            {ACADEMIC_SHARED_COPY.emptyTitle}
          </p>
          <p className="mt-2 text-[13px] text-muted-fg">
            {ACADEMIC_SHARED_COPY.emptyDescription}
          </p>
        </div>
      }
      ariaLabel="Colleges table"
    />
  );
}
