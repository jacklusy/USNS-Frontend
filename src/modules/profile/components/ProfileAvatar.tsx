"use client";

import { getUserInitials } from "@/utils/user-initials";

interface ProfileAvatarProps {
  name: string;
  avatarUrl: string | null;
  size?: "lg" | "md";
}

const SIZE_CLASSES = {
  lg: "h-20 w-20 text-[24px]",
  md: "h-12 w-12 text-[15px]",
} as const;

export function ProfileAvatar({
  name,
  avatarUrl,
  size = "lg",
}: ProfileAvatarProps) {
  const sizeClass = SIZE_CLASSES[size];

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        className={`${sizeClass} shrink-0 rounded-full object-cover`}
      />
    );
  }

  return (
    <span
      className={`inline-flex ${sizeClass} shrink-0 items-center justify-center rounded-full bg-brand font-semibold text-white`}
      aria-hidden="true"
    >
      {getUserInitials(name)}
    </span>
  );
}
