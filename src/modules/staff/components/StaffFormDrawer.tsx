"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { FormField } from "@/components/ui/FormField";
import { EmailInput, TextInput } from "@/components/ui/inputs";
import { SingleSelect } from "@/components/ui/select";
import { ACADEMIC_STATUS_OPTIONS } from "@/constants/academic-management.constants";
import {
  STAFF_COPY,
  STAFF_ROLE_OPTIONS,
  STAFF_SHARED_COPY,
} from "@/constants/staff-management.constants";
import { useToast } from "@/hooks/useToast";
import type { AppError } from "@/types/error.types";
import type { EntityStatus } from "@/constants/status-badge.constants";
import {
  createStaffSchema,
  editStaffSchema,
  type CreateStaffFormData,
  type EditStaffFormData,
} from "../schemas/staff.schema";
import { useCreateStaff, useUpdateStaff } from "../hooks/useStaffMutations";
import { useDepartmentOptions } from "../hooks/useDepartmentOptions";
import { applyAppErrorToForm } from "../utils/apply-app-error-to-form";
import type { AdministrativeStaff } from "../types/staff.types";

function isAppError(value: unknown): value is AppError {
  return (
    typeof value === "object" &&
    value !== null &&
    "code" in value &&
    "message" in value
  );
}

interface StaffFormDrawerProps {
  open: boolean;
  mode: "create" | "edit" | "view";
  member?: AdministrativeStaff | null;
  onClose: () => void;
}

export function StaffFormDrawer({
  open,
  mode,
  member,
  onClose,
}: StaffFormDrawerProps) {
  const toast = useToast();
  const createMutation = useCreateStaff();
  const updateMutation = useUpdateStaff();
  const departmentQuery = useDepartmentOptions();
  const [formError, setFormError] = useState<string | null>(null);
  const readOnly = mode === "view";
  const schema = mode === "create" ? createStaffSchema : editStaffSchema;

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isDirty },
  } = useForm<CreateStaffFormData | EditStaffFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      employeeId: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      departmentId: "",
      office: "",
      position: "",
      dashboardRole: "staff",
      status: "active",
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
      departmentId: member.departmentId ?? "",
      office: member.office,
      position: member.position,
      dashboardRole: member.dashboardRole,
      status: member.status,
    });
  }, [member, mode, reset]);

  const departmentOptions = useMemo(
    () => [{ value: "", label: "No department" }, ...(departmentQuery.data ?? [])],
    [departmentQuery.data],
  );

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
      departmentId: data.departmentId?.trim() || undefined,
      office: data.office,
      position: data.position,
      dashboardRole: data.dashboardRole,
      status: data.status as EntityStatus,
    };
    try {
      if (mode === "create") {
        await createMutation.mutateAsync(payload);
        toast.success({ title: STAFF_COPY.createSuccess });
      } else if (member) {
        await updateMutation.mutateAsync({ id: member.id, input: payload });
        toast.success({ title: STAFF_COPY.updateSuccess });
      }
      handleClose();
    } catch (error) {
      if (isAppError(error)) {
        const mapped = applyAppErrorToForm(error, setError);
        if (!mapped) setFormError(error.message);
        return;
      }
      setFormError(STAFF_SHARED_COPY.errorDescription);
    }
  });

  const title =
    mode === "create"
      ? STAFF_COPY.drawerCreateTitle
      : mode === "view"
        ? STAFF_COPY.drawerViewTitle
        : STAFF_COPY.drawerEditTitle;

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
              {STAFF_SHARED_COPY.cancelAction}
            </Button>
          </div>
        ) : (
          <div className="flex flex-wrap justify-end gap-2">
            <Button type="button" variant="ghost" onClick={handleClose}>
              {STAFF_SHARED_COPY.cancelAction}
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
              {STAFF_SHARED_COPY.saveAction}
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
        <p className="text-[13px] text-muted-fg">
          {STAFF_COPY.departmentOrOfficeHint}
        </p>
        <Controller
          name="employeeId"
          control={control}
          render={({ field }) => (
            <FormField
              name="employeeId"
              label={STAFF_COPY.fieldEmployeeId}
              required
              error={errors.employeeId?.message}
            >
              <TextInput
                id="staff-employee-id"
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
              label={STAFF_COPY.fieldFirstName}
              required
              error={errors.firstName?.message}
            >
              <TextInput
                id="staff-first-name"
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
              label={STAFF_COPY.fieldLastName}
              required
              error={errors.lastName?.message}
            >
              <TextInput
                id="staff-last-name"
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
              label={STAFF_COPY.fieldEmail}
              required
              error={errors.email?.message}
            >
              <EmailInput
                id="staff-email"
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
              label={STAFF_COPY.fieldPhone}
              required
              error={errors.phone?.message}
            >
              <TextInput
                id="staff-phone"
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
              label={STAFF_COPY.fieldDepartment}
              error={errors.departmentId?.message}
            >
              <SingleSelect
                id="staff-department"
                options={departmentOptions}
                value={field.value ?? ""}
                onChange={field.onChange}
                placeholder="No department"
                disabled={readOnly}
                hasError={Boolean(errors.departmentId)}
              />
            </FormField>
          )}
        />
        <Controller
          name="office"
          control={control}
          render={({ field }) => (
            <FormField
              name="office"
              label={STAFF_COPY.fieldOffice}
              error={errors.office?.message}
            >
              <TextInput
                id="staff-office"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                disabled={readOnly}
                hasError={Boolean(errors.office)}
              />
            </FormField>
          )}
        />
        <Controller
          name="position"
          control={control}
          render={({ field }) => (
            <FormField
              name="position"
              label={STAFF_COPY.fieldPosition}
              required
              error={errors.position?.message}
            >
              <TextInput
                id="staff-position"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                disabled={readOnly}
                hasError={Boolean(errors.position)}
              />
            </FormField>
          )}
        />
        <Controller
          name="dashboardRole"
          control={control}
          render={({ field }) => (
            <FormField
              name="dashboardRole"
              label={STAFF_COPY.fieldDashboardRole}
              required
              error={errors.dashboardRole?.message}
            >
              <SingleSelect
                id="staff-dashboard-role"
                options={STAFF_ROLE_OPTIONS}
                value={field.value}
                onChange={field.onChange}
                disabled={readOnly}
                hasError={Boolean(errors.dashboardRole)}
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
              label={STAFF_COPY.fieldStatus}
              required
              error={errors.status?.message}
            >
              <SingleSelect
                id="staff-status"
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
