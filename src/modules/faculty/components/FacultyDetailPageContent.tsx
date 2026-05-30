"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { useMemo } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { ErrorState } from "@/components/shared/ErrorState";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  FACULTY_COPY,
  FACULTY_RANK_LABELS,
} from "@/constants/faculty-management.constants";
import { ROUTES } from "@/constants/routes.constants";
import { useBreadcrumbOverrides } from "@/hooks/useBreadcrumbOverrides";
import type { DataTableColumn } from "@/types/data-table.types";
import type { FacultySemesterAssignment } from "../types/faculty.types";
import { useFacultyDetail } from "../hooks/useFacultyList";

interface FacultyDetailPageContentProps {
  facultyId: string;
}

export function FacultyDetailPageContent({
  facultyId,
}: FacultyDetailPageContentProps) {
  const query = useFacultyDetail(facultyId);
  const detail = query.data?.data;
  const member = detail?.member;
  const assignments = detail?.semesterAssignments ?? [];
  const workload = detail?.workloadCreditHours ?? 0;
  const maxHours = detail?.maxCreditHours ?? 18;
  const overMax = workload > maxHours;
  const workloadPercent = Math.min(100, Math.round((workload / maxHours) * 100));

  const breadcrumbLabels = useMemo(
    () => (member ? { [facultyId]: member.fullName } : {}),
    [facultyId, member],
  );
  useBreadcrumbOverrides(breadcrumbLabels);

  const assignmentColumns: readonly DataTableColumn<FacultySemesterAssignment>[] =
    [
      {
        id: "code",
        header: "Code",
        cell: (row) => row.courseCode,
      },
      {
        id: "name",
        header: "Course",
        cell: (row) => row.courseName,
      },
      {
        id: "credits",
        header: "Credits",
        cell: (row) => (
          <span className="tabular-nums">{row.creditHours}</span>
        ),
      },
      {
        id: "term",
        header: "Term",
        cell: (row) => row.semesterLabel,
      },
    ];

  if (query.isLoading) {
    return <div className="h-48 animate-pulse rounded-lg bg-border" />;
  }

  if (!member) {
    return (
      <ErrorState
        title={FACULTY_COPY.notFoundTitle}
        description={FACULTY_COPY.notFoundDescription}
        onRetry={() => void query.refetch()}
      />
    );
  }

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-6">
      <Link href={ROUTES.FACULTY} className="text-brand hover:underline">
        {FACULTY_COPY.backToList}
      </Link>
      <section className="rounded-lg border border-border bg-surface-elevated p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-semibold">{member.fullName}</h1>
            <p className="text-muted-fg">
              {member.employeeId} · {FACULTY_RANK_LABELS[member.rank]}
            </p>
          </div>
          <StatusBadge status={member.status} />
        </div>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-[12px] font-medium uppercase tracking-wide text-muted-fg">
              {FACULTY_COPY.fieldEmail}
            </dt>
            <dd className="mt-1">{member.email}</dd>
          </div>
          <div>
            <dt className="text-[12px] font-medium uppercase tracking-wide text-muted-fg">
              {FACULTY_COPY.fieldPhone}
            </dt>
            <dd className="mt-1">{member.phone}</dd>
          </div>
          <div>
            <dt className="text-[12px] font-medium uppercase tracking-wide text-muted-fg">
              {FACULTY_COPY.fieldDepartment}
            </dt>
            <dd className="mt-1">{member.departmentName}</dd>
          </div>
          <div>
            <dt className="text-[12px] font-medium uppercase tracking-wide text-muted-fg">
              {FACULTY_COPY.fieldSpecialization}
            </dt>
            <dd className="mt-1">{member.specialization}</dd>
          </div>
        </dl>
      </section>
      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-surface-elevated p-5">
          <h2 className="text-[13px] font-medium uppercase text-muted-fg">
            {FACULTY_COPY.sectionPublications}
          </h2>
          <p className="mt-2 font-mono text-[32px] font-semibold tabular-nums">
            {member.publicationsCount}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-surface-elevated p-5">
          <h2 className="text-[13px] font-medium uppercase text-muted-fg">
            {FACULTY_COPY.sectionWorkload}
          </h2>
          <p className="mt-2 font-mono text-[32px] font-semibold tabular-nums">
            {workload}
            <span className="text-[15px] font-normal text-muted-fg">
              {" "}
              / {maxHours} {FACULTY_COPY.workloadMax}
            </span>
          </p>
          <div
            className="mt-4 h-2 overflow-hidden rounded-full bg-border"
            role="progressbar"
            aria-valuenow={workload}
            aria-valuemin={0}
            aria-valuemax={maxHours}
            aria-label={FACULTY_COPY.workloadAssigned}
          >
            <div
              className={`h-full transition-[width] duration-240 ${
                overMax ? "bg-warn" : "bg-brand"
              }`}
              style={{ width: `${workloadPercent}%` }}
            />
          </div>
          {overMax ? (
            <p className="mt-3 flex items-center gap-2 text-[13px] text-warn">
              <AlertTriangle
                className="h-4 w-4 shrink-0"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              {FACULTY_COPY.workloadOver}
            </p>
          ) : (
            <p className="mt-3 text-[13px] text-muted-fg">
              {FACULTY_COPY.workloadAssigned}
            </p>
          )}
        </div>
      </section>
      <section>
        <h2 className="text-[18px] font-semibold">
          {FACULTY_COPY.sectionSemesterCourses}
        </h2>
        <p className="text-[13px] text-muted-fg">
          {FACULTY_COPY.sectionSemesterSubtitle}
        </p>
        <div className="mt-3">
          <DataTable
            columns={assignmentColumns}
            data={assignments}
            enableClientPagination
            clientPerPage={10}
            ariaLabel="Faculty semester courses"
            emptyState={
              <p className="px-6 py-8 text-center text-[13px] text-muted-fg">
                No courses assigned for this semester.
              </p>
            }
          />
        </div>
      </section>
    </div>
  );
}
