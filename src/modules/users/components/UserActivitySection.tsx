"use client";

import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { SkeletonText } from "@/components/ui/loading-skeleton";
import { ERROR_STATE_COPY } from "@/constants/error-state.constants";
import { USERS_COPY } from "@/constants/users.constants";
import { Inbox } from "lucide-react";
import { useUserActivity } from "../hooks/useUserActivity";
import { UserAuditActivityItem } from "./UserAuditActivityItem";

interface UserActivitySectionProps {
  userId: string;
}

export function UserActivitySection({ userId }: UserActivitySectionProps) {
  const activityQuery = useUserActivity(userId, { page: 1, per_page: 20 });
  const entries = activityQuery.data?.data ?? [];

  if (activityQuery.isLoading) {
    return <SkeletonText lines={6} />;
  }

  if (activityQuery.isError) {
    return (
      <ErrorState
        title={ERROR_STATE_COPY.defaultTitle}
        description={ERROR_STATE_COPY.defaultDescription}
        variant="inPage"
        onRetry={() => {
          void activityQuery.refetch();
        }}
      />
    );
  }

  if (entries.length === 0) {
    return (
      <EmptyState
        icon={Inbox}
        title={USERS_COPY.activityEmptyTitle}
        description={USERS_COPY.activityEmptyDescription}
        variant="inPage"
      />
    );
  }

  return (
    <ul className="flex flex-col gap-3" aria-label={USERS_COPY.sectionActivity}>
      {entries.map((entry) => (
        <UserAuditActivityItem key={entry.id} entry={entry} />
      ))}
    </ul>
  );
}
