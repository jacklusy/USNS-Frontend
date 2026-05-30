"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, type Control, type FieldErrors } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { ErrorState } from "@/components/shared/ErrorState";
import { SkeletonForm } from "@/components/ui/loading-skeleton";
import { isRoleDemotion } from "@/constants/user-role-rank.constants";
import { ERROR_STATE_COPY } from "@/constants/error-state.constants";
import { USERS_COPY } from "@/constants/users.constants";
import { useToast } from "@/hooks/useToast";
import { useAuthStore } from "@/store/auth.slice";
import type { AppError } from "@/types/error.types";
import type { UserRole } from "@/types/user.types";
import {
  editUserSchema,
  type EditUserFormData,
} from "../schemas/edit-user.schema";
import { useDepartmentOptions } from "../hooks/useDepartmentOptions";
import { useRoleOptions } from "../hooks/useRoleOptions";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { useUser } from "../hooks/useUser";
import { applyAppErrorToForm } from "../utils/apply-app-error-to-form";
import { RoleChangeConfirmDialog } from "./RoleChangeConfirmDialog";
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

interface EditUserDrawerProps {
  userId: string | null;
  open: boolean;
  mode: "edit" | "view";
  onClose: () => void;
}

export function EditUserDrawer({
  userId,
  open,
  mode,
  onClose,
}: EditUserDrawerProps) {
  const toast = useToast();
  const authUser = useAuthStore((s) => s.user);
  const updateMutation = useUpdateUser();
  const userQuery = useUser(userId, open);
  const rolesQuery = useRoleOptions();
  const departmentsQuery = useDepartmentOptions();
  const [formError, setFormError] = useState<string | null>(null);
  const [roleConfirmOpen, setRoleConfirmOpen] = useState(false);
  const [pendingValues, setPendingValues] = useState<EditUserFormData | null>(
    null,
  );

  const readOnly = mode === "view";

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isDirty },
  } = useForm<EditUserFormData>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      fullName: "",
      email: "",
      role: "staff",
      departmentId: "",
      forcePasswordChange: false,
    },
  });

  useEffect(() => {
    if (!userQuery.data?.data) return;
    const user = userQuery.data.data;
    reset({
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      departmentId: user.departmentId,
      forcePasswordChange: user.forcePasswordChange,
    });
  }, [reset, userQuery.data?.data]);

  function handleClose() {
    setFormError(null);
    setPendingValues(null);
    setRoleConfirmOpen(false);
    onClose();
  }

  async function saveUser(data: EditUserFormData) {
    if (!userId) return;
    setFormError(null);
    try {
      await updateMutation.mutateAsync({
        id: userId,
        input: {
          fullName: data.fullName,
          email: data.email,
          role: data.role as UserRole,
          departmentId: data.departmentId,
          forcePasswordChange: data.forcePasswordChange,
        },
      });
      toast.success({
        title: USERS_COPY.toastUpdated,
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
  }

  const onSubmit = handleSubmit(async (data) => {
    if (readOnly || !userId || !authUser) {
      return;
    }

    const isSelf = authUser.id === userId;
    const currentRole = userQuery.data?.data.role;
    if (
      isSelf &&
      currentRole &&
      isRoleDemotion(currentRole, data.role as UserRole)
    ) {
      setPendingValues(data);
      setRoleConfirmOpen(true);
      return;
    }

    await saveUser(data);
  });

  const roleOptions = rolesQuery.data?.data ?? [];
  const departmentOptions = departmentsQuery.data?.data ?? [];

  const title =
    mode === "view" ? USERS_COPY.viewDrawerTitle : USERS_COPY.editDrawerTitle;
  const description =
    mode === "view"
      ? USERS_COPY.viewDrawerDescription
      : USERS_COPY.editDrawerDescription;

  return (
    <>
      <Drawer
        open={open}
        onClose={handleClose}
        title={title}
        description={description}
        width="md"
        footer={
          <div className="flex flex-wrap justify-end gap-2">
            <Button type="button" variant="ghost" onClick={handleClose}>
              {readOnly ? USERS_COPY.closeLabel : USERS_COPY.cancelLabel}
            </Button>
            {readOnly ? null : (
              <Button
                type="button"
                variant="primary"
                loading={updateMutation.isPending}
                disabled={!isDirty}
                onClick={() => {
                  void onSubmit();
                }}
              >
                {USERS_COPY.saveLabel}
              </Button>
            )}
          </div>
        }
      >
        {userQuery.isLoading ? (
          <SkeletonForm fields={5} />
        ) : null}
        {userQuery.isError ? (
          <ErrorState
            title={USERS_COPY.userLoadErrorTitle}
            description={USERS_COPY.userLoadErrorDescription}
            variant="inPage"
            onRetry={() => {
              void userQuery.refetch();
            }}
            retryLabel={ERROR_STATE_COPY.retryLabel}
          />
        ) : null}
        {userQuery.isSuccess ? (
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
              disabled={readOnly}
            />
          </form>
        ) : null}
      </Drawer>
      <RoleChangeConfirmDialog
        open={roleConfirmOpen}
        loading={updateMutation.isPending}
        onClose={() => {
          setRoleConfirmOpen(false);
          setPendingValues(null);
        }}
        onConfirm={() => {
          if (!pendingValues) return;
          void saveUser(pendingValues).finally(() => {
            setRoleConfirmOpen(false);
            setPendingValues(null);
          });
        }}
      />
    </>
  );
}
