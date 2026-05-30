"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { FormField } from "@/components/ui/FormField";
import { EmailInput, NumberInput, TextInput } from "@/components/ui/inputs";
import { MultiSelect, SingleSelect } from "@/components/ui/select";
import { ACADEMIC_STATUS_OPTIONS } from "@/constants/academic-management.constants";
import {
  FACULTY_COPY,
  FACULTY_RANK_OPTIONS,
  FACULTY_SHARED_COPY,
} from "@/constants/faculty-management.constants";
import { useToast } from "@/hooks/useToast";
import { useCourseOptions } from "@/modules/academic/hooks/useCourseOptions";
import type { AppError } from "@/types/error.types";
import type { EntityStatus } from "@/constants/status-badge.constants";
import {
  createFacultySchema,
  editFacultySchema,
  type CreateFacultyFormData,
  type EditFacultyFormData,
} from "../schemas/faculty.schema";
import {
  useCreateFaculty,
  useUpdateFaculty,
} from "../hooks/useFacultyMutations";
import { useDepartmentOptions } from "../hooks/useDepartmentOptions";
import { applyAppErrorToForm } from "../utils/apply-app-error-to-form";
import type { FacultyMember } from "../types/faculty.types";

function isAppError(value: unknown): value is AppError {
  return (
    typeof value === "object" &&
    value !== null &&
    "code" in value &&
    "message" in value
  );
}

interface FacultyFormDrawerProps {
  open: boolean;
  mode: "create" | "edit" | "view";
  member?: FacultyMember | null;
  onClose: () => void;
}

