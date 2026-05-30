"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
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
import { MultiSelect, SingleSelect } from "@/components/ui/select";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  ACADEMIC_SHARED_COPY,
  ACADEMIC_STATUS_OPTIONS,
  PROGRAMS_COPY,
  PROGRAM_TYPE_OPTIONS,
} from "@/constants/academic-management.constants";
import { programDetailRoute } from "@/constants/routes.constants";
import { academicQueryKeys } from "@/modules/academic/constants/academic.query-keys";
import { programService } from "@/modules/academic/services";
import { useDepartmentOptions } from "@/modules/academic/hooks/useDepartmentOptions";
import { useCourseOptions } from "@/modules/academic/hooks/useCourseOptions";
import { useToast } from "@/hooks/useToast";
import type { DataTableColumn } from "@/types/data-table.types";
import type { Program, ProgramType } from "@/modules/academic/types/academic.types";
import type { EntityStatus } from "@/constants/status-badge.constants";

const programSchema = z.object({
  code: z.string().trim().min(2).max(20),
  name: z.string().trim().min(2).max(120),
  type: z.enum(["bachelor", "master", "phd"]),
  departmentId: z.string().min(1),
  durationYears: z.number().min(1).max(10),
  description: z.string().trim().max(500),
  courseIds: z.array(z.string()),
  status: z.enum(["active", "inactive", "pending"]),
});

type ProgramFormData = z.infer<typeof programSchema>;

function programTypeLabel(type: ProgramType): string {
  return PROGRAM_TYPE_OPTIONS.find((o) => o.value === type)?.label ?? type;
}

