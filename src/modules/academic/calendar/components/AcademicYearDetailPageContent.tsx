"use client";

import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Drawer } from "@/components/ui/Drawer";
import { FormField } from "@/components/ui/FormField";
import { TextInput } from "@/components/ui/inputs";
import { SingleSelect } from "@/components/ui/select";
import { SEMESTER_TYPE_OPTIONS } from "@/constants/academic-management.constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DataTable } from "@/components/shared/DataTable";
import { ConfirmationDialog } from "@/components/ui/ConfirmationDialog";
import { Button } from "@/components/ui/Button";
import { CALENDAR_COPY } from "@/constants/academic-management.constants";
import { ROUTES } from "@/constants/routes.constants";
import { academicQueryKeys } from "@/modules/academic/constants/academic.query-keys";
import { academicCalendarService } from "@/modules/academic/services";
import { useToast } from "@/hooks/useToast";
import type { DataTableColumn } from "@/types/data-table.types";
import type { Semester } from "@/modules/academic/types/academic.types";

const semesterSchema = z
  .object({
    name: z.string().trim().min(2).max(80),
    type: z.enum(["fall", "spring", "summer"]),
    startDate: z.string().min(1),
    endDate: z.string().min(1),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  });

interface Props {
  yearId: string;
}

export function AcademicYearDetailPageContent({ yearId }: Props) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [semesterDrawerOpen, setSemesterDrawerOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<{
    semester: Semester;
    action: "activate" | "close";
  } | null>(null);

  const detailQuery = useQuery({
    queryKey: academicQueryKeys.calendar.yearDetail(yearId),
    queryFn: () => academicCalendarService.getYear(yearId),
  });

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(semesterSchema),
    defaultValues: { name: "", type: "fall" as const, startDate: "", endDate: "" },
  });

  const createSemesterMutation = useMutation({
    mutationFn: academicCalendarService.createSemester,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: academicQueryKeys.calendar.all });
      setSemesterDrawerOpen(false);
      reset();
      toast.success({ title: CALENDAR_COPY.toastSemesterCreated });
    },
  });

  const activateMutation = useMutation({
    mutationFn: ({ semesterId }: { semesterId: string }) =>
      academicCalendarService.activateSemester(yearId, semesterId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: academicQueryKeys.calendar.all });
      setPendingAction(null);
      toast.success({ title: CALENDAR_COPY.toastSemesterActivated });
    },
    onError: (error) => {
      toast.error({ title: "Action blocked", description: error instanceof Error ? error.message : undefined });
    },
  });

  const closeMutation = useMutation({
    mutationFn: ({ semesterId }: { semesterId: string }) =>
      academicCalendarService.closeSemester(yearId, semesterId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: academicQueryKeys.calendar.all });
      setPendingAction(null);
      toast.success({ title: CALENDAR_COPY.toastSemesterClosed });
    },
    onError: (error) => {
      toast.error({ title: "Action blocked", description: error instanceof Error ? error.message : undefined });
    },
  });

  const year = detailQuery.data?.data.year;
  const semesters = detailQuery.data?.data.semesters ?? [];

  const columns: readonly DataTableColumn<Semester>[] = [
    { id: "name", header: "Semester", cell: (row) => row.name, priority: true },
    { id: "type", header: "Type", cell: (row) => row.type },
    { id: "period", header: "Period", cell: (row) => `${row.startDate} – ${row.endDate}` },
    {
      id: "status",
      header: "Status",
      cell: (row) => (
        <span className="text-[13px] capitalize text-foreground">{row.status}</span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          {row.status !== "active" ? (
            <Button variant="secondary" type="button" onClick={() => setPendingAction({ semester: row, action: "activate" })}>
              Activate
            </Button>
          ) : null}
          {row.status === "active" ? (
            <Button variant="ghost" type="button" onClick={() => setPendingAction({ semester: row, action: "close" })}>
              Close
            </Button>
          ) : null}
        </div>
      ),
    },
  ];

  const impactWarning =
    pendingAction?.semester.activeRegistrationCount &&
    pendingAction.semester.activeRegistrationCount > 0
      ? CALENDAR_COPY.activateSemesterImpact
      : undefined;

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-6">
      <Link href={ROUTES.ACADEMIC_YEARS} className="text-brand hover:underline">
        Back to academic calendar
      </Link>
      {year ? (
        <section className="rounded-lg border border-border bg-surface-elevated p-6">
          <h1 className="text-[28px] font-semibold">{year.label}</h1>
          <p className="text-muted-fg">
            {year.startDate} – {year.endDate}
          </p>
        </section>
      ) : null}
      <section>
        <div className="mb-3 flex items-center justify-between gap-4">
          <h2 className="text-[18px] font-semibold">{CALENDAR_COPY.semestersTitle}</h2>
          <Button variant="primary" type="button" onClick={() => setSemesterDrawerOpen(true)}>
            {CALENDAR_COPY.addSemesterButton}
          </Button>
        </div>
        <DataTable columns={columns} data={semesters} enableClientPagination clientPerPage={10} ariaLabel="Semesters" />
      </section>
      <Drawer
        open={semesterDrawerOpen}
        onClose={() => setSemesterDrawerOpen(false)}
        title={CALENDAR_COPY.createSemesterTitle}
        width="md"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="ghost" type="button" onClick={() => setSemesterDrawerOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              type="button"
              loading={createSemesterMutation.isPending}
              onClick={() =>
                void handleSubmit((data) =>
                  createSemesterMutation.mutate({
                    academicYearId: yearId,
                    name: data.name,
                    type: data.type,
                    startDate: data.startDate,
                    endDate: data.endDate,
                  }),
                )()
              }
            >
              Create
            </Button>
          </div>
        }
      >
        <form className="flex flex-col gap-4">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <FormField name="name" label={CALENDAR_COPY.fieldSemesterName} required error={errors.name?.message}>
                <TextInput id="sem-name" value={field.value} onChange={field.onChange} onBlur={field.onBlur} />
              </FormField>
            )}
          />
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <FormField name="type" label={CALENDAR_COPY.fieldSemesterType} required>
                <SingleSelect id="sem-type" options={SEMESTER_TYPE_OPTIONS} value={field.value} onChange={field.onChange} />
              </FormField>
            )}
          />
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <FormField name="startDate" label={CALENDAR_COPY.fieldStartDate} required error={errors.startDate?.message}>
                <TextInput id="sem-start" type="date" value={field.value} onChange={field.onChange} onBlur={field.onBlur} />
              </FormField>
            )}
          />
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <FormField name="endDate" label={CALENDAR_COPY.fieldEndDate} required error={errors.endDate?.message}>
                <TextInput id="sem-end" type="date" value={field.value} onChange={field.onChange} onBlur={field.onBlur} />
              </FormField>
            )}
          />
        </form>
      </Drawer>
      <ConfirmationDialog
        open={Boolean(pendingAction)}
        onClose={() => setPendingAction(null)}
        title={
          pendingAction?.action === "activate"
            ? CALENDAR_COPY.activateSemesterTitle
            : CALENDAR_COPY.closeSemesterTitle
        }
        description={
          impactWarning ??
          (pendingAction?.action === "activate"
            ? CALENDAR_COPY.activateSemesterWarning
            : CALENDAR_COPY.closeSemesterWarning)
        }
        confirmLabel="Confirm"
        cancelLabel="Cancel"
        loading={activateMutation.isPending || closeMutation.isPending}
        onConfirm={() => {
          if (!pendingAction) return;
          if (pendingAction.action === "activate") {
            activateMutation.mutate({ semesterId: pendingAction.semester.id });
          } else {
            closeMutation.mutate({ semesterId: pendingAction.semester.id });
          }
        }}
      />
    </div>
  );
}
