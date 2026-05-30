"use client";

import { useEffect, useMemo, useState } from "react";
import { FilterChips, FilterPanel } from "@/components/shared/FilterPanel";
import { Pagination } from "@/components/shared/Pagination";
import { ConfirmationDialog } from "@/components/ui/ConfirmationDialog";
import { Button } from "@/components/ui/Button";
import { ErrorState } from "@/components/shared/ErrorState";
import { NOTIFICATIONS_COPY } from "@/constants/notifications-management.constants";
import { NOTIFICATIONS_FILTER_CONFIG } from "@/constants/notifications-filter.constants";
import { useFilterUrlState } from "@/hooks/useFilterUrlState";
import { useToast } from "@/hooks/useToast";
import { useNotificationStore } from "@/store/notification.slice";
import {
  useDeleteNotification,
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
  useMarkNotificationUnread,
} from "../hooks/useNotificationMutations";
import { useNotificationList } from "../hooks/useNotificationList";
import { parseNotificationFilterValues } from "../utils/parse-notification-filters";
import { NotificationListItem } from "./NotificationListItem";

const DEFAULT_PER_PAGE = 10;

export function NotificationsCenterSection() {
  const toast = useToast();
  const unreadCount = useNotificationStore((s) => s.unreadCount);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE);
  const [filterOpen, setFilterOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [markingReadId, setMarkingReadId] = useState<string | null>(null);
  const [markingUnreadId, setMarkingUnreadId] = useState<string | null>(null);

  const {
    draftValues,
    appliedValues,
    setDraftField,
    applyFilters,
    clearAllFilters,
    removeAppliedFilter,
    syncDraftFromUrl,
  } = useFilterUrlState({ config: NOTIFICATIONS_FILTER_CONFIG });

  const filters = useMemo(
    () => parseNotificationFilterValues(appliedValues),
    [appliedValues],
  );

  const listParams = useMemo(
    () => ({
      page,
      per_page: perPage,
      category: filters.category,
      read: filters.read ?? "all",
    }),
    [page, perPage, filters.category, filters.read],
  );

  const listQuery = useNotificationList(listParams);
  const markReadMutation = useMarkNotificationRead();
  const markUnreadMutation = useMarkNotificationUnread();
  const markAllMutation = useMarkAllNotificationsRead();
  const deleteMutation = useDeleteNotification();

  useEffect(() => {
    setPage(1);
  }, [appliedValues]);

  const rows = listQuery.data?.data ?? [];
  const meta = listQuery.data?.meta;
  const hasActiveFilters =
    Boolean(filters.category) ||
    (filters.read !== undefined && filters.read !== "all");

  const handleMarkRead = async (id: string) => {
    setMarkingReadId(id);
    try {
      await markReadMutation.mutateAsync(id);
      toast.success({ title: NOTIFICATIONS_COPY.markReadSuccess });
    } catch {
      toast.error({ title: NOTIFICATIONS_COPY.loadErrorTitle });
    } finally {
      setMarkingReadId(null);
    }
  };

  const handleMarkUnread = async (id: string) => {
    setMarkingUnreadId(id);
    try {
      await markUnreadMutation.mutateAsync(id);
      toast.success({ title: NOTIFICATIONS_COPY.markUnreadSuccess });
    } catch {
      toast.error({ title: NOTIFICATIONS_COPY.loadErrorTitle });
    } finally {
      setMarkingUnreadId(null);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllMutation.mutateAsync();
      toast.success({ title: NOTIFICATIONS_COPY.markAllSuccess });
    } catch {
      toast.error({ title: NOTIFICATIONS_COPY.loadErrorTitle });
    }
  };

  const confirmDelete = async () => {
    if (!pendingDeleteId) return;
    try {
      await deleteMutation.mutateAsync(pendingDeleteId);
      toast.success({ title: NOTIFICATIONS_COPY.deleteSuccess });
      setPendingDeleteId(null);
    } catch {
      toast.error({ title: NOTIFICATIONS_COPY.loadErrorTitle });
    }
  };

  if (listQuery.isError) {
    return (
      <ErrorState
        title={NOTIFICATIONS_COPY.loadErrorTitle}
        description={NOTIFICATIONS_COPY.loadErrorDescription}
        onRetry={() => void listQuery.refetch()}
      />
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <FilterPanel
          config={NOTIFICATIONS_FILTER_CONFIG}
          values={draftValues}
          appliedValues={appliedValues}
          open={filterOpen}
          onOpenChange={(open) => {
            if (open) syncDraftFromUrl();
            setFilterOpen(open);
          }}
          onFieldChange={setDraftField}
          onApply={() => {
            applyFilters();
            setFilterOpen(false);
          }}
          onClearAll={clearAllFilters}
        />
        <Button
          type="button"
          variant="secondary"
          disabled={unreadCount === 0}
          loading={markAllMutation.isPending}
          onClick={() => void handleMarkAllRead()}
        >
          {NOTIFICATIONS_COPY.markAllRead}
        </Button>
      </div>
      <FilterChips
        config={NOTIFICATIONS_FILTER_CONFIG}
        values={appliedValues}
        onRemove={removeAppliedFilter}
        onClearAll={clearAllFilters}
      />
      {listQuery.isLoading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-24 animate-pulse rounded-lg bg-border"
            />
          ))}
        </div>
      ) : rows.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
          <h3 className="text-[18px] font-semibold text-foreground">
            {hasActiveFilters
              ? NOTIFICATIONS_COPY.emptyFilteredTitle
              : NOTIFICATIONS_COPY.emptyTitle}
          </h3>
          <p className="max-w-md text-[15px] text-muted-fg">
            {hasActiveFilters
              ? NOTIFICATIONS_COPY.emptyFilteredDescription
              : NOTIFICATIONS_COPY.emptyDescription}
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3" role="list">
          {rows.map((notification) => (
            <li key={notification.id}>
              <NotificationListItem
                notification={notification}
                onMarkRead={(id) => void handleMarkRead(id)}
                onMarkUnread={(id) => void handleMarkUnread(id)}
                onDelete={setPendingDeleteId}
                isMarkingRead={markingReadId === notification.id}
                isMarkingUnread={markingUnreadId === notification.id}
              />
            </li>
          ))}
        </ul>
      )}
      {meta && meta.total > 0 ? (
        <Pagination
          page={meta.page}
          perPage={meta.per_page}
          total={meta.total}
          onPageChange={setPage}
          onPerPageChange={(value) => {
            setPerPage(value);
            setPage(1);
          }}
          disabled={listQuery.isFetching}
        />
      ) : null}
      <ConfirmationDialog
        open={pendingDeleteId !== null}
        onClose={() => setPendingDeleteId(null)}
        title={NOTIFICATIONS_COPY.deleteTitle}
        description={NOTIFICATIONS_COPY.deleteDescription}
        confirmLabel={NOTIFICATIONS_COPY.deleteConfirm}
        cancelLabel={NOTIFICATIONS_COPY.cancel}
        destructive
        loading={deleteMutation.isPending}
        onConfirm={() => void confirmDelete()}
      />
    </>
  );
}
