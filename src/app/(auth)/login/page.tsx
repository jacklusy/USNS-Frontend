import { Suspense } from "react";
import { AUTH_COPY } from "@/constants/auth.constants";
import { LoginForm } from "@/modules/auth/components/LoginForm";

function LoginFormFallback() {
  return (
    <div
      className="flex min-h-[200px] items-center justify-center"
      aria-busy="true"
      aria-label="Loading sign in form"
    >
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-brand" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-[36px] font-semibold leading-[1.1] tracking-[-0.015em] text-foreground md:text-[48px]">
          {AUTH_COPY.loginTitle}
        </h1>
        <p className="text-[15px] leading-[1.6] text-muted-fg md:text-base">
          {AUTH_COPY.loginSubtitle}
        </p>
      </div>
      <Suspense fallback={<LoginFormFallback />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
