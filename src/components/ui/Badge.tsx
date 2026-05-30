import type { ReactNode } from "react";
import {
  BADGE_VARIANT_CLASSES,
  resolveBadgeVariant,
  type BadgeVariantInput,
} from "@/constants/badge.constants";

interface BadgeProps {
  variant?: BadgeVariantInput;
  children: ReactNode;
  className?: string;
}

export function Badge({
  variant = "default",
  children,
  className = "",
}: BadgeProps) {
  const resolved = resolveBadgeVariant(variant);

  return (
    <span
      className={`inline-flex min-h-5 items-center justify-center rounded-pill px-2 text-[12px] font-medium leading-none ${BADGE_VARIANT_CLASSES[resolved]} ${className}`}
    >
      {children}
    </span>
  );
}
