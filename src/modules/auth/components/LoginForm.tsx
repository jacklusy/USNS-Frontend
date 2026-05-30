"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { AUTH_COPY } from "@/constants/auth.constants";
import { ROUTES } from "@/constants/routes.constants";
import type { AppError } from "@/types/error.types";
import { loginSchema, type LoginFormData } from "../schemas/login.schema";
import { useLogin } from "../hooks/useLogin";

function isAppError(value: unknown): value is AppError {
  return (
    typeof value === "object" &&
    value !== null &&
    "code" in value &&
    "message" in value
  );
}

export function LoginForm() {
  const loginMutation = useLogin();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setFormError(null);
    try {
      await loginMutation.mutateAsync(data);
    } catch (error) {
      if (isAppError(error) && error.code === "UNAUTHORIZED") {
        setFormError(AUTH_COPY.invalidCredentials);
      } else if (isAppError(error)) {
        setFormError(error.message);
      } else {
        setFormError(AUTH_COPY.invalidCredentials);
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
        id="email"
        label="Email address"
        required
        error={errors.email?.message}
      >
        <Input
          id="email"
          type="email"
          autoComplete="email"
          aria-required="true"
          aria-invalid={Boolean(errors.email)}
          hasError={Boolean(errors.email)}
          {...register("email")}
        />
      </FormField>

      <FormField
        id="password"
        label="Password"
        required
        error={errors.password?.message}
      >
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          aria-required="true"
          aria-invalid={Boolean(errors.password)}
          hasError={Boolean(errors.password)}
          {...register("password")}
        />
      </FormField>

      <div className="flex flex-col gap-4">
        <Button
          type="submit"
          variant="brand"
          loading={loginMutation.isPending}
          className="w-full min-w-0"
        >
          Sign in
        </Button>
        <Link
          href={ROUTES.FORGOT_PASSWORD}
          className="text-center text-[15px] font-medium text-accent hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          Forgot password?
        </Link>
      </div>
    </form>
  );
}
