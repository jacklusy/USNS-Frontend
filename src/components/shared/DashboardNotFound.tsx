"use client";

import { FileQuestion } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { NOT_FOUND_COPY } from "@/constants/not-found.constants";
import { ROUTES } from "@/constants/routes.constants";

export function DashboardNotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push(ROUTES.DASHBOARD);
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <FileQuestion
        className="h-12 w-12 text-muted-fg"
        strokeWidth={1.75}
        aria-hidden="true"
      />
      <h1 className="mt-6 text-[24px] font-semibold leading-[1.2] tracking-[-0.01em] text-foreground md:text-[32px]">
        {NOT_FOUND_COPY.title}
      </h1>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted-fg">
        {NOT_FOUND_COPY.description}
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button
          type="button"
          variant="brand"
          onClick={() => router.push(ROUTES.DASHBOARD)}
        >
          {NOT_FOUND_COPY.dashboardLabel}
        </Button>
        <Button type="button" variant="secondary" onClick={handleGoBack}>
          {NOT_FOUND_COPY.backLabel}
        </Button>
      </div>
    </div>
  );
}
