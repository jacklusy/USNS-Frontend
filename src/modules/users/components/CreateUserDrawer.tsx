"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { useForm, type Control, type FieldErrors } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { USERS_COPY } from "@/constants/users.constants";
import { useToast } from "@/hooks/useToast";
import type { AppError } from "@/types/error.types";
import type { UserRole } from "@/types/user.types";
import {
  createUserSchema,
  type CreateUserFormData,
} from "../schemas/create-user.schema";
import { useCreateUser } from "../hooks/useCreateUser";
import { useDepartmentOptions } from "../hooks/useDepartmentOptions";
import { useRoleOptions } from "../hooks/useRoleOptions";
import { applyAppErrorToForm } from "../utils/apply-app-error-to-form";
import type { UserFormValues } from "../types/user-form.types";
import { UserFormFields } from "./UserFormFields";

function isAppError(value: unknown): value is AppError {
  return (
    typeof value === "object" &&
    value !== null &&
    "code" in value &&
    "message" in value
  );
}

interface CreateUserDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CreateUserDrawer({ open, onClose }: CreateUserDrawerProps) {
  const toast = useToast();
  const createMutation = useCreateUser();
  const rolesQuery = useRoleOptions();
  const departmentsQuery = useDepartmentOptions();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      fullName: "",
      email: "",
      role: "staff",
      departmentId: "",
      temporaryPassword: "",
      forcePasswordChange: true,
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
        fullName: data.fullName,
        email: data.email,
        role: data.role as UserRole,
        departmentId: data.departmentId,
        temporaryPassword: data.temporaryPassword,
        forcePasswordChange: data.forcePasswordChange,
      });
      toast.success({
        title: USERS_COPY.toastCreated,
        description: data.fullName,
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
      setFormError(USERS_COPY.formErrorGeneric);
    }
  });

  const roleOptions = rolesQuery.data?.data ?? [];
  const departmentOptions = departmentsQuery.data?.data ?? [];

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      title={USERS_COPY.createDrawerTitle}
      description={USERS_COPY.createDrawerDescription}
      width="md"
      footer={
        <div className="flex flex-wrap justify-end gap-2">
          <Button type="button" variant="ghost" onClick={handleClose}>
            {USERS_COPY.cancelLabel}
          </Button>
          <Button
            type="button"
            variant="primary"
            loading={createMutation.isPending}
            onClick={() => {
              void onSubmit();
            }}
          >
            {USERS_COPY.createLabel}
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
        <UserFormFields
          control={control as Control<UserFormValues>}
          errors={errors as FieldErrors<UserFormValues>}
          roleOptions={roleOptions}
          departmentOptions={departmentOptions}
          showPassword
        />
      </form>
    </Drawer>
  );
}
