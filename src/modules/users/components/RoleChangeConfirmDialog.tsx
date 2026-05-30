"use client";

import { ConfirmationDialog } from "@/components/ui/ConfirmationDialog";
import { USERS_COPY } from "@/constants/users.constants";

interface RoleChangeConfirmDialogProps {
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function RoleChangeConfirmDialog({
  open,
  loading = false,
  onClose,
  onConfirm,
}: RoleChangeConfirmDialogProps) {
  return (
    <ConfirmationDialog
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title={USERS_COPY.roleChangeTitle}
      description={USERS_COPY.roleChangeDescription}
      confirmLabel={USERS_COPY.roleChangeConfirmLabel}
      cancelLabel={USERS_COPY.cancelLabel}
      loading={loading}
    />
  );
}
