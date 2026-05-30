"use client";

import Link from "next/link";
import { useMemo } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { ErrorState } from "@/components/shared/ErrorState";
import { SkeletonCard } from "@/components/ui/loading-skeleton";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  DEPARTMENTS_COPY,
  COURSES_COPY,
} from "@/constants/academic-management.constants";
import {
  ROUTES,
  collegeDetailRoute,
  courseDetailRoute,
} from "@/constants/routes.constants";
import { useBreadcrumbOverrides } from "@/hooks/useBreadcrumbOverrides";
import type { DataTableColumn } from "@/types/data-table.types";
import type { Course } from "@/modules/academic/types/academic.types";
import { useDepartmentDetail } from "../hooks/useDepartmentDetail";

interface DepartmentDetailPageContentProps {
  departmentId: string;
}

export function DepartmentDetailPageContent({
  departmentId,
}: DepartmentDetailPageContentProps) {
  const detailQuery = useDepartmentDetail(departmentId);
  const detail = detailQuery.data?.data;
  const department = detail?.department;
  const courses = detail?.courses ?? [];

  const breadcrumbLabels = useMemo(
    () =>
      department
        ? {
            [department.collegeId]: department.collegeName,
            [departmentId]: department.name,
          }
        : {},
    [department, departmentId],
  );
  useBreadcrumbOverrides(breadcrumbLabels);

  const courseColumns: readonly DataTableColumn<Course>[] = [
    {
      id: "code",
      header: COURSES_COPY.fieldCode,
      cell: (row) => (
        <Link href={courseDetailRoute(row.id)} className="font-medium hover:text-brand">
          {row.code}
        </Link>
      ),
    },
    { id: "name", header: COURSES_COPY.fieldName, cell: (row) => row.name },
    {
      id: "credits",
      header: COURSES_COPY.columnCredits,
      cell: (row) => <span className="tabular-nums">{row.creditHours}</span>,
    },
    {
      id: "status",
      header: "Status",
      cell: (row) => <StatusBadge status={row.status} />,
    },
  ];

  if (detailQuery.isLoading) {
    return (
      <div className="mx-auto max-w-[1200px]">
        <SkeletonCard contentHeight={200} />
      </div>
    );
  }

  if (!department) {
    return (
      <ErrorState
        title="Department not found"
        description="Unable to load this department."
        onRetry={() => void detailQuery.refetch()}
      />
    );
  }

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-6">
      <Link href={ROUTES.DEPARTMENTS} className="text-[15px] text-brand hover:underline">
        {DEPARTMENTS_COPY.detailBack}
      </Link>
      <p className="text-[13px] text-muted-fg">
        <Link href={collegeDetailRoute(department.collegeId)} className="hover:text-brand">
          {department.collegeName}
        </Link>
        <span aria-hidden="true"> / </span>
        <span>{department.name}</span>
      </p>
      <section className="rounded-lg border border-border bg-surface-elevated p-6">
        <div className="flex justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-semibold">{department.name}</h1>
            <p className="text-muted-fg">{department.code}</p>
          </div>
          <StatusBadge status={department.status} />
        </div>
        <p className="mt-4 text-[15px]">{department.description}</p>
        <p className="mt-2 text-[13px] text-muted-fg">
          {DEPARTMENTS_COPY.fieldHead}: {department.headName}
        </p>
      </section>
      <section className="rounded-lg border border-border bg-surface-elevated p-6">
        <h2 className="text-[18px] font-semibold">{DEPARTMENTS_COPY.staffCountTitle}</h2>
        <p className="mt-2 text-[32px] font-semibold tabular-nums">{department.staffCount}</p>
        <p className="text-[13px] text-muted-fg">{DEPARTMENTS_COPY.staffCountDescription}</p>
      </section>
      <section>
        <h2 className="mb-3 text-[18px] font-semibold">{DEPARTMENTS_COPY.linkedCoursesTitle}</h2>
        <DataTable columns={courseColumns} data={courses} enableClientPagination clientPerPage={10} ariaLabel="Department courses" />
      </section>
    </div>
  );
}
