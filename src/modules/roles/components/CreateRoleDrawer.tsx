"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { FormField } from "@/components/ui/FormField";
import { TextInput, TextareaInput } from "@/components/ui/inputs";
import { ROLES_MANAGEMENT_COPY } from "@/constants/roles-management.constants";
import { useToast } from "@/hooks/useToast";
import type { AppError } from "@/types/error.types";
import type { Permission } from "@/types/permission.types";
import {
  createRoleSchema,
  type CreateRoleFormData,
} from "../schemas/create-role.schema";
import { useCreateRole } from "../hooks/useCreateRole";
import { applyAppErrorToForm } from "../utils/apply-app-error-to-form";
import { PermissionMatrixFields } from "./PermissionMatrixFields";

function isAppError(value: unknown): value is AppError {
  return (
    typeof value === "object" &&
    value !== null &&
    "code" in value &&
    "message" in value
  );
}

interface CreateRoleDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CreateRoleDrawer({ open, onClose }: CreateRoleDrawerProps) {
  const toast = useToast();
  const createMutation = useCreateRole();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<CreateRoleFormData>({
    resolver: zodResolver(createRoleSchema),
    defaultValues: {
      name: "",
      description: "",
      permissions: [],
    },
  });

  function handleClose() {
    reset();
    setFormError(null);
    onClose();
  }

  const onSubmit = handleSubmit(async (data) => {
    setFormError(null);
    try {
      await createMutation.mutateAsync({
        name: data.name,
        description: data.description,
        permissions: data.permissions as Permission[],
      });
      toast.success({
        title: ROLES_MANAGEMENT_COPY.toastCreated,
        description: data.name,
      });
      handleClose();
    } catch (error) {
      if (isAppError(error)) {
        const mapped = applyAppErrorToForm(error, setError);
        if (!mapped) {
          setFormError(error.message);
        }
        return;
      }
      setFormError(ROLES_MANAGEMENT_COPY.formErrorGeneric);
    }
  });

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      title={ROLES_MANAGEMENT_COPY.createDrawerTitle}
      description={ROLES_MANAGEMENT_COPY.createDrawerDescription}
      width="md"
      footer={
        <div className="flex flex-wrap justify-end gap-2">
          <Button type="button" variant="ghost" onClick={handleClose}>
            {ROLES_MANAGEMENT_COPY.cancelLabel}
          </Button>
          <Button
            type="button"
            variant="primary"
            loading={createMutation.isPending}
            onClick={() => {
              void onSubmit();
            }}
          >
            {ROLES_MANAGEMENT_COPY.createLabel}
          </Button>
        </div>
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
              label={ROLES_MANAGEMENT_COPY.fieldName}
              required
              error={errors.name?.message}
            >
              <TextInput
                id="role-name"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                hasError={Boolean(errors.name)}
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
              label={ROLES_MANAGEMENT_COPY.fieldDescription}
              error={errors.description?.message}
            >
              <TextareaInput
                id="role-description"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                rows={3}
                hasError={Boolean(errors.description)}
              />
            </FormField>
          )}
        />
        <Controller
          name="permissions"
          control={control}
          render={({ field }) => (
            <PermissionMatrixFields
              value={field.value}
              onChange={field.onChange}
              error={errors.permissions?.message}
            />
          )}
        />
      </form>
    </Drawer>
  );
}
