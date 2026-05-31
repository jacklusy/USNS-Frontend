"use client";

import { AUDIT_COPY } from "@/constants/audit-management.constants";
import { AuditTabs } from "./AuditTabs";

export function AuditPageContent() {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.01em] text-foreground md:text-[32px]">
          {AUDIT_COPY.pageTitle}
        </h1>
        <p className="max-w-2xl text-[15px] leading-relaxed text-muted-fg">
          {AUDIT_COPY.pageDescription}
        </p>
      </div>
      <AuditTabs />
    </div>
  );
}
