"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { FormField } from "@/components/ui/FormField";
import { TextInput, TextareaInput } from "@/components/ui/inputs";
import { SingleSelect } from "@/components/ui/select";
import {
  ACADEMIC_STATUS_OPTIONS,
  COLLEGES_COPY,
} from "@/constants/academic-management.constants";
import { useToast } from "@/hooks/useToast";
import { useUserAssigneeOptions } from "@/modules/users/hooks/useUserAssigneeOptions";
import type { AppError } from "@/types/error.types";
import type { EntityStatus } from "@/constants/status-badge.constants";
import {
  createCollegeSchema,
  editCollegeSchema,
  type CreateCollegeFormData,
  type EditCollegeFormData,
} from "../schemas/college.schema";
import {
  useCreateCollege,
  useUpdateCollege,
} from "../hooks/useCollegeMutations";
import { applyAppErrorToForm } from "@/modules/academic/utils/apply-app-error-to-form";
import type { College } from "@/modules/academic/types/academic.types";

function isAppError(value: unknown): value is AppError {
  return (
    typeof value === "object" &&
    value !== null &&
    "code" in value &&
    "message" in value
  );
}

interface CollegeFormDrawerProps {
  open: boolean;
  mode: "create" | "edit" | "view";
  college?: College | null;
  onClose: () => void;
}

export function CollegeFormDrawer({
  open,
  mode,
  college,
  onClose,
}: CollegeFormDrawerProps) {
  const toast = useToast();
  const createMutation = useCreateCollege();
  const updateMutation = useUpdateCollege();
  const assigneeQuery = useUserAssigneeOptions(["dean", "president"]);
  const [formError, setFormError] = useState<string | null>(null);
  const readOnly = mode === "view";

  const schema = mode === "create" ? createCollegeSchema : editCollegeSchema;

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isDirty },
  } = useForm<CreateCollegeFormData | EditCollegeFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      code: "",
      deanUserId: "",
      description: "",
      status: "active",
    },
  });

  useEffect(() => {
    if (!college || mode === "create") return;
    reset({
      name: college.name,
      code: college.code,
      deanUserId: college.deanUserId,
      description: college.description,
      status: college.status,
    });
  }, [college, mode, reset]);

  const deanOptions =
    assigneeQuery.data?.data.map((o) => ({
      value: o.value,
      label: o.label,
    })) ?? [];

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
      deanUserId: data.deanUserId,
      description: data.description,
      status: data.status as EntityStatus,
    };
    try {
      if (mode === "create") {
        await createMutation.mutateAsync(payload);
        toast.success({
          title: COLLEGES_COPY.toastCreated,
          description: data.name,
        });
      } else if (college) {
        await updateMutation.mutateAsync({ id: college.id, input: payload });
        toast.success({
          title: COLLEGES_COPY.toastUpdated,
          description: data.name,
        });
      }
      handleClose();
    } catch (error) {
      if (isAppError(error)) {
        const mapped = applyAppErrorToForm(error, setError);
        if (!mapped) setFormError(error.message);
        return;
      }
      setFormError(COLLEGES_COPY.formErrorGeneric);
    }
  });

  const title =
    mode === "create"
      ? COLLEGES_COPY.createDrawerTitle
      : mode === "view"
        ? COLLEGES_COPY.viewDrawerTitle
        : COLLEGES_COPY.editDrawerTitle;

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      title={title}
      description={
        mode === "create"
          ? COLLEGES_COPY.createDrawerDescription
          : mode === "view"
            ? COLLEGES_COPY.viewDrawerDescription
            : COLLEGES_COPY.editDrawerDescription
      }
      width="md"
      footer={
        readOnly ? (
          <div className="flex justify-end">
            <Button type="button" variant="ghost" onClick={handleClose}>
              {COLLEGES_COPY.closeLabel}
            </Button>
          </div>
        ) : (
          <div className="flex flex-wrap justify-end gap-2">
            <Button type="button" variant="ghost" onClick={handleClose}>
              {COLLEGES_COPY.cancelLabel}
            </Button>
            <Button
              type="button"
              variant="primary"
              loading={
                createMutation.isPending || updateMutation.isPending
              }
              disabled={mode === "edit" && !isDirty}
              onClick={() => {
                void onSubmit();
              }}
            >
              {mode === "create"
                ? COLLEGES_COPY.createLabel
                : COLLEGES_COPY.saveLabel}
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
          name="name"
          control={control}
          render={({ field }) => (
            <FormField
              name="name"
              label={COLLEGES_COPY.fieldName}
              required
              error={errors.name?.message}
            >
              <TextInput
                id="college-name"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                disabled={readOnly}
                hasError={Boolean(errors.name)}
              />
            </FormField>
          )}
        />
        <Controller
          name="code"
          control={control}
          render={({ field }) => (
            <FormField
              name="code"
              label={COLLEGES_COPY.fieldCode}
              required
              error={errors.code?.message}
            >
              <TextInput
                id="college-code"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                disabled={readOnly}
                hasError={Boolean(errors.code)}
              />
            </FormField>
          )}
        />
        <Controller
          name="deanUserId"
          control={control}
          render={({ field }) => (
            <FormField
              name="deanUserId"
              label={COLLEGES_COPY.fieldDean}
              required
              error={errors.deanUserId?.message}
            >
              <SingleSelect
                id="college-dean"
                options={deanOptions}
                value={field.value}
                onChange={field.onChange}
                placeholder="Select dean"
                disabled={readOnly}
                hasError={Boolean(errors.deanUserId)}
              />
            </FormField>
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <FormField
              name="description"
              label={COLLEGES_COPY.fieldDescription}
              error={errors.description?.message}
            >
              <TextareaInput
                id="college-description"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                rows={3}
                disabled={readOnly}
                hasError={Boolean(errors.description)}
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
              label={COLLEGES_COPY.fieldStatus}
              required
              error={errors.status?.message}
            >
              <SingleSelect
                id="college-status"
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
