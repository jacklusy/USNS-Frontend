"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, Check } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { NOTIFICATIONS_COPY } from "@/constants/notifications-management.constants";
import { ROUTES } from "@/constants/routes.constants";
import { useNotificationStore } from "@/store/notification.slice";
import { formatRelativeTime } from "@/utils/format-relative-time";
import {
  useMarkNotificationRead,
} from "../hooks/useNotificationMutations";
import { useRecentNotifications } from "../hooks/useRecentNotifications";
import { NotificationIcon } from "./NotificationIcon";

export function NotificationBellDropdown() {
  const router = useRouter();
  const listId = useId();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const unreadCount = useNotificationStore((s) => s.unreadCount);
  const recentQuery = useRecentNotifications(open);
  const markReadMutation = useMarkNotificationRead();

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        close();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, close]);

  const items = recentQuery.data?.data ?? [];
  const ariaLabel =
    unreadCount > 0
      ? NOTIFICATIONS_COPY.bellAriaLabelUnread.replace(
          "{count}",
          String(unreadCount),
        )
      : NOTIFICATIONS_COPY.bellAriaLabel;

  const handleItemClick = async (
    id: string,
    read: boolean,
    linkHref?: string,
  ) => {
    if (!read) {
      await markReadMutation.mutateAsync(id);
    }
    close();
    if (linkHref) {
      router.push(linkHref);
    }
  };

  const handleMarkReadOnly = async (id: string) => {
    await markReadMutation.mutateAsync(id);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        className="relative inline-flex h-11 w-11 items-center justify-center rounded-md text-muted-fg transition-colors hover:bg-usns-green-light hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={open ? listId : undefined}
        onClick={() => setOpen((value) => !value)}
      >
        <Bell className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
        {unreadCount > 0 ? (
          <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-pill bg-danger px-1 text-[10px] font-medium text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        ) : null}
      </button>
      {open ? (
        <div
          id={listId}
          role="region"
          aria-label={NOTIFICATIONS_COPY.bellAriaLabel}
          className="absolute right-0 z-50 mt-2 w-[min(360px,calc(100vw-2rem))] overflow-hidden rounded-lg border border-border bg-surface-elevated shadow-[var(--shadow-e3)]"
        >
          {recentQuery.isLoading ? (
            <div className="p-4">
              <div className="h-16 animate-pulse rounded-md bg-border" />
            </div>
          ) : items.length === 0 ? (
            <p className="px-4 py-6 text-center text-[15px] text-muted-fg">
              {NOTIFICATIONS_COPY.bellEmpty}
            </p>
          ) : (
            <ul className="max-h-[320px] overflow-y-auto py-1" role="list">
              {items.map((notification) => (
                <li key={notification.id}>
                  <div className="flex items-start gap-1 px-2 py-1">
                    <button
                      type="button"
                      className="flex min-w-0 flex-1 items-start gap-3 rounded-md px-2 py-2 text-left transition-colors hover:bg-usns-green-light/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
                      onClick={() =>
                        void handleItemClick(
                          notification.id,
                          notification.read,
                          notification.linkHref,
                        )
                      }
                    >
                      <NotificationIcon
                        type={notification.type}
                        className="h-9 w-9"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block text-[15px] font-medium text-foreground">
                          {notification.title}
                        </span>
                        <span className="mt-0.5 block text-[13px] text-muted-fg">
                          {formatRelativeTime(notification.createdAt)}
                        </span>
                      </span>
                    </button>
                    <button
                      type="button"
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-muted-fg hover:bg-surface hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      aria-label={NOTIFICATIONS_COPY.bellMarkRead}
                      onClick={(event) => {
                        event.stopPropagation();
                        void handleMarkReadOnly(notification.id);
                      }}
                    >
                      <Check
                        className="h-4 w-4"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="border-t border-border px-4 py-3">
            <Link
              href={ROUTES.NOTIFICATIONS}
              className="text-[15px] font-medium text-brand hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              onClick={close}
            >
              {NOTIFICATIONS_COPY.bellViewAll}
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
