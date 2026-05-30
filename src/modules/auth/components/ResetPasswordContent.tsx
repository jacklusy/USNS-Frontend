"use client";

import { Suspense } from "react";
import { AUTH_COPY } from "@/constants/auth.constants";
import { useResetPasswordToken } from "../hooks/useResetPassword";
import { ResetPasswordErrorPanel } from "./ResetPasswordErrorPanel";
import { ResetPasswordForm } from "./ResetPasswordForm";

function ResetPasswordBody() {
  const { token, isValid, isInvalid, isLoading } = useResetPasswordToken();

  if (isLoading) {
    return (
      <div
        className="flex min-h-[200px] items-center justify-center"
        aria-busy="true"
        aria-label="Validating reset link"
      >
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-brand" />
      </div>
    );
  }

  if (isInvalid || !isValid) {
    return <ResetPasswordErrorPanel />;
  }

  return <ResetPasswordForm token={token} />;
}

function ResetPasswordFallback() {
  return (
    <div
      className="flex min-h-[200px] items-center justify-center"
      aria-busy="true"
      aria-label="Loading reset password"
    >
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-brand" />
    </div>
  );
}

export function ResetPasswordContent() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-[36px] font-semibold leading-[1.1] tracking-[-0.015em] text-foreground md:text-[48px]">
          {AUTH_COPY.resetTitle}
        </h1>
        <p className="text-[15px] leading-[1.6] text-muted-fg md:text-base">
          {AUTH_COPY.resetSubtitle}
        </p>
      </div>
      <Suspense fallback={<ResetPasswordFallback />}>
        <ResetPasswordBody />
      </Suspense>
    </div>
  );
}
