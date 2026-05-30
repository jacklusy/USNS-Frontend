"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { DataTable } from "@/components/shared/DataTable";
import { ConfirmationDialog } from "@/components/ui/ConfirmationDialog";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { TextInput, TextareaInput } from "@/components/ui/inputs";
import { MultiSelect, SingleSelect } from "@/components/ui/select";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  ACADEMIC_SHARED_COPY,
  ACADEMIC_STATUS_OPTIONS,
  COURSES_COPY,
} from "@/constants/academic-management.constants";
import { courseDetailRoute } from "@/constants/routes.constants";
import { useToast } from "@/hooks/useToast";
import { useDepartmentOptions } from "@/modules/academic/hooks/useDepartmentOptions";
import { useCourseOptions } from "@/modules/academic/hooks/useCourseOptions";
import { applyAppErrorToForm } from "@/modules/academic/utils/apply-app-error-to-form";
import type { DataTableAction, DataTableColumn } from "@/types/data-table.types";
import type { Course } from "@/modules/academic/types/academic.types";
import type { EntityStatus } from "@/constants/status-badge.constants";
import { courseFormSchema, type CourseFormData } from "../schemas/course.schema";
import { useCourseList } from "../hooks/useCourseList";
import { useCreateCourse, useDeleteCourse, useUpdateCourse } from "../hooks/useCourseMutations";

