"use client";

import Link from "next/link";
import { ArrowLeft, Ban, Inbox, Pencil, UserCheck, UserX } from "lucide-react";
import { useMemo, useState, useCallback } from "react";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { Button } from "@/components/ui/Button";
import { SkeletonCard } from "@/components/ui/loading-skeleton";
import { TabsWithUrl } from "@/components/ui/Tabs";
import { ROUTES } from "@/constants/routes.constants";
import { USERS_COPY } from "@/constants/users.constants";
import { useBreadcrumbOverrides } from "@/hooks/useBreadcrumbOverrides";
import { useToast } from "@/hooks/useToast";
import { usePermissions } from "@/modules/auth/hooks/usePermissions";
import { PERMISSIONS } from "@/types/permission.types";
import { UserStatus } from "@/types/user.types";
import {
  isAppError,
  useChangeUserStatus,
} from "../hooks/useChangeUserStatus";
import { useUserDetail } from "../hooks/useUserDetail";
import type { UserStatusAction } from "../types/user-management.types";
import { statusToastMessage } from "../utils/status-confirm-copy";
import { EditUserDrawer } from "./EditUserDrawer";
import { UserAccountSection } from "./UserAccountSection";
import { UserActivitySection } from "./UserActivitySection";
import { UserPermissionsSection } from "./UserPermissionsSection";
import { UserProfileSection } from "./UserProfileSection";
import { UserStatusChangeDialog } from "./UserStatusChangeDialog";

interface UserDetailPageContentProps {
  userId: string;
}

interface PendingStatus {
  action: UserStatusAction;
}

export function UserDetailPageContent({ userId }: UserDetailPageContentProps) {
  const toast = useToast();
  const { can } = usePermissions();
  const detailQuery = useUserDetail(userId);
  const { changeStatus } = useChangeUserStatus();
  const [editOpen, setEditOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<PendingStatus | null>(
    null,
  );

  const user = detailQuery.data?.data;

  const breadcrumbLabels = useMemo(
    () => (user ? { [userId]: user.fullName } : {}),
    [user, userId],
  );
  useBreadcrumbOverrides(breadcrumbLabels);

  const confirmStatusChange = useCallback(() => {
    if (!pendingStatus || !user) return;
    changeStatus.mutate(
      { id: user.id, action: pendingStatus.action },
      {
        onSuccess: () => {
          toast.success({
            title: statusToastMessage(pendingStatus.action),
          });
          setPendingStatus(null);
        },
        onError: (error) => {
          toast.error({
            title: isAppError(error)
              ? error.message
              : USERS_COPY.toastStatusError,
          });
        },
      },
    );
  }, [changeStatus, pendingStatus, toast, user]);

  if (detailQuery.isLoading) {
    return (
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6">
        <SkeletonCard rows={4} />
        <SkeletonCard rows={3} />
      </div>
    );
  }

  if (detailQuery.isError) {
    return (
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6">
        <Link
          href={ROUTES.USERS}
          className="inline-flex min-h-11 w-fit items-center gap-2 text-[15px] font-medium text-brand transition-colors hover:text-usns-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          {USERS_COPY.backToUsers}
        </Link>
        <ErrorState
          title={USERS_COPY.userLoadErrorTitle}
          description={USERS_COPY.userLoadErrorDescription}
          variant="inPage"
          onRetry={() => {
            void detailQuery.refetch();
          }}
        />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6">
        <Link
          href={ROUTES.USERS}
          className="inline-flex min-h-11 w-fit items-center gap-2 text-[15px] font-medium text-brand transition-colors hover:text-usns-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          {USERS_COPY.backToUsers}
        </Link>
        <EmptyState
          icon={Inbox}
          title={USERS_COPY.detailNotFoundTitle}
          description={USERS_COPY.detailNotFoundDescription}
          variant="inPage"
          action={
            <Link
              href={ROUTES.USERS}
              className="mt-4 inline-flex min-h-11 items-center justify-center rounded-md bg-brand px-4 text-[15px] font-medium text-white transition-colors hover:bg-usns-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              {USERS_COPY.backToUsers}
            </Link>
          }
        />
      </div>
    );
  }

  const canEdit = can(PERMISSIONS.users.edit);
  const showActivate = user.status !== UserStatus.Active;
  const showDeactivate = user.status === UserStatus.Active;
  const showSuspend = user.status === UserStatus.Active;

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6">
      <Link
        href={ROUTES.USERS}
        className="inline-flex min-h-11 w-fit items-center gap-2 text-[15px] font-medium text-brand transition-colors hover:text-usns-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
        {USERS_COPY.backToUsers}
      </Link>

      <UserProfileSection user={user} />

      {canEdit ? (
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="primary"
            leadingIcon={<Pencil className="h-5 w-5" strokeWidth={1.75} />}
            onClick={() => setEditOpen(true)}
          >
            {USERS_COPY.actionEditUser}
          </Button>
          {showActivate ? (
            <Button
              type="button"
              variant="outline"
              leadingIcon={<UserCheck className="h-5 w-5" strokeWidth={1.75} />}
              onClick={() => setPendingStatus({ action: "activate" })}
            >
              {USERS_COPY.actionActivate}
            </Button>
          ) : null}
          {showDeactivate ? (
            <Button
              type="button"
              variant="outline"
              leadingIcon={<UserX className="h-5 w-5" strokeWidth={1.75} />}
              onClick={() => setPendingStatus({ action: "deactivate" })}
            >
              {USERS_COPY.actionDeactivate}
            </Button>
          ) : null}
          {showSuspend ? (
            <Button
              type="button"
              variant="destructive"
              leadingIcon={<Ban className="h-5 w-5" strokeWidth={1.75} />}
              onClick={() => setPendingStatus({ action: "suspend" })}
            >
              {USERS_COPY.actionSuspend}
            </Button>
          ) : null}
        </div>
      ) : null}

      <TabsWithUrl
        urlParam="tab"
        defaultTabId="details"
        items={[
          {
            id: "details",
            label: USERS_COPY.tabDetailsLabel,
            content: (
              <div className="flex flex-col gap-6 pt-2">
                <UserPermissionsSection role={user.role} />
                <UserAccountSection account={user.account} />
              </div>
            ),
          },
          {
            id: "activity",
            label: USERS_COPY.tabActivityLabel,
            content: (
              <div className="pt-2">
                <UserActivitySection userId={user.id} />
              </div>
            ),
          },
        ]}
      />

      <EditUserDrawer
        userId={user.id}
        open={editOpen}
        mode="edit"
        onClose={() => setEditOpen(false)}
      />

      <UserStatusChangeDialog
        open={pendingStatus !== null}
        action={pendingStatus?.action ?? null}
        targetName={user.fullName}
        loading={changeStatus.isPending}
        onClose={() => setPendingStatus(null)}
        onConfirm={confirmStatusChange}
      />
    </div>
  );
}
