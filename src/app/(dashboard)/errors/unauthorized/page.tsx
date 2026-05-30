"use client";

import { ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { AuthErrorPanel } from "@/components/shared/AuthErrorPanel";
import { AUTH_ERROR_COPY } from "@/constants/auth.constants";

export default function UnauthorizedErrorPage() {
  const router = useRouter();
  const copy = AUTH_ERROR_COPY.unauthorized;

  return (
    <AuthErrorPanel
      icon={ShieldAlert}
      title={copy.title}
      description={copy.description}
      ctaLabel={copy.ctaLabel}
      onCtaClick={() => router.push(copy.ctaHref)}
    />
  );
}
