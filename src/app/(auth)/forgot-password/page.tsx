import { AUTH_COPY } from "@/constants/auth.constants";
import { ForgotPasswordForm } from "@/modules/auth/components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-[36px] font-semibold leading-[1.1] tracking-[-0.015em] text-foreground md:text-[48px]">
          {AUTH_COPY.forgotTitle}
        </h1>
        <p className="text-[15px] leading-[1.6] text-muted-fg md:text-base">
          {AUTH_COPY.forgotSubtitle}
        </p>
      </div>
      <ForgotPasswordForm />
    </div>
  );
}
