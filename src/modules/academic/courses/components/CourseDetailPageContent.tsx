"use client";

import Link from "next/link";
import { DataTable } from "@/components/shared/DataTable";
import { ErrorState } from "@/components/shared/ErrorState";
import { COURSES_COPY } from "@/constants/academic-management.constants";
import { ROUTES } from "@/constants/routes.constants";
import type { DataTableColumn } from "@/types/data-table.types";
import type { CourseSection } from "@/modules/academic/types/academic.types";
import { useCourseDetail } from "../hooks/useCourseList";

interface Props {
  courseId: string;
}

export function CourseDetailPageContent({ courseId }: Props) {
  const query = useCourseDetail(courseId);
  const detail = query.data?.data;
  const course = detail?.course;
  const sections = detail?.sections ?? [];

  const sectionColumns: readonly DataTableColumn<CourseSection>[] = [
    { id: "term", header: "Term", cell: (row) => row.termLabel },
    { id: "capacity", header: "Capacity", cell: (row) => <span className="tabular-nums">{row.capacity}</span> },
    { id: "enrolled", header: "Enrolled", cell: (row) => <span className="tabular-nums">{row.enrolled}</span> },
  ];

  if (query.isLoading) return <div className="h-48 animate-pulse rounded-lg bg-border" />;
  if (!course) {
    return <ErrorState title="Course not found" description="Unable to load course." onRetry={() => void query.refetch()} />;
  }

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-6">
      <Link href={ROUTES.COURSES} className="text-brand hover:underline">Back to courses</Link>
      <section className="rounded-lg border border-border bg-surface-elevated p-6">
        <h1 className="text-[28px] font-semibold">{course.name}</h1>
        <p className="text-muted-fg">{course.code} · {course.creditHours} credits · {course.departmentName}</p>
        <p className="mt-4">{course.description}</p>
      </section>
      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-surface-elevated p-5">
          <h2 className="text-[13px] font-medium uppercase text-muted-fg">{COURSES_COPY.enrollmentTotal}</h2>
          <p className="mt-2 text-[32px] font-semibold tabular-nums">{course.enrollmentCount}</p>
        </div>
        <div className="rounded-lg border border-border bg-surface-elevated p-5">
          <h2 className="text-[13px] font-medium uppercase text-muted-fg">{COURSES_COPY.enrollmentSections}</h2>
          <p className="mt-2 text-[32px] font-semibold tabular-nums">{course.sectionCount}</p>
        </div>
      </section>
      <section>
        <h2 className="mb-3 text-[18px] font-semibold">{COURSES_COPY.sectionsTitle}</h2>
        <DataTable columns={sectionColumns} data={sections} enableClientPagination clientPerPage={10} ariaLabel="Sections" />
      </section>
    </div>
  );
}
