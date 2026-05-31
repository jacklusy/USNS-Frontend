"use client";

import { USERS_COPY } from "@/constants/users.constants";
import type { UserAccountStats } from "../types/user-management.types";

interface UserAccountSectionProps {
  account: UserAccountStats;
}

function formatLastLogin(value: Date | null): string {
  if (!value) {
    return "Never";
  }
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

export function UserAccountSection({ account }: UserAccountSectionProps) {
  return (
    <section
      aria-labelledby="user-account-heading"
      className="rounded-lg border border-border bg-surface-elevated p-6"
    >
      <h2
        id="user-account-heading"
        className="text-[24px] font-semibold text-foreground"
      >
        {USERS_COPY.sectionAccount}
      </h2>
      <dl className="mt-6 grid gap-4 sm:grid-cols-3">
        <div>
          <dt className="text-[12px] font-medium uppercase tracking-[0.04em] text-muted-fg">
            {USERS_COPY.fieldLastLogin}
          </dt>
          <dd className="mt-1 text-[15px] font-medium tabular-nums text-foreground">
            {formatLastLogin(account.lastLoginAt)}
          </dd>
        </div>
        <div>
          <dt className="text-[12px] font-medium uppercase tracking-[0.04em] text-muted-fg">
            {USERS_COPY.fieldLoginCount}
          </dt>
          <dd className="mt-1 text-[15px] font-medium tabular-nums text-foreground">
            {account.loginCount}
          </dd>
        </div>
        <div>
          <dt className="text-[12px] font-medium uppercase tracking-[0.04em] text-muted-fg">
            {USERS_COPY.fieldFailedAttempts}
          </dt>
          <dd className="mt-1 text-[15px] font-medium tabular-nums text-foreground">
            {account.failedLoginAttempts}
          </dd>
        </div>
      </dl>
    </section>
  );
}
