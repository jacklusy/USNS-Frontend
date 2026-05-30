"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { FormField } from "@/components/ui/FormField";
import { TextInput, TextareaInput } from "@/components/ui/inputs";
import { SkeletonForm } from "@/components/ui/loading-skeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import { ERROR_STATE_COPY } from "@/constants/error-state.constants";
import { ROLES_MANAGEMENT_COPY } from "@/constants/roles-management.constants";
import { useToast } from "@/hooks/useToast";
import type { AppError } from "@/types/error.types";
import type { Permission } from "@/types/permission.types";
import {
  editRoleSchema,
  type EditRoleFormData,
} from "../schemas/edit-role.schema";
import { useRole } from "../hooks/useRole";
import { useUpdateRole } from "../hooks/useUpdateRole";
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

interface EditRoleDrawerProps {
  roleId: string | null;
  open: boolean;
  mode: "edit" | "view";
  onClose: () => void;
}

export function EditRoleDrawer({
  roleId,
  open,
  mode,
  onClose,
}: EditRoleDrawerProps) {
  const toast = useToast();
  const roleQuery = useRole(roleId, open && Boolean(roleId));
  const updateMutation = useUpdateRole();
  const [formError, setFormError] = useState<string | null>(null);
  const readOnly = mode === "view";

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isDirty },
  } = useForm<EditRoleFormData>({
    resolver: zodResolver(editRoleSchema),
    defaultValues: {
      name: "",
      description: "",
      permissions: [],
    },
  });

  const role = roleQuery.data?.data;

  useEffect(() => {
    if (!role) return;
    reset({
      name: role.name,
      description: role.description,
      permissions: [...role.permissions],
    });
  }, [role, reset]);

  function handleClose() {
    reset();
    setFormError(null);
    onClose();
  }

  const onSubmit = handleSubmit(async (data) => {
    if (!roleId || readOnly) return;
    setFormError(null);
    try {
      await updateMutation.mutateAsync({
        id: roleId,
        input: {
          name: data.name,
          description: data.description,
          permissions: data.permissions as Permission[],
        },
      });
      toast.success({
        title: ROLES_MANAGEMENT_COPY.toastUpdated,
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

  const title =
    mode === "view"
      ? ROLES_MANAGEMENT_COPY.viewDrawerTitle
      : ROLES_MANAGEMENT_COPY.editDrawerTitle;
  const description =
    mode === "view"
      ? ROLES_MANAGEMENT_COPY.viewDrawerDescription
      : ROLES_MANAGEMENT_COPY.editDrawerDescription;

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      title={title}
      description={description}
      width="md"
      footer={
        readOnly ? (
          <div className="flex justify-end">
            <Button type="button" variant="ghost" onClick={handleClose}>
              {ROLES_MANAGEMENT_COPY.closeLabel}
            </Button>
          </div>
        ) : (
          <div className="flex flex-wrap justify-end gap-2">
            <Button type="button" variant="ghost" onClick={handleClose}>
              {ROLES_MANAGEMENT_COPY.cancelLabel}
            </Button>
            <Button
              type="button"
              variant="primary"
              loading={updateMutation.isPending}
              disabled={!isDirty}
              onClick={() => {
                void onSubmit();
              }}
            >
              {ROLES_MANAGEMENT_COPY.saveLabel}
            </Button>
          </div>
        )
      }
    >
      {roleQuery.isLoading ? (
        <SkeletonForm fields={4} />
      ) : roleQuery.isError ? (
        <ErrorState
          title={ROLES_MANAGEMENT_COPY.roleLoadErrorTitle}
          description={ROLES_MANAGEMENT_COPY.roleLoadErrorDescription}
          variant="inPage"
          onRetry={() => {
            void roleQuery.refetch();
          }}
        />
      ) : role ? (
        <form
          onSubmit={(event) => {
            void onSubmit(event);
          }}
          className="flex flex-col gap-4"
          noValidate
        >
          {role.isSystem ? (
            <Badge variant="default">{ROLES_MANAGEMENT_COPY.systemRoleBadge}</Badge>
          ) : null}
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
                  id="edit-role-name"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  disabled={readOnly || role.isSystem}
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
                  id="edit-role-description"
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
            name="permissions"
            control={control}
            render={({ field }) => (
              <PermissionMatrixFields
                value={field.value}
                onChange={field.onChange}
                disabled={readOnly}
                error={errors.permissions?.message}
              />
            )}
          />
        </form>
      ) : (
        <ErrorState
          title={ERROR_STATE_COPY.defaultTitle}
          description={ERROR_STATE_COPY.defaultDescription}
          variant="inPage"
        />
      )}
    </Drawer>
  );
}