export function FacultyFormDrawer({
  open,
  mode,
  member,
  onClose,
}: FacultyFormDrawerProps) {
  const toast = useToast();
  const createMutation = useCreateFaculty();
  const updateMutation = useUpdateFaculty();
  const departmentQuery = useDepartmentOptions();
  const courseOptionsQuery = useCourseOptions();
  const [formError, setFormError] = useState<string | null>(null);
  const readOnly = mode === "view";
  const schema = mode === "create" ? createFacultySchema : editFacultySchema;

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isDirty },
  } = useForm<CreateFacultyFormData | EditFacultyFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      employeeId: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      departmentId: "",
      specialization: "",
      rank: "instructor",
      status: "active",
      assignedCourseIds: [],
      publicationsCount: 0,
    },
  });

  useEffect(() => {
    if (!member || mode === "create") return;
    reset({
      employeeId: member.employeeId,
      firstName: member.firstName,
      lastName: member.lastName,
      email: member.email,
      phone: member.phone,
      departmentId: member.departmentId,
      specialization: member.specialization,
      rank: member.rank,
      status: member.status,
      assignedCourseIds: member.assignedCourseIds,
      publicationsCount: member.publicationsCount,
    });
  }, [member, mode, reset]);

  function handleClose() {
    reset();
    setFormError(null);
    onClose();
  }

  const onSubmit = handleSubmit(async (data) => {
    if (readOnly) return;
    setFormError(null);
    const payload = {
      employeeId: data.employeeId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      departmentId: data.departmentId,
      specialization: data.specialization,
      rank: data.rank,
      status: data.status as EntityStatus,
      assignedCourseIds: data.assignedCourseIds,
      publicationsCount: data.publicationsCount,
    };
    try {
      if (mode === "create") {
        await createMutation.mutateAsync(payload);
        toast.success({ title: FACULTY_COPY.createSuccess });
      } else if (member) {
        await updateMutation.mutateAsync({ id: member.id, input: payload });
        toast.success({ title: FACULTY_COPY.updateSuccess });
      }
      handleClose();
    } catch (error) {
      if (isAppError(error)) {
        const mapped = applyAppErrorToForm(error, setError);
        if (!mapped) setFormError(error.message);
        return;
      }
      setFormError(FACULTY_SHARED_COPY.errorDescription);
    }
  });

  const title =
    mode === "create"
      ? FACULTY_COPY.drawerCreateTitle
      : mode === "view"
        ? FACULTY_COPY.drawerViewTitle
        : FACULTY_COPY.drawerEditTitle;

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      title={title}
      width="md"
      footer={
        readOnly ? (
          <div className="flex justify-end">
            <Button type="button" variant="ghost" onClick={handleClose}>
              {FACULTY_SHARED_COPY.cancelAction}
            </Button>
          </div>
        ) : (
          <div className="flex flex-wrap justify-end gap-2">
            <Button type="button" variant="ghost" onClick={handleClose}>
              {FACULTY_SHARED_COPY.cancelAction}
            </Button>
            <Button
              type="button"
              variant="primary"
              loading={createMutation.isPending || updateMutation.isPending}
              disabled={mode === "edit" && !isDirty}
              onClick={() => {
                void onSubmit();
              }}
            >
              {FACULTY_SHARED_COPY.saveAction}
            </Button>
          </div>
        )
      }
    >
      <form
        onSubmit={(event) => {
          void onSubmit(event);
        }}
        className="flex flex-col gap-4"
        noValidate
      >
        {formError ? (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-md border border-danger/30 bg-surface-elevated p-4 text-[13px] text-danger"
          >
            <AlertCircle
              className="mt-0.5 h-4 w-4 shrink-0"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <p>{formError}</p>
          </div>
        ) : null}
        <Controller
          name="employeeId"
          control={control}
          render={({ field }) => (
            <FormField
              name="employeeId"
              label={FACULTY_COPY.fieldEmployeeId}
              required
              error={errors.employeeId?.message}
            >
              <TextInput
                id="faculty-employee-id"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                disabled={readOnly}
                hasError={Boolean(errors.employeeId)}
              />
            </FormField>
          )}
        />
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <FormField
              name="firstName"
              label={FACULTY_COPY.fieldFirstName}
              required
              error={errors.firstName?.message}
            >
              <TextInput
                id="faculty-first-name"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                disabled={readOnly}
                hasError={Boolean(errors.firstName)}
              />
            </FormField>
          )}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <FormField
              name="lastName"
              label={FACULTY_COPY.fieldLastName}
              required
              error={errors.lastName?.message}
            >
              <TextInput
                id="faculty-last-name"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                disabled={readOnly}
                hasError={Boolean(errors.lastName)}
              />
            </FormField>
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <FormField
              name="email"
              label={FACULTY_COPY.fieldEmail}
              required
              error={errors.email?.message}
            >
              <EmailInput
                id="faculty-email"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                disabled={readOnly}
                hasError={Boolean(errors.email)}
              />
            </FormField>
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <FormField
              name="phone"
              label={FACULTY_COPY.fieldPhone}
              required
              error={errors.phone?.message}
            >
              <TextInput
                id="faculty-phone"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                disabled={readOnly}
                hasError={Boolean(errors.phone)}
              />
            </FormField>
          )}
        />
        <Controller
          name="departmentId"
          control={control}
          render={({ field }) => (
            <FormField
              name="departmentId"
              label={FACULTY_COPY.fieldDepartment}
              required
              error={errors.departmentId?.message}
            >
              <SingleSelect
                id="faculty-department"
                options={departmentQuery.data ?? []}
                value={field.value}
                onChange={field.onChange}
                placeholder="Select department"
                disabled={readOnly}
                hasError={Boolean(errors.departmentId)}
              />
            </FormField>
          )}
        />
        <Controller
          name="specialization"
          control={control}
          render={({ field }) => (
            <FormField
              name="specialization"
              label={FACULTY_COPY.fieldSpecialization}
              required
              error={errors.specialization?.message}
            >
              <TextInput
                id="faculty-specialization"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                disabled={readOnly}
                hasError={Boolean(errors.specialization)}
              />
            </FormField>
          )}
        />
        <Controller
          name="rank"
          control={control}
          render={({ field }) => (
            <FormField
              name="rank"
              label={FACULTY_COPY.fieldRank}
              required
              error={errors.rank?.message}
            >
              <SingleSelect
                id="faculty-rank"
                options={FACULTY_RANK_OPTIONS}
                value={field.value}
                onChange={field.onChange}
                disabled={readOnly}
                hasError={Boolean(errors.rank)}
              />
            </FormField>
          )}
        />
        <Controller
          name="assignedCourseIds"
          control={control}
          render={({ field }) => (
            <FormField
              name="assignedCourseIds"
              label={FACULTY_COPY.fieldCourses}
              error={errors.assignedCourseIds?.message}
            >
              <MultiSelect
                id="faculty-courses"
                options={courseOptionsQuery.data ?? []}
                value={field.value}
                onChange={field.onChange}
                disabled={readOnly}
              />
            </FormField>
          )}
        />
        <Controller
          name="publicationsCount"
          control={control}
          render={({ field }) => (
            <FormField
              name="publicationsCount"
              label={FACULTY_COPY.fieldPublications}
              required
              error={errors.publicationsCount?.message}
            >
              <NumberInput
                id="faculty-publications"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                disabled={readOnly}
                hasError={Boolean(errors.publicationsCount)}
              />
            </FormField>
          )}
        />
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <FormField
              name="status"
              label={FACULTY_COPY.fieldStatus}
              required
              error={errors.status?.message}
            >
              <SingleSelect
                id="faculty-status"
                options={ACADEMIC_STATUS_OPTIONS}
                value={field.value}
                onChange={field.onChange}
                disabled={readOnly}
                hasError={Boolean(errors.status)}
              />
            </FormField>
          )}
        />
      </form>
    </Drawer>
  );
}
