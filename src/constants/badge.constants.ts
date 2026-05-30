export type BadgeVariantInput =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "brand"
  | "neutral"
  | "danger";

export type BadgeVariantResolved =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "info";

export const BADGE_VARIANT_CLASSES: Record<BadgeVariantResolved, string> = {
  default: "bg-surface-elevated text-muted-fg border border-border",
  success: "bg-usns-green-light text-brand",
  warning: "bg-usns-accent-bg text-warn",
  error: "bg-danger/10 text-danger",
  info: "bg-usns-green-light/60 text-accent",
};

export function resolveBadgeVariant(
  variant: BadgeVariantInput,
): BadgeVariantResolved {
  if (variant === "brand") return "success";
  if (variant === "neutral") return "default";
  if (variant === "danger") return "error";
  return variant;
}
