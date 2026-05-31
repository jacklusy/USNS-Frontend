"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { PasswordInput } from "@/components/ui/inputs";
import { ROUTES } from "@/constants/routes.constants";
import { useToast } from "@/hooks/useToast";
import { PasswordStrengthMeter } from "@/modules/auth/components/PasswordStrengthMeter";
import type { AppError } from "@/types/error.types";
import { PROFILE_COPY } from "../constants/profile-management.constants";
import {
  changePasswordSchema,
  type ChangePasswordFormData,
} from "../schemas/change-password.schema";
import { useChangePassword } from "../hooks/useChangePassword";

function isAppError(value: unknown): value is AppError {
  return (
    typeof value === "object" &&
    value !== null &&
    "code" in value &&
    "message" in value
  );
}

export function ChangePasswordSection() {
  const router = useRouter();
  const toast = useToast();
  const changeMutation = useChangePassword();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onBlur",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPasswordValue = useWatch({
    control,
    name: "newPassword",
    defaultValue: "",
  });

  const onSubmit = handleSubmit(async (data) => {
    setFormError(null);
    try {
      await changeMutation.mutateAsync({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      toast.success({
        title: PROFILE_COPY.passwordSuccessTitle,
        description: PROFILE_COPY.passwordSuccessDescription,
      });
      router.push(ROUTES.PROFILE);
    } catch (error) {
      if (isAppError(error) && error.code === "VALIDATION_ERROR") {
        const currentMessages = error.details?.currentPassword;
        if (currentMessages?.[0]) {
          setError("currentPassword", { message: currentMessages[0] });
          return;
        }
      }
      if (isAppError(error)) {
        setFormError(error.message);
      } else {
        setFormError(PROFILE_COPY.passwordErrorTitle);
      }
    }
  });

  return (
    <section
      aria-labelledby="change-password-heading"
      className="max-w-[420px] rounded-lg border border-border bg-surface-elevated p-6"
    >
      <h2
        id="change-password-heading"
        className="text-[18px] font-semibold leading-[1.3] text-foreground"
      >
        {PROFILE_COPY.sectionPassword}
      </h2>
      <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4" noValidate>
        {formError ? (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-md border border-danger/30 bg-surface p-4 text-[13px] text-danger"
          >
            <AlertCircle
              className="mt-0.5 h-4 w-4 shrink-0"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <p>{formError}</p>
          </div>
        ) : null}
        <FormField
          name="currentPassword"
          label={PROFILE_COPY.fieldCurrentPassword}
          required
          error={errors.currentPassword?.message}
        >
          <PasswordInput
            id="profile-current-password"
            autoComplete="current-password"
            aria-required="true"
            aria-invalid={Boolean(errors.currentPassword)}
            hasError={Boolean(errors.currentPassword)}
            {...register("currentPassword")}
          />
        </FormField>
        <FormField
          name="newPassword"
          label={PROFILE_COPY.fieldNewPassword}
          required
          error={errors.newPassword?.message}
        >
          <PasswordInput
            id="profile-new-password"
            autoComplete="new-password"
            aria-required="true"
            aria-invalid={Boolean(errors.newPassword)}
            hasError={Boolean(errors.newPassword)}
            {...register("newPassword")}
          />
        </FormField>
        <PasswordStrengthMeter password={newPasswordValue} />
        <FormField
          name="confirmPassword"
          label={PROFILE_COPY.fieldConfirmPassword}
          required
          error={errors.confirmPassword?.message}
        >
          <PasswordInput
            id="profile-confirm-password"
            autoComplete="new-password"
            aria-required="true"
            aria-invalid={Boolean(errors.confirmPassword)}
            hasError={Boolean(errors.confirmPassword)}
            {...register("confirmPassword")}
          />
        </FormField>
        <Button
          type="submit"
          variant="primary"
          loading={changeMutation.isPending}
        >
          {PROFILE_COPY.updatePassword}
        </Button>
      </form>
    </section>
  );
}
