"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { AUTH_COPY } from "@/constants/auth.constants";
import { ROUTES } from "@/constants/routes.constants";
import type { AppError } from "@/types/error.types";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "../schemas/forgot-password.schema";
import { useForgotPassword } from "../hooks/useForgotPassword";

function isAppError(value: unknown): value is AppError {
  return (
    typeof value === "object" &&
    value !== null &&
    "code" in value &&
    "message" in value
  );
}

export function ForgotPasswordForm() {
  const forgotMutation = useForgotPassword();
  const [isSuccess, setIsSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onBlur",
    defaultValues: { email: "" },
  });

  const onSubmit = handleSubmit(async (data) => {
    setFormError(null);
    setIsSuccess(false);
    try {
      await forgotMutation.mutateAsync(data);
      setIsSuccess(true);
    } catch (error) {
      if (isAppError(error)) {
        setFormError(error.message);
      } else {
        setFormError("Something went wrong. Please try again.");
      }
    }
  });

  if (isSuccess) {
    return (
      <div className="flex flex-col gap-6">
        <div
          role="status"
          className="flex items-start gap-3 rounded-lg border border-border bg-surface-elevated p-5"
        >
          <CheckCircle
            className="h-6 w-6 shrink-0 text-success"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <p className="text-[15px] leading-[1.6] text-foreground">
            {AUTH_COPY.forgotSuccess}
          </p>
        </div>
        <Link
          href={ROUTES.LOGIN}
          className="text-center text-[15px] font-medium text-accent hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          Back to sign in
        </Link>
      </div>
    );
  }

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
        id="forgot-email"
        label="Email address"
        required
        error={errors.email?.message}
      >
        <Input
          id="forgot-email"
          type="email"
          autoComplete="email"
          aria-required="true"
          aria-invalid={Boolean(errors.email)}
          hasError={Boolean(errors.email)}
          {...register("email")}
        />
      </FormField>

      <div className="flex flex-col gap-4">
        <Button
          type="submit"
          variant="brand"
          loading={forgotMutation.isPending}
          className="w-full min-w-0"
        >
          Send reset link
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
