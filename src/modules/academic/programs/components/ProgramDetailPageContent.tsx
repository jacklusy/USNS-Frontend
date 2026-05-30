"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/shared/DataTable";
import { Badge } from "@/components/ui/Badge";
import { PROGRAMS_COPY } from "@/constants/academic-management.constants";
import { ROUTES, courseDetailRoute } from "@/constants/routes.constants";
import { academicQueryKeys } from "@/modules/academic/constants/academic.query-keys";
import { programService } from "@/modules/academic/services";
import type { DataTableColumn } from "@/types/data-table.types";
import type { Course } from "@/modules/academic/types/academic.types";

interface Props {
  programId: string;
}

export function ProgramDetailPageContent({ programId }: Props) {
  const query = useQuery({
    queryKey: academicQueryKeys.programs.detail(programId),
    queryFn: () => programService.getDetail(programId),
  });
  const program = query.data?.data.program;
  const courses = query.data?.data.courses ?? [];

  const columns: readonly DataTableColumn<Course>[] = [
    { id: "code", header: "Code", cell: (row) => <Link href={courseDetailRoute(row.id)} className="hover:text-brand">{row.code}</Link> },
    { id: "name", header: "Name", cell: (row) => row.name },
  ];

  if (!program) return <div className="h-48 animate-pulse rounded-lg bg-border" />;

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-6">
      <Link href={ROUTES.PROGRAMS} className="text-brand hover:underline">Back to programs</Link>
      <section className="rounded-lg border border-border bg-surface-elevated p-6">
        <h1 className="text-[28px] font-semibold">{program.name}</h1>
        <Badge variant="default" className="mt-2">{program.type}</Badge>
        <p className="mt-4 text-muted-fg">{program.departmentName} · {program.durationYears} years</p>
      </section>
      <section className="rounded-lg border border-border bg-surface-elevated p-5">
        <h2 className="text-[18px] font-semibold">{PROGRAMS_COPY.enrolledTitle}</h2>
        <p className="mt-2 text-[32px] font-semibold tabular-nums">{program.enrolledCount}</p>
      </section>
      <section>
        <h2 className="mb-3 text-[18px] font-semibold">{PROGRAMS_COPY.linkedCoursesTitle}</h2>
        <DataTable columns={columns} data={courses} enableClientPagination clientPerPage={10} ariaLabel="Program courses" />
      </section>
    </div>
  );
}
