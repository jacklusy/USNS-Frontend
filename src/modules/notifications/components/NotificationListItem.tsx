"use client";

import Link from "next/link";
import { Mail, MailOpen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { NOTIFICATIONS_COPY } from "@/constants/notifications-management.constants";
import { formatRelativeTime } from "@/utils/format-relative-time";
import type { Notification } from "../types/notification.types";
import { NotificationIcon } from "./NotificationIcon";

interface NotificationListItemProps {
  notification: Notification;
  onMarkRead: (id: string) => void;
  onMarkUnread: (id: string) => void;
  onDelete: (id: string) => void;
  isMarkingRead?: boolean;
  isMarkingUnread?: boolean;
}

export function NotificationListItem({
  notification,
  onMarkRead,
  onMarkUnread,
  onDelete,
  isMarkingRead = false,
  isMarkingUnread = false,
}: NotificationListItemProps) {
  const titleContent = (
    <span
      className={`text-[15px] font-medium leading-snug ${
        notification.read ? "text-muted-fg" : "text-foreground"
      }`}
    >
      {notification.title}
    </span>
  );

  return (
    <article
      className={`flex gap-4 rounded-lg border border-border bg-surface-elevated p-4 transition-shadow hover:shadow-[var(--shadow-e2)] ${
        notification.read ? "opacity-90" : ""
      }`}
    >
      <NotificationIcon type={notification.type} />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-start gap-2">
          {!notification.read ? (
            <span
              className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand"
              aria-hidden="true"
            />
          ) : null}
          <div className="min-w-0 flex-1">
            {notification.linkHref ? (
              <Link
                href={notification.linkHref}
                className="hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                {titleContent}
              </Link>
            ) : (
              titleContent
            )}
            <p className="mt-1 text-[13px] leading-relaxed text-muted-fg">
              {notification.description}
            </p>
            <p className="mt-2 text-[13px] text-muted-fg">
              {formatRelativeTime(notification.createdAt)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex shrink-0 flex-col gap-1 sm:flex-row sm:items-center">
        {notification.read ? (
          <Button
            type="button"
            variant="ghost"
            className="h-9 px-2"
            loading={isMarkingUnread}
            onClick={() => onMarkUnread(notification.id)}
            aria-label={NOTIFICATIONS_COPY.markUnread}
          >
            <Mail className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          </Button>
        ) : (
          <Button
            type="button"
            variant="ghost"
            className="h-9 px-2"
            loading={isMarkingRead}
            onClick={() => onMarkRead(notification.id)}
            aria-label={NOTIFICATIONS_COPY.markRead}
          >
            <MailOpen
              className="h-4 w-4"
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </Button>
        )}
        <Button
          type="button"
          variant="ghost"
          className="h-9 px-2 text-danger hover:text-danger"
          onClick={() => onDelete(notification.id)}
          aria-label={NOTIFICATIONS_COPY.delete}
        >
          <Trash2 className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
        </Button>
      </div>
    </article>
  );
}
