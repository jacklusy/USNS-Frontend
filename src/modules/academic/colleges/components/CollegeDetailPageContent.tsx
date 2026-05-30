"use client";

import Link from "next/link";
import { ArrowLeft, Pencil } from "lucide-react";
import { useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { ErrorState } from "@/components/shared/ErrorState";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SkeletonCard } from "@/components/ui/loading-skeleton";
import {
  COLLEGES_COPY,
  ACADEMIC_SHARED_COPY,
} from "@/constants/academic-management.constants";
import {
  ROUTES,
  departmentDetailRoute,
  userDetailRoute,
} from "@/constants/routes.constants";
import type { DataTableColumn } from "@/types/data-table.types";
import type { Department } from "@/modules/academic/types/academic.types";
import { useCollegeDetail } from "../hooks/useCollegeDetail";
import { CollegeFormDrawer } from "./CollegeFormDrawer";

interface CollegeDetailPageContentProps {
  collegeId: string;
}

export function CollegeDetailPageContent({
  collegeId,
}: CollegeDetailPageContentProps) {
  const detailQuery = useCollegeDetail(collegeId);
  const [editOpen, setEditOpen] = useState(false);

  const detail = detailQuery.data?.data;
  const college = detail?.college;
  const departments = detail?.departments ?? [];

  const deptColumns: readonly DataTableColumn<Department>[] = [
    {
      id: "name",
      header: "Department",
      cell: (row) => (
        <Link
          href={departmentDetailRoute(row.id)}
          className="font-medium text-foreground hover:text-brand"
        >
          {row.name}
        </Link>
      ),
      priority: true,
    },
    {
      id: "code",
      header: "Code",
      cell: (row) => <span className="text-muted-fg">{row.code}</span>,
    },
    {
      id: "status",
      header: "Status",
      cell: (row) => <StatusBadge status={row.status} />,
    },
  ];

  if (detailQuery.isLoading) {
    return (
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6">
        <SkeletonCard contentHeight={120} />
        <SkeletonCard contentHeight={240} />
      </div>
    );
  }

  if (detailQuery.isError || !college) {
    return (
      <div className="mx-auto w-full max-w-[1200px]">
        <ErrorState
          title={COLLEGES_COPY.loadErrorTitle}
          description={COLLEGES_COPY.loadErrorDescription}
          onRetry={() => {
            void detailQuery.refetch();
          }}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href={ROUTES.COLLEGES}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-md px-3 text-[15px] font-medium text-foreground hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          {COLLEGES_COPY.detailBack}
        </Link>
        <Button type="button" variant="secondary" onClick={() => setEditOpen(true)}>
          <Pencil className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          {ACADEMIC_SHARED_COPY.editAction}
        </Button>
      </div>
      <section className="rounded-lg border border-border bg-surface-elevated p-6 shadow-[var(--shadow-e1)]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-[24px] font-semibold text-foreground md:text-[32px]">
              {college.name}
            </h1>
            <p className="mt-1 text-[13px] text-muted-fg">{college.code}</p>
          </div>
          <StatusBadge status={college.status} />
        </div>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-[12px] font-medium uppercase tracking-[0.04em] text-muted-fg">
              {COLLEGES_COPY.fieldDean}
            </dt>
            <dd className="mt-1 text-[15px]">
              <Link
                href={userDetailRoute(college.deanUserId)}
                className="text-brand hover:underline"
              >
                {college.deanName}
              </Link>
            </dd>
          </div>
          <div>
            <dt className="text-[12px] font-medium uppercase tracking-[0.04em] text-muted-fg">
              {COLLEGES_COPY.columnDepartments}
            </dt>
            <dd className="mt-1 tabular-nums text-[15px]">
              {college.departmentCount}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-[12px] font-medium uppercase tracking-[0.04em] text-muted-fg">
              {COLLEGES_COPY.fieldDescription}
            </dt>
            <dd className="mt-1 text-[15px] text-foreground">
              {college.description || "—"}
            </dd>
          </div>
        </dl>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-[18px] font-semibold text-foreground">
          {COLLEGES_COPY.linkedDepartmentsTitle}
        </h2>
        <DataTable
          columns={deptColumns}
          data={departments}
          enableClientPagination
          clientPerPage={10}
          emptyState={
            <p className="px-6 py-8 text-center text-[13px] text-muted-fg">
              {COLLEGES_COPY.linkedDepartmentsEmpty}
            </p>
          }
          ariaLabel="College departments"
        />
      </section>
      <CollegeFormDrawer
        open={editOpen}
        mode="edit"
        college={college}
        onClose={() => setEditOpen(false)}
      />
    </div>
  );
}
