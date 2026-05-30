import type { ReactNode } from "react";

type BadgeVariant = "brand" | "neutral" | "danger";

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  brand: "bg-usns-green-light text-brand",
  neutral: "bg-surface-elevated text-muted-fg border border-border",
  danger: "bg-danger/10 text-danger",
};

export function Badge({
  variant = "neutral",
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex min-h-5 items-center justify-center rounded-pill px-2 text-[12px] font-medium leading-none ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
