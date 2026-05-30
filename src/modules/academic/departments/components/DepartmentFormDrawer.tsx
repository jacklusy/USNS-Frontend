"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { FormField } from "@/components/ui/FormField";
import { TextInput, TextareaInput } from "@/components/ui/inputs";
import { SingleSelect } from "@/components/ui/select";
import {
  ACADEMIC_STATUS_OPTIONS,
  DEPARTMENTS_COPY,
} from "@/constants/academic-management.constants";
import { useToast } from "@/hooks/useToast";
import { useCollegeOptions } from "@/modules/academic/hooks/useCollegeOptions";
import { applyAppErrorToForm } from "@/modules/academic/utils/apply-app-error-to-form";
import { useUserAssigneeOptions } from "@/modules/users/hooks/useUserAssigneeOptions";
import type { AppError } from "@/types/error.types";
import type { EntityStatus } from "@/constants/status-badge.constants";
import type { Department } from "@/modules/academic/types/academic.types";
import {
  departmentFormSchema,
  type DepartmentFormData,
} from "../schemas/department.schema";
import {
  useCreateDepartment,
  useUpdateDepartment,
} from "../hooks/useDepartmentMutations";

function isAppError(value: unknown): value is AppError {
  return (
    typeof value === "object" &&
    value !== null &&
    "code" in value &&
    "message" in value
  );
}

interface DepartmentFormDrawerProps {
  open: boolean;
  mode: "create" | "edit" | "view";
  department?: Department | null;
  onClose: () => void;
}

export function DepartmentFormDrawer({
  open,
  mode,
  department,
  onClose,
}: DepartmentFormDrawerProps) {
  const toast = useToast();
  const createMutation = useCreateDepartment();
  const updateMutation = useUpdateDepartment();
  const collegeOptionsQuery = useCollegeOptions();
  const headOptionsQuery = useUserAssigneeOptions(["faculty", "dean"]);
  const [formError, setFormError] = useState<string | null>(null);
  const readOnly = mode === "view";

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isDirty },
  } = useForm<DepartmentFormData>({
    resolver: zodResolver(departmentFormSchema),
    defaultValues: {
      name: "",
      code: "",
      collegeId: "",
      headUserId: "",
      description: "",
      status: "active",
    },
  });

  useEffect(() => {
    if (!department || mode === "create") return;
    reset({
      name: department.name,
      code: department.code,
      collegeId: department.collegeId,
      headUserId: department.headUserId,
      description: department.description,
      status: department.status,
    });
  }, [department, mode, reset]);

  function handleClose() {
    reset();
    setFormError(null);
    onClose();
  }

  const onSubmit = handleSubmit(async (data) => {
    if (readOnly) return;
    setFormError(null);
    const payload = {
      name: data.name,
      code: data.code,
      collegeId: data.collegeId,
      headUserId: data.headUserId,
      description: data.description,
      status: data.status as EntityStatus,
    };
    try {
      if (mode === "create") {
        await createMutation.mutateAsync(payload);
        toast.success({ title: DEPARTMENTS_COPY.toastCreated });
      } else if (department) {
        await updateMutation.mutateAsync({ id: department.id, input: payload });
        toast.success({ title: DEPARTMENTS_COPY.toastUpdated });
      }
      handleClose();
    } catch (error) {
      if (isAppError(error)) {
        const mapped = applyAppErrorToForm(error, setError);
        if (!mapped) setFormError(error.message);
        return;
      }
      setFormError("Could not save department");
    }
  });

  const title =
    mode === "create"
      ? DEPARTMENTS_COPY.createDrawerTitle
      : mode === "view"
        ? DEPARTMENTS_COPY.viewDrawerTitle
        : DEPARTMENTS_COPY.editDrawerTitle;

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      title={title}
      width="md"
      footer={
        readOnly ? (
          <Button variant="ghost" type="button" onClick={handleClose}>
            Close
          </Button>
        ) : (
          <div className="flex justify-end gap-2">
            <Button variant="ghost" type="button" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              type="button"
              loading={createMutation.isPending || updateMutation.isPending}
              disabled={mode === "edit" && !isDirty}
              onClick={() => {
                void onSubmit();
              }}
            >
              Save
            </Button>
          </div>
        )
      }
    >
      <form className="flex flex-col gap-4" noValidate onSubmit={(e) => void onSubmit(e)}>
        {formError ? <p className="text-[13px] text-danger">{formError}</p> : null}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <FormField name="name" label={DEPARTMENTS_COPY.fieldName} required error={errors.name?.message}>
              <TextInput id="dept-name" {...field} disabled={readOnly} hasError={Boolean(errors.name)} />
            </FormField>
          )}
        />
        <Controller
          name="code"
          control={control}
          render={({ field }) => (
            <FormField name="code" label={DEPARTMENTS_COPY.fieldCode} required error={errors.code?.message}>
              <TextInput id="dept-code" {...field} disabled={readOnly} hasError={Boolean(errors.code)} />
            </FormField>
          )}
        />
        <Controller
          name="collegeId"
          control={control}
          render={({ field }) => (
            <FormField name="collegeId" label={DEPARTMENTS_COPY.fieldCollege} required error={errors.collegeId?.message}>
              <SingleSelect
                id="dept-college"
                options={collegeOptionsQuery.data ?? []}
                value={field.value}
                onChange={field.onChange}
                disabled={readOnly}
                hasError={Boolean(errors.collegeId)}
              />
            </FormField>
          )}
        />
        <Controller
          name="headUserId"
          control={control}
          render={({ field }) => (
            <FormField name="headUserId" label={DEPARTMENTS_COPY.fieldHead} required error={errors.headUserId?.message}>
              <SingleSelect
                id="dept-head"
                options={headOptionsQuery.data?.data ?? []}
                value={field.value}
                onChange={field.onChange}
                disabled={readOnly}
                hasError={Boolean(errors.headUserId)}
              />
            </FormField>
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <FormField name="description" label={DEPARTMENTS_COPY.fieldDescription} error={errors.description?.message}>
              <TextareaInput id="dept-desc" rows={3} {...field} disabled={readOnly} />
            </FormField>
          )}
        />
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <FormField name="status" label={DEPARTMENTS_COPY.fieldStatus} required error={errors.status?.message}>
              <SingleSelect
                id="dept-status"
                options={ACADEMIC_STATUS_OPTIONS}
                value={field.value}
                onChange={field.onChange}
                disabled={readOnly}
              />
            </FormField>
          )}
        />
      </form>
    </Drawer>
  );
}
