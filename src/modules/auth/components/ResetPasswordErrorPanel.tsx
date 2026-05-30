import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { AUTH_COPY } from "@/constants/auth.constants";
import { ROUTES } from "@/constants/routes.constants";
export function ResetPasswordErrorPanel() {
  return (
    <div
      className="flex flex-col items-center py-8 text-center"
      role="alert"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-danger/10 text-danger">
        <AlertCircle className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
      </div>
      <h2 className="mt-4 text-2xl font-semibold text-foreground">
        Link unavailable
      </h2>
      <p className="mt-2 max-w-md text-[15px] leading-6 text-muted-fg">
        {AUTH_COPY.resetInvalidToken}
      </p>
      <Link
        href={ROUTES.FORGOT_PASSWORD}
        className="mt-6 inline-flex h-11 min-w-[120px] items-center justify-center rounded-md bg-brand px-5 text-[15px] font-medium text-white transition-colors hover:bg-usns-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        Request new link
      </Link>
      <Link
        href={ROUTES.LOGIN}
        className="mt-4 text-[15px] font-medium text-accent hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        Back to sign in
      </Link>
    </div>
  );
}