export function ProgramsPageContent() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editProgram, setEditProgram] = useState<Program | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Program | null>(null);
  const [pendingStatus, setPendingStatus] = useState<{ program: Program; action: "activate" | "deactivate" } | null>(null);
  const deptOptions = useDepartmentOptions();
  const courseOptions = useCourseOptions();

  const listQuery = useQuery({
    queryKey: academicQueryKeys.programs.list({ page, per_page: perPage, search: search || undefined }),
    queryFn: () => programService.list({ page, per_page: perPage, search: search || undefined }),
  });

  const { control, handleSubmit, reset, formState: { errors, isDirty } } = useForm<ProgramFormData>({
    resolver: zodResolver(programSchema),
    defaultValues: { code: "", name: "", type: "bachelor", departmentId: "", durationYears: 4, description: "", courseIds: [], status: "active" },
  });

  useEffect(() => {
    if (!editProgram) return;
    reset({
      code: editProgram.code,
      name: editProgram.name,
      type: editProgram.type,
      departmentId: editProgram.departmentId,
      durationYears: editProgram.durationYears,
      description: editProgram.description,
      courseIds: [...editProgram.courseIds],
      status: editProgram.status,
    });
  }, [editProgram, reset]);

  const createMutation = useMutation({
    mutationFn: programService.create,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: academicQueryKeys.programs.all });
      setDrawerOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      input,
    }: {
      id: string;
      input: {
        code: string;
        name: string;
        type: ProgramType;
        departmentId: string;
        durationYears: number;
        description: string;
        courseIds: string[];
        status: EntityStatus;
      };
    }) => programService.update(id, input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: academicQueryKeys.programs.all });
      setDrawerOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: programService.delete,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: academicQueryKeys.programs.all });
      setPendingDelete(null);
      toast.success({ title: PROGRAMS_COPY.toastDeleted });
    },
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, action }: { id: string; action: "activate" | "deactivate" }) =>
      programService.changeStatus(id, action),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: academicQueryKeys.programs.all });
      setPendingStatus(null);
      toast.success({ title: PROGRAMS_COPY.toastStatusUpdated });
    },
  });

  const columns: readonly DataTableColumn<Program>[] = [
    { id: "name", header: "Program", cell: (row) => <Link href={programDetailRoute(row.id)} className="font-medium hover:text-brand">{row.name}</Link>, priority: true },
    { id: "type", header: PROGRAMS_COPY.columnType, cell: (row) => <Badge variant="default">{programTypeLabel(row.type)}</Badge> },
    { id: "dept", header: PROGRAMS_COPY.columnDepartment, cell: (row) => row.departmentName },
    { id: "duration", header: PROGRAMS_COPY.columnDuration, cell: (row) => <span className="tabular-nums">{row.durationYears} yrs</span> },
    { id: "status", header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
  ];

  const onSubmit = handleSubmit(async (data) => {
    const payload = {
      code: data.code,
      name: data.name,
      type: data.type as ProgramType,
      departmentId: data.departmentId,
      durationYears: data.durationYears,
      description: data.description,
      courseIds: data.courseIds,
      status: data.status as EntityStatus,
    };
    if (editProgram) {
      await updateMutation.mutateAsync({
        id: editProgram.id,
        input: {
          code: data.code,
          name: data.name,
          type: data.type as ProgramType,
          departmentId: data.departmentId,
          durationYears: data.durationYears,
          description: data.description,
          courseIds: data.courseIds,
          status: data.status as EntityStatus,
        },
      });
      toast.success({ title: PROGRAMS_COPY.toastUpdated });
    } else {
      await createMutation.mutateAsync(payload);
      toast.success({ title: PROGRAMS_COPY.toastCreated });
    }
  });

  const confirmStatus = useCallback(() => {
    if (!pendingStatus) return;
    statusMutation.mutate({ id: pendingStatus.program.id, action: pendingStatus.action });
  }, [pendingStatus, statusMutation]);

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-[32px] font-semibold">{PROGRAMS_COPY.pageTitle}</h1>
          <p className="text-muted-fg">{PROGRAMS_COPY.pageDescription}</p>
        </div>
        <Button variant="primary" type="button" onClick={() => { setEditProgram(null); reset(); setDrawerOpen(true); }}>{PROGRAMS_COPY.createButton}</Button>
      </div>
      <DataTable columns={columns} data={listQuery.data?.data ?? []} searchMode="server" onSearch={(q) => { setSearch(q); setPage(1); }} isLoading={listQuery.isLoading} pagination={{ page, perPage, total: listQuery.data?.meta.total ?? 0, onPageChange: setPage, onPerPageChange: setPerPage }} rowActions={[
        { id: "edit", label: ACADEMIC_SHARED_COPY.editAction, icon: Pencil, onSelect: (row) => { setEditProgram(row); setDrawerOpen(true); } },
        { id: "delete", label: ACADEMIC_SHARED_COPY.deleteAction, icon: Trash2, destructive: true, onSelect: setPendingDelete },
      ]} ariaLabel="Programs" />
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title={editProgram ? "Edit program" : "Create program"} width="md"
        footer={<div className="flex justify-end gap-2"><Button variant="ghost" onClick={() => setDrawerOpen(false)}>Cancel</Button><Button variant="primary" disabled={Boolean(editProgram) && !isDirty} onClick={() => void onSubmit()}>Save</Button></div>}>
        <form className="flex flex-col gap-4">
          <Controller name="name" control={control} render={({ field }) => (<FormField name="name" label="Name" required error={errors.name?.message}><TextInput id="p-name" value={field.value} onChange={field.onChange} onBlur={field.onBlur} /></FormField>)} />
          <Controller name="code" control={control} render={({ field }) => (<FormField name="code" label="Code" required error={errors.code?.message}><TextInput id="p-code" value={field.value} onChange={field.onChange} onBlur={field.onBlur} /></FormField>)} />
          <Controller name="type" control={control} render={({ field }) => (<FormField name="type" label={PROGRAMS_COPY.fieldType}><SingleSelect id="p-type" options={PROGRAM_TYPE_OPTIONS} value={field.value} onChange={field.onChange} /></FormField>)} />
          <Controller name="departmentId" control={control} render={({ field }) => (<FormField name="departmentId" label="Department"><SingleSelect id="p-dept" options={deptOptions.data ?? []} value={field.value} onChange={field.onChange} /></FormField>)} />
          <Controller name="durationYears" control={control} render={({ field }) => (<FormField name="durationYears" label={PROGRAMS_COPY.fieldDuration}><TextInput id="p-dur" type="number" value={String(field.value)} onChange={(e) => field.onChange(Number(e.target.value))} /></FormField>)} />
          <Controller name="courseIds" control={control} render={({ field }) => (<FormField name="courseIds" label={PROGRAMS_COPY.fieldCourses}><MultiSelect id="p-courses" options={courseOptions.data ?? []} value={field.value} onChange={field.onChange} /></FormField>)} />
          <Controller name="status" control={control} render={({ field }) => (<FormField name="status" label="Status"><SingleSelect id="p-status" options={ACADEMIC_STATUS_OPTIONS} value={field.value} onChange={field.onChange} /></FormField>)} />
        </form>
      </Drawer>
      <ConfirmationDialog open={Boolean(pendingDelete)} onClose={() => setPendingDelete(null)} title="Delete program?" description="Cannot delete programs with enrollments." confirmLabel="Delete" cancelLabel="Cancel" destructive onConfirm={() => pendingDelete && deleteMutation.mutate(pendingDelete.id)} />
      <ConfirmationDialog open={Boolean(pendingStatus)} onClose={() => setPendingStatus(null)} title={PROGRAMS_COPY.statusChangeTitle} description={pendingStatus?.action === "activate" ? PROGRAMS_COPY.statusActivateDescription : PROGRAMS_COPY.statusDeactivateDescription} confirmLabel="Confirm" cancelLabel="Cancel" onConfirm={confirmStatus} />
    </div>
  );
}
