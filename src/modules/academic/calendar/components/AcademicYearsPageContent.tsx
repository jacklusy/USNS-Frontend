"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DataTable } from "@/components/shared/DataTable";
import { ConfirmationDialog } from "@/components/ui/ConfirmationDialog";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FormField } from "@/components/ui/FormField";
import { TextInput } from "@/components/ui/inputs";
import { CALENDAR_COPY } from "@/constants/academic-management.constants";
import { academicYearDetailRoute } from "@/constants/routes.constants";
import { academicQueryKeys } from "@/modules/academic/constants/academic.query-keys";
import { academicCalendarService } from "@/modules/academic/services";
import { useToast } from "@/hooks/useToast";
import type { DataTableColumn } from "@/types/data-table.types";
import type { AcademicYear } from "@/modules/academic/types/academic.types";
import { Check, Trash2 } from "lucide-react";
import type { DataTableAction } from "@/types/data-table.types";

const yearSchema = z
  .object({
    label: z.string().trim().min(4).max(40),
    startDate: z.string().min(1),
    endDate: z.string().min(1),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  });

type YearFormData = z.infer<typeof yearSchema>;

export function AcademicYearsPageContent() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<AcademicYear | null>(null);

  const listQuery = useQuery({
    queryKey: academicQueryKeys.calendar.years,
    queryFn: () => academicCalendarService.listYears(),
  });

  const { control, handleSubmit, reset, formState: { errors } } = useForm<YearFormData>({
    resolver: zodResolver(yearSchema),
    defaultValues: { label: "", startDate: "", endDate: "" },
  });

  const createMutation = useMutation({
    mutationFn: academicCalendarService.createYear,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: academicQueryKeys.calendar.all });
      setDrawerOpen(false);
      reset();
      toast.success({ title: CALENDAR_COPY.toastYearCreated });
    },
    onError: (error) => {
      toast.error({ title: "Could not create year", description: error instanceof Error ? error.message : undefined });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: academicCalendarService.deleteYear,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: academicQueryKeys.calendar.all });
      setPendingDelete(null);
      toast.success({ title: CALENDAR_COPY.toastYearDeleted });
    },
    onError: (error) => {
      toast.error({ title: "Delete blocked", description: error instanceof Error ? error.message : undefined });
      setPendingDelete(null);
    },
  });

  const columns: readonly DataTableColumn<AcademicYear>[] = [
    {
      id: "label",
      header: CALENDAR_COPY.fieldLabel,
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Link href={academicYearDetailRoute(row.id)} className="font-medium hover:text-brand">
            {row.label}
          </Link>
          {row.isActive ? (
            <Badge variant="default">
              <Check className="mr-1 inline h-3 w-3" aria-hidden="true" />
              {CALENDAR_COPY.activeYearBadge}
            </Badge>
          ) : null}
        </div>
      ),
      priority: true,
    },
    {
      id: "period",
      header: CALENDAR_COPY.columnPeriod,
      cell: (row) => (
        <span>
          {row.startDate} – {row.endDate}
        </span>
      ),
    },
    {
      id: "semesters",
      header: CALENDAR_COPY.columnSemesters,
      cell: (row) => <span className="tabular-nums">{row.semesterCount}</span>,
    },
  ];

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-6">
      <div className="flex justify-between gap-4">
        <div>
          <h1 className="text-[32px] font-semibold">{CALENDAR_COPY.pageTitle}</h1>
          <p className="text-muted-fg">{CALENDAR_COPY.pageDescription}</p>
        </div>
        <Button variant="primary" type="button" onClick={() => setDrawerOpen(true)}>
          {CALENDAR_COPY.createYearButton}
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={listQuery.data?.data ?? []}
        isLoading={listQuery.isLoading}
        enableClientPagination
        clientPerPage={10}
        rowActions={[
          {
            id: "delete",
            label: "Delete",
            icon: Trash2,
            destructive: true,
            onSelect: setPendingDelete,
          },
        ]}
        ariaLabel="Academic years"
      />
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={CALENDAR_COPY.createYearTitle}
        width="md"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="ghost" type="button" onClick={() => setDrawerOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              type="button"
              loading={createMutation.isPending}
              onClick={() => void handleSubmit((data) => createMutation.mutate(data))()}
            >
              Create
            </Button>
          </div>
        }
      >
        <form className="flex flex-col gap-4">
          <Controller
            name="label"
            control={control}
            render={({ field }) => (
              <FormField name="label" label={CALENDAR_COPY.fieldLabel} required error={errors.label?.message}>
                <TextInput id="y-label" value={field.value} onChange={field.onChange} onBlur={field.onBlur} />
              </FormField>
            )}
          />
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <FormField name="startDate" label={CALENDAR_COPY.fieldStartDate} required error={errors.startDate?.message}>
                <TextInput id="y-start" type="date" value={field.value} onChange={field.onChange} onBlur={field.onBlur} />
              </FormField>
            )}
          />
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <FormField name="endDate" label={CALENDAR_COPY.fieldEndDate} required error={errors.endDate?.message}>
                <TextInput id="y-end" type="date" value={field.value} onChange={field.onChange} onBlur={field.onBlur} />
              </FormField>
            )}
          />
        </form>
      </Drawer>
      <ConfirmationDialog
        open={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(null)}
        title={CALENDAR_COPY.deleteYearTitle}
        description={CALENDAR_COPY.deleteYearDescription}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        destructive
        loading={deleteMutation.isPending}
        onConfirm={() => pendingDelete && deleteMutation.mutate(pendingDelete.id)}
      />
    </div>
  );
}
