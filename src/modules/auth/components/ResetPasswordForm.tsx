"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { ROUTES } from "@/constants/routes.constants";
import type { AppError } from "@/types/error.types";
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "../schemas/reset-password.schema";
import { useResetPasswordSubmit } from "../hooks/useResetPassword";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter";

function isAppError(value: unknown): value is AppError {
  return (
    typeof value === "object" &&
    value !== null &&
    "code" in value &&
    "message" in value
  );
}

interface ResetPasswordFormProps {
  token: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const resetMutation = useResetPasswordSubmit(token);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onBlur",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = useWatch({ control, name: "password", defaultValue: "" });

  const onSubmit = handleSubmit(async (data) => {
    setFormError(null);
    try {
      await resetMutation.mutateAsync(data);
    } catch (error) {
      if (isAppError(error)) {
        setFormError(error.message);
      } else {
        setFormError("Something went wrong. Please try again.");
      }
    }
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6" noValidate>
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

      <FormField
        id="new-password"
        label="New password"
        required
        error={errors.password?.message}
      >
        <Input
          id="new-password"
          type="password"
          autoComplete="new-password"
          aria-required="true"
          aria-invalid={Boolean(errors.password)}
          hasError={Boolean(errors.password)}
          {...register("password")}
        />
      </FormField>

      <PasswordStrengthMeter password={passwordValue} />

      <FormField
        id="confirm-password"
        label="Confirm password"
        required
        error={errors.confirmPassword?.message}
      >
        <Input
          id="confirm-password"
          type="password"
          autoComplete="new-password"
          aria-required="true"
          aria-invalid={Boolean(errors.confirmPassword)}
          hasError={Boolean(errors.confirmPassword)}
          {...register("confirmPassword")}
        />
      </FormField>

      <div className="flex flex-col gap-4">
        <Button
          type="submit"
          variant="brand"
          loading={resetMutation.isPending}
          className="w-full min-w-0"
        >
          Reset password
        </Button>
        <Link
          href={ROUTES.LOGIN}
          className="text-center text-[15px] font-medium text-accent hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          Back to sign in
        </Link>
      </div>
    </form>
  );
}
