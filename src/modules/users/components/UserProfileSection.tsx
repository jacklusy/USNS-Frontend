"use client";

import { Badge } from "@/components/ui/Badge";
import { ROLE_DISPLAY_LABELS } from "@/constants/roles.constants";
import { USERS_COPY } from "@/constants/users.constants";
import { getUserInitials } from "@/utils/user-initials";
import type { UserDetail } from "../types/user-management.types";
import { formatUserStatusLabel } from "../utils/user-status-display";
import { UserStatus } from "@/types/user.types";

function statusBadgeVariant(
  status: UserDetail["status"],
): "success" | "warning" | "default" {
  if (status === UserStatus.Active) return "success";
  if (status === UserStatus.Suspended) return "warning";
  return "default";
}

interface UserProfileSectionProps {
  user: UserDetail;
}

export function UserProfileSection({ user }: UserProfileSectionProps) {
  const joinDate = new Intl.DateTimeFormat(undefined, {
    dateStyle: "long",
  }).format(user.createdAt);

  return (
    <section
      aria-labelledby="user-profile-heading"
      className="rounded-lg border border-border bg-surface-elevated p-6"
    >
      <h2 id="user-profile-heading" className="sr-only">
        {USERS_COPY.sectionProfile}
      </h2>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <span
          className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-brand text-[24px] font-semibold text-white"
          aria-hidden="true"
        >
          {getUserInitials(user.fullName)}
        </span>
        <div className="min-w-0 flex-1">
          <h1 className="text-[36px] font-semibold leading-[1.1] tracking-[-0.015em] text-foreground md:text-[48px]">
            {user.fullName}
          </h1>
          <p className="mt-2 text-[15px] text-muted-fg">{user.email}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="default">{ROLE_DISPLAY_LABELS[user.role]}</Badge>
            <Badge variant={statusBadgeVariant(user.status)}>
              {formatUserStatusLabel(user.status)}
            </Badge>
          </div>
          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-[12px] font-medium uppercase tracking-[0.04em] text-muted-fg">
                {USERS_COPY.fieldJoinDate}
              </dt>
              <dd className="mt-1 text-[15px] text-foreground">{joinDate}</dd>
            </div>
            <div>
              <dt className="text-[12px] font-medium uppercase tracking-[0.04em] text-muted-fg">
                {USERS_COPY.fieldDepartmentLabel}
              </dt>
              <dd className="mt-1 text-[15px] text-foreground">
                {user.departmentName}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
