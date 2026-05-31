"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ErrorState } from "@/components/shared/ErrorState";
import { ROLE_DISPLAY_LABELS } from "@/constants/roles.constants";
import { formatDateValue } from "@/utils/date/calendar";
import { useUiStore } from "@/store/ui.slice";
import { PROFILE_COPY } from "../constants/profile-management.constants";
import { useProfile } from "../hooks/useProfile";
import { AvatarUploadDialog } from "./AvatarUploadDialog";
import { ProfileAvatar } from "./ProfileAvatar";
import { ProfileEditForm } from "./ProfileEditForm";

export function ProfileOverviewSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const dateFormat = useUiStore((s) => s.dateFormat);
  const language = useUiStore((s) => s.language);
  const query = useProfile();

  if (query.isLoading) {
    return <div className="h-64 animate-pulse rounded-lg bg-border" />;
  }

  if (query.isError || !query.data?.data) {
    return (
      <ErrorState
        title={PROFILE_COPY.loadErrorTitle}
        description={PROFILE_COPY.loadErrorDescription}
        onRetry={() => void query.refetch()}
      />
    );
  }

  const profile = query.data.data;
  const joinDateLabel = formatDateValue(
    new Date(profile.joinDate),
    dateFormat,
    language,
  );

  return (
    <>
      <section
        aria-labelledby="profile-overview-heading"
        className="rounded-lg border border-border bg-surface-elevated p-6"
      >
        <h2 id="profile-overview-heading" className="sr-only">
          {PROFILE_COPY.sectionProfile}
        </h2>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="flex flex-col items-center gap-3 sm:items-start">
              <ProfileAvatar
                name={profile.displayName}
                avatarUrl={profile.avatarUrl}
              />
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setAvatarOpen(true)}
              >
                {PROFILE_COPY.changeAvatar}
              </Button>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[24px] font-semibold leading-[1.2] text-foreground md:text-[32px]">
                {profile.displayName}
              </h3>
              <p className="mt-2 text-[15px] text-muted-fg">{profile.email}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="brand">{ROLE_DISPLAY_LABELS[profile.role]}</Badge>
              </div>
              <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                <div>
                  <dt className="text-[12px] font-medium uppercase tracking-[0.04em] text-muted-fg">
                    {PROFILE_COPY.fieldFullName}
                  </dt>
                  <dd className="mt-1 text-[15px] text-foreground">
                    {profile.fullName}
                  </dd>
                </div>
                <div>
                  <dt className="text-[12px] font-medium uppercase tracking-[0.04em] text-muted-fg">
                    {PROFILE_COPY.fieldDepartment}
                  </dt>
                  <dd className="mt-1 text-[15px] text-foreground">
                    {profile.departmentName}
                  </dd>
                </div>
                <div>
                  <dt className="text-[12px] font-medium uppercase tracking-[0.04em] text-muted-fg">
                    {PROFILE_COPY.fieldJoinDate}
                  </dt>
                  <dd className="mt-1 text-[15px] text-foreground">{joinDateLabel}</dd>
                </div>
                {!isEditing ? (
                  <div>
                    <dt className="text-[12px] font-medium uppercase tracking-[0.04em] text-muted-fg">
                      {PROFILE_COPY.fieldPhone}
                    </dt>
                    <dd className="mt-1 text-[15px] text-foreground">
                      {profile.phone || "—"}
                    </dd>
                  </div>
                ) : null}
              </dl>
              {!isEditing && profile.bio ? (
                <div className="mt-4">
                  <p className="text-[12px] font-medium uppercase tracking-[0.04em] text-muted-fg">
                    {PROFILE_COPY.fieldBio}
                  </p>
                  <p className="mt-1 text-[15px] leading-relaxed text-foreground">
                    {profile.bio}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
          {!isEditing ? (
            <Button
              type="button"
              variant="primary"
              onClick={() => setIsEditing(true)}
            >
              {PROFILE_COPY.editProfile}
            </Button>
          ) : null}
        </div>
        {isEditing ? (
          <div className="mt-8 border-t border-border pt-6">
            <ProfileEditForm
              profile={profile}
              onCancel={() => setIsEditing(false)}
              onSaved={() => setIsEditing(false)}
            />
          </div>
        ) : null}
      </section>
      <AvatarUploadDialog open={avatarOpen} onClose={() => setAvatarOpen(false)} />
    </>
  );
}
