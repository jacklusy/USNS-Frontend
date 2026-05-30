"use client";

import { ConfirmationDialog } from "@/components/ui/ConfirmationDialog";
import { USERS_COPY } from "@/constants/users.constants";
import type {
  BulkUserStatusAction,
  UserStatusAction,
} from "../types/user-management.types";
import {
  bulkStatusConfirmDescription,
  bulkStatusConfirmTitle,
  isStatusActionDestructive,
  statusConfirmDescription,
  statusConfirmTitle,
} from "../utils/status-confirm-copy";

interface UserStatusChangeDialogProps {
  open: boolean;
  action: UserStatusAction | BulkUserStatusAction | null;
  targetName?: string;
  bulkCount?: number;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function UserStatusChangeDialog({
  open,
  action,
  targetName,
  bulkCount,
  loading = false,
  onClose,
  onConfirm,
}: UserStatusChangeDialogProps) {
  if (!action) {
    return null;
  }

  const isBulk = bulkCount !== undefined && bulkCount > 0;
  const title = isBulk
    ? bulkStatusConfirmTitle(action)
    : statusConfirmTitle(action);
  const description = isBulk
    ? bulkStatusConfirmDescription(action, bulkCount)
    : statusConfirmDescription(action, targetName ?? "this user");

  return (
    <ConfirmationDialog
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title={title}
      description={description}
      confirmLabel={USERS_COPY.statusConfirmLabel}
      cancelLabel={USERS_COPY.cancelLabel}
      destructive={isStatusActionDestructive(action)}
      loading={loading}
    />
  );
}