export function CoursesPageContent() {
  const toast = useToast();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editCourse, setEditCourse] = useState<Course | null>(null);
  const [mode, setMode] = useState<"create" | "edit" | "view">("create");
  const [pendingDelete, setPendingDelete] = useState<Course | null>(null);
  const deptOptions = useDepartmentOptions();
  const listQuery = useCourseList({ page, per_page: perPage, search: search || undefined });
  const createMutation = useCreateCourse();
  const updateMutation = useUpdateCourse();
  const deleteMutation = useDeleteCourse();
  const prereqOptions = useCourseOptions(editCourse?.id);

  const { control, handleSubmit, reset, setError, formState: { errors, isDirty } } = useForm<CourseFormData>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: { code: "", name: "", creditHours: 3, departmentId: "", description: "", prerequisiteIds: [], status: "active" },
  });

  useEffect(() => {
    if (!editCourse || mode === "create") return;
    reset({
      code: editCourse.code,
      name: editCourse.name,
      creditHours: editCourse.creditHours,
      departmentId: editCourse.departmentId,
      description: editCourse.description,
      prerequisiteIds: [...editCourse.prerequisiteIds],
      status: editCourse.status,
    });
  }, [editCourse, mode, reset]);

  const columns: readonly DataTableColumn<Course>[] = [
    { id: "code", header: COURSES_COPY.fieldCode, cell: (row) => <Link href={courseDetailRoute(row.id)} className="font-medium hover:text-brand">{row.code}</Link>, priority: true },
    { id: "name", header: COURSES_COPY.fieldName, cell: (row) => row.name },
    { id: "credits", header: COURSES_COPY.columnCredits, cell: (row) => <span className="tabular-nums">{row.creditHours}</span> },
    { id: "dept", header: COURSES_COPY.columnDepartment, cell: (row) => row.departmentName },
    { id: "status", header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
  ];

  const rowActions: readonly DataTableAction<Course>[] = [
    { id: "view", label: ACADEMIC_SHARED_COPY.viewAction, icon: Eye, onSelect: (row) => { setEditCourse(row); setMode("view"); setDrawerOpen(true); } },
    { id: "edit", label: ACADEMIC_SHARED_COPY.editAction, icon: Pencil, onSelect: (row) => { setEditCourse(row); setMode("edit"); setDrawerOpen(true); } },
    { id: "delete", label: ACADEMIC_SHARED_COPY.deleteAction, icon: Trash2, destructive: true, onSelect: setPendingDelete },
  ];

  const onSubmit = handleSubmit(async (data) => {
    const payload = {
      code: data.code,
      name: data.name,
      creditHours: data.creditHours,
      departmentId: data.departmentId,
      description: data.description,
      prerequisiteIds: data.prerequisiteIds,
      status: data.status as EntityStatus,
    };
    try {
      if (mode === "create") {
        await createMutation.mutateAsync(payload);
        toast.success({ title: COURSES_COPY.toastCreated });
      } else if (editCourse) {
        await updateMutation.mutateAsync({ id: editCourse.id, input: payload });
        toast.success({ title: COURSES_COPY.toastUpdated });
      }
      setDrawerOpen(false);
      setEditCourse(null);
      reset();
    } catch (error) {
      applyAppErrorToForm(error as never, setError);
    }
  });

  const confirmDelete = useCallback(() => {
    if (!pendingDelete) return;
    deleteMutation.mutate(pendingDelete.id, {
      onSuccess: () => {
        toast.success({ title: COURSES_COPY.toastDeleted });
        setPendingDelete(null);
      },
    });
  }, [deleteMutation, pendingDelete, toast]);

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-6">
      <div className="flex justify-between gap-4">
        <div>
          <h1 className="text-[32px] font-semibold">{COURSES_COPY.pageTitle}</h1>
          <p className="text-muted-fg">{COURSES_COPY.pageDescription}</p>
        </div>
        <Button variant="primary" type="button" onClick={() => { setMode("create"); setEditCourse(null); reset(); setDrawerOpen(true); }}>
          {COURSES_COPY.createButton}
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={listQuery.data?.data ?? []}
        searchMode="server"
        onSearch={(q) => { setSearch(q); setPage(1); }}
        isLoading={listQuery.isLoading}
        isError={listQuery.isError}
        onRetry={() => void listQuery.refetch()}
        pagination={{ page, perPage, total: listQuery.data?.meta.total ?? 0, onPageChange: setPage, onPerPageChange: (n) => { setPerPage(n); setPage(1); } }}
        rowActions={rowActions}
        ariaLabel="Courses"
      />
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title={mode === "create" ? COURSES_COPY.createDrawerTitle : COURSES_COPY.editDrawerTitle} width="md"
        footer={mode !== "view" ? (
          <div className="flex justify-end gap-2">
            <Button variant="ghost" type="button" onClick={() => setDrawerOpen(false)}>Cancel</Button>
            <Button variant="primary" type="button" disabled={mode === "edit" && !isDirty} loading={createMutation.isPending || updateMutation.isPending} onClick={() => void onSubmit()}>Save</Button>
          </div>
        ) : null}
      >
        <form className="flex flex-col gap-4" onSubmit={(e) => void onSubmit(e)}>
          <Controller name="code" control={control} render={({ field }) => (
            <FormField name="code" label={COURSES_COPY.fieldCode} required error={errors.code?.message}>
              <TextInput id="c-code" value={field.value} onChange={field.onChange} onBlur={field.onBlur} disabled={mode === "view"} />
            </FormField>
          )} />
          <Controller name="name" control={control} render={({ field }) => (
            <FormField name="name" label={COURSES_COPY.fieldName} required error={errors.name?.message}>
              <TextInput id="c-name" value={field.value} onChange={field.onChange} onBlur={field.onBlur} disabled={mode === "view"} />
            </FormField>
          )} />
          <Controller name="creditHours" control={control} render={({ field }) => (
            <FormField name="creditHours" label={COURSES_COPY.fieldCredits} required error={errors.creditHours?.message}>
              <TextInput id="c-credits" type="number" value={String(field.value)} onChange={(e) => field.onChange(Number(e.target.value))} disabled={mode === "view"} />
            </FormField>
          )} />
          <Controller name="departmentId" control={control} render={({ field }) => (
            <FormField name="departmentId" label={COURSES_COPY.fieldDepartment} required error={errors.departmentId?.message}>
              <SingleSelect id="c-dept" options={deptOptions.data ?? []} value={field.value} onChange={field.onChange} disabled={mode === "view"} />
            </FormField>
          )} />
          <Controller name="prerequisiteIds" control={control} render={({ field }) => (
            <FormField name="prerequisiteIds" label={COURSES_COPY.fieldPrerequisites} error={errors.prerequisiteIds?.message}>
              <MultiSelect id="c-pre" options={prereqOptions.data ?? []} value={field.value} onChange={field.onChange} disabled={mode === "view"} />
            </FormField>
          )} />
          <Controller name="description" control={control} render={({ field }) => (
            <FormField name="description" label={COURSES_COPY.fieldDescription}>
              <TextareaInput id="c-desc" rows={3} value={field.value} onChange={field.onChange} onBlur={field.onBlur} disabled={mode === "view"} />
            </FormField>
          )} />
          <Controller name="status" control={control} render={({ field }) => (
            <FormField name="status" label={COURSES_COPY.fieldStatus}>
              <SingleSelect id="c-status" options={ACADEMIC_STATUS_OPTIONS} value={field.value} onChange={field.onChange} disabled={mode === "view"} />
            </FormField>
          )} />
        </form>
      </Drawer>
      <ConfirmationDialog open={Boolean(pendingDelete)} onClose={() => setPendingDelete(null)} title="Delete course?" description="This cannot be undone." confirmLabel="Delete" cancelLabel="Cancel" destructive loading={deleteMutation.isPending} onConfirm={confirmDelete} />
    </div>
  );
}
