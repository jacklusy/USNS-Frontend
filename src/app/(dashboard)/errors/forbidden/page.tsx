"use client";

import { Ban } from "lucide-react";
import { useRouter } from "next/navigation";
import { AuthErrorPanel } from "@/components/shared/AuthErrorPanel";
import { AUTH_ERROR_COPY } from "@/constants/auth.constants";
import { ROUTES } from "@/constants/routes.constants";

export default function ForbiddenErrorPage() {
  const router = useRouter();
  const copy = AUTH_ERROR_COPY.forbidden;

  return (
    <AuthErrorPanel
      icon={Ban}
      title={copy.title}
      description={copy.description}
      ctaLabel={copy.ctaLabel}
      onCtaClick={() => {
        if (typeof window !== "undefined" && window.history.length > 1) {
          router.back();
          return;
        }
        router.push(ROUTES.DASHBOARD);
      }}
    />
  );
}
