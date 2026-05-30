"use client";

import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DataTable } from "@/components/shared/DataTable";
import { ConfirmationDialog } from "@/components/ui/ConfirmationDialog";
import { SingleSelect } from "@/components/ui/select";
import {
  ACADEMIC_SHARED_COPY,
  DEPARTMENTS_COPY,
} from "@/constants/academic-management.constants";
import { departmentDetailRoute } from "@/constants/routes.constants";
import { useToast } from "@/hooks/useToast";
import { useCollegeOptions } from "@/modules/academic/hooks/useCollegeOptions";
import type { DataTableColumn, DataTableAction } from "@/types/data-table.types";
import type { Department } from "@/modules/academic/types/academic.types";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useDepartmentList } from "../hooks/useDepartmentList";
import {
  useDeleteDepartment,
} from "../hooks/useDepartmentMutations";
import { DepartmentFormDrawer } from "./DepartmentFormDrawer";

const SEARCH_DEBOUNCE_MS = 300;

export function DepartmentsPageContent() {
  const toast = useToast();
  const searchParams = useSearchParams();
  const collegeFromUrl = searchParams.get("collegeId") ?? "";
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [collegeFilter, setCollegeFilter] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [drawerDept, setDrawerDept] = useState<Department | null>(null);
  const [drawerMode, setDrawerMode] = useState<"edit" | "view">("edit");
  const [pendingDelete, setPendingDelete] = useState<Department | null>(null);
  const collegeOptions = useCollegeOptions();
  const deleteMutation = useDeleteDepartment();

  const listQuery = useDepartmentList({
    page,
    per_page: perPage,
    search: debouncedSearch || undefined,
    collegeId: collegeFilter || collegeFromUrl || undefined,
  });

  const columns: readonly DataTableColumn<Department>[] = useMemo(
    () => [
      {
        id: "name",
        header: "Department",
        cell: (row) => (
          <Link href={departmentDetailRoute(row.id)} className="font-medium text-foreground hover:text-brand">
            {row.name}
          </Link>
        ),
        priority: true,
      },
      { id: "code", header: "Code", cell: (row) => row.code },
      { id: "college", header: DEPARTMENTS_COPY.columnCollege, cell: (row) => row.collegeName },
      { id: "head", header: DEPARTMENTS_COPY.columnHead, cell: (row) => row.headName },
      { id: "status", header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
    ],
    [],
  );

  const rowActions: readonly DataTableAction<Department>[] = [
    { id: "view", label: ACADEMIC_SHARED_COPY.viewAction, icon: Eye, onSelect: (row) => { setDrawerDept(row); setDrawerMode("view"); } },
    { id: "edit", label: ACADEMIC_SHARED_COPY.editAction, icon: Pencil, onSelect: (row) => { setDrawerDept(row); setDrawerMode("edit"); } },
    { id: "delete", label: ACADEMIC_SHARED_COPY.deleteAction, icon: Trash2, destructive: true, onSelect: setPendingDelete },
  ];

  const confirmDelete = useCallback(() => {
    if (!pendingDelete) return;
    deleteMutation.mutate(pendingDelete.id, {
      onSuccess: () => {
        toast.success({ title: DEPARTMENTS_COPY.toastDeleted });
        setPendingDelete(null);
      },
    });
  }, [deleteMutation, pendingDelete, toast]);

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[24px] font-semibold md:text-[32px]">{DEPARTMENTS_COPY.pageTitle}</h1>
          <p className="mt-1 text-[15px] text-muted-fg">{DEPARTMENTS_COPY.pageDescription}</p>
        </div>
        <button
          type="button"
          className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-brand px-4 text-[15px] font-medium text-white"
          onClick={() => setCreateOpen(true)}
        >
          {DEPARTMENTS_COPY.createButton}
        </button>
      </div>
      <div className="max-w-xs">
        <SingleSelect
          id="dept-college-filter"
          aria-label={DEPARTMENTS_COPY.filterCollege}
          options={[{ value: "", label: DEPARTMENTS_COPY.filterCollegePlaceholder }, ...(collegeOptions.data ?? [])]}
          value={collegeFilter || collegeFromUrl}
          onChange={(value) => {
            setCollegeFilter(value ?? "");
            setPage(1);
          }}
        />
      </div>
      <DataTable
        columns={columns}
        data={listQuery.data?.data ?? []}
        searchMode="server"
        isLoading={listQuery.isLoading}
        isError={listQuery.isError}
        onSearch={(q) => {
          window.setTimeout(() => setDebouncedSearch(q.trim()), SEARCH_DEBOUNCE_MS);
          setPage(1);
        }}
        onRetry={() => void listQuery.refetch()}
        pagination={{
          page,
          perPage,
          total: listQuery.data?.meta.total ?? 0,
          onPageChange: setPage,
          onPerPageChange: (n) => { setPerPage(n); setPage(1); },
        }}
        rowActions={rowActions}
        ariaLabel="Departments table"
      />
      <DepartmentFormDrawer open={createOpen} mode="create" onClose={() => setCreateOpen(false)} />
      <DepartmentFormDrawer open={Boolean(drawerDept)} mode={drawerMode} department={drawerDept} onClose={() => setDrawerDept(null)} />
      <ConfirmationDialog
        open={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(null)}
        title={DEPARTMENTS_COPY.deleteTitle}
        description={DEPARTMENTS_COPY.deleteDescription}
        confirmLabel={ACADEMIC_SHARED_COPY.deleteAction}
        cancelLabel="Cancel"
        destructive
        loading={deleteMutation.isPending}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
