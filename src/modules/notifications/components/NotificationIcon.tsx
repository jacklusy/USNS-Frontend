"use client";

import {
  BookOpen,
  Calendar,
  FileText,
  GraduationCap,
  ShieldAlert,
  UserCheck,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import {
  NOTIFICATION_TYPE_ICON_MAP,
  type NotificationIconKey,
} from "@/constants/notifications-icons.constants";
import type { NotificationType } from "../types/notification.types";

const ICON_MAP: Record<NotificationIconKey, LucideIcon> = {
  userCheck: UserCheck,
  wrench: Wrench,
  fileText: FileText,
  graduationCap: GraduationCap,
  shieldAlert: ShieldAlert,
  calendar: Calendar,
  bookOpen: BookOpen,
  users: Users,
};

interface NotificationIconProps {
  type: NotificationType;
  className?: string;
}

export function NotificationIcon({ type, className = "" }: NotificationIconProps) {
  const key = NOTIFICATION_TYPE_ICON_MAP[type];
  const Icon = ICON_MAP[key];
  return (
    <span
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-usns-green-light text-brand ${className}`}
      aria-hidden="true"
    >
      <Icon className="h-5 w-5" strokeWidth={1.75} />
    </span>
  );
}
