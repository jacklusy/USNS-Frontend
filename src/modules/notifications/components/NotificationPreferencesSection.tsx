"use client";

import { useMemo, useState } from "react";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { ConfirmationDialog } from "@/components/ui/ConfirmationDialog";
import { ErrorState } from "@/components/shared/ErrorState";
import { NOTIFICATIONS_COPY } from "@/constants/notifications-management.constants";
import type { NotificationCategory } from "../types/notification.types";
import type { NotificationPreferenceRow } from "../types/preferences.types";
import {
  useNotificationPreferences,
  useResetNotificationPreferences,
  useUpdateNotificationPreference,
} from "../hooks/useNotificationPreferences";

const CATEGORY_ORDER: NotificationCategory[] = [
  "system",
  "academic",
  "security",
];

const CATEGORY_LABELS: Record<NotificationCategory, string> = {
  system: NOTIFICATIONS_COPY.categorySystem,
  academic: NOTIFICATIONS_COPY.categoryAcademic,
  security: NOTIFICATIONS_COPY.categorySecurity,
};

function groupRowsByCategory(
  rows: NotificationPreferenceRow[],
): Record<NotificationCategory, NotificationPreferenceRow[]> {
  return CATEGORY_ORDER.reduce(
    (acc, category) => {
      acc[category] = rows.filter((row) => row.category === category);
      return acc;
    },
    {} as Record<NotificationCategory, NotificationPreferenceRow[]>,
  );
}

export function NotificationPreferencesSection() {
  const [resetOpen, setResetOpen] = useState(false);
  const [pendingTypeId, setPendingTypeId] = useState<string | null>(null);
  const query = useNotificationPreferences();
  const updateMutation = useUpdateNotificationPreference();
  const resetMutation = useResetNotificationPreferences();

  const grouped = useMemo(() => {
    const rows = query.data?.data.rows ?? [];
    return groupRowsByCategory(rows);
  }, [query.data?.data.rows]);

  const handleToggle = async (
    row: NotificationPreferenceRow,
    channel: "inApp" | "email",
    checked: boolean,
  ) => {
    setPendingTypeId(row.typeId);
    const input = {
      typeId: row.typeId,
      inApp: channel === "inApp" ? checked : row.inApp,
      email: channel === "email" ? checked : row.email,
    };
    try {
      await updateMutation.mutateAsync(input);
    } finally {
      setPendingTypeId(null);
    }
  };

  if (query.isLoading) {
    return <div className="h-64 animate-pulse rounded-lg bg-border" />;
  }

  if (query.isError || !query.data?.data) {
    return (
      <ErrorState
        title={NOTIFICATIONS_COPY.preferencesLoadErrorTitle}
        description={NOTIFICATIONS_COPY.preferencesLoadErrorDescription}
        onRetry={() => void query.refetch()}
      />
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-[18px] font-semibold text-foreground">
            {NOTIFICATIONS_COPY.preferencesTitle}
          </h2>
          <p className="max-w-2xl text-[15px] text-muted-fg">
            {NOTIFICATIONS_COPY.preferencesDescription}
          </p>
        </div>
        <Button
          type="button"
          variant="secondary"
          onClick={() => setResetOpen(true)}
        >
          {NOTIFICATIONS_COPY.preferencesReset}
        </Button>
      </div>
      <div className="flex flex-col gap-8">
        {CATEGORY_ORDER.map((category) => {
          const rows = grouped[category];
          if (rows.length === 0) return null;
          return (
            <fieldset
              key={category}
              className="flex flex-col gap-4 rounded-lg border border-border bg-surface-elevated p-5"
            >
              <legend className="text-[15px] font-semibold text-foreground">
                {CATEGORY_LABELS[category]}
              </legend>
              <ul className="flex flex-col gap-4" role="list">
                {rows.map((row) => {
                  const isPending = pendingTypeId === row.typeId;
                  return (
                    <li
                      key={row.typeId}
                      className="flex flex-col gap-3 border-b border-border pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <span className="text-[15px] text-foreground">
                        {row.label}
                      </span>
                      <div className="flex flex-wrap items-center gap-6">
                        <label className="inline-flex cursor-pointer items-center gap-2 text-[15px]">
                          <Checkbox
                            checked={row.inApp}
                            disabled={isPending || updateMutation.isPending}
                            onChange={(event) =>
                              void handleToggle(
                                row,
                                "inApp",
                                event.target.checked,
                              )
                            }
                            aria-label={`${row.label} ${NOTIFICATIONS_COPY.preferencesInApp}`}
                          />
                          {NOTIFICATIONS_COPY.preferencesInApp}
                        </label>
                        <label className="inline-flex cursor-pointer items-center gap-2 text-[15px]">
                          <Checkbox
                            checked={row.email}
                            disabled={isPending || updateMutation.isPending}
                            onChange={(event) =>
                              void handleToggle(
                                row,
                                "email",
                                event.target.checked,
                              )
                            }
                            aria-label={`${row.label} ${NOTIFICATIONS_COPY.preferencesEmail}`}
                          />
                          {NOTIFICATIONS_COPY.preferencesEmail}
                        </label>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </fieldset>
          );
        })}
      </div>
      <ConfirmationDialog
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        title={NOTIFICATIONS_COPY.preferencesResetTitle}
        description={NOTIFICATIONS_COPY.preferencesResetDescription}
        confirmLabel={NOTIFICATIONS_COPY.preferencesResetConfirm}
        cancelLabel={NOTIFICATIONS_COPY.cancel}
        destructive
        loading={resetMutation.isPending}
        onConfirm={() => {
          void resetMutation.mutateAsync().then(() => setResetOpen(false));
        }}
      />
    </>
  );
}
