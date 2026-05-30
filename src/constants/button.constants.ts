export type ButtonVariantInput =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "brand";

export type ButtonVariantResolved =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive";

export type ButtonSize = "sm" | "md" | "lg";

export const BUTTON_SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-9 min-h-9 px-3 text-[13px]",
  md: "h-11 min-h-11 px-5 text-[15px]",
  lg: "h-[52px] min-h-[52px] px-6 text-[15px]",
};

export const BUTTON_VARIANT_CLASSES: Record<ButtonVariantResolved, string> = {
  primary:
    "bg-brand text-white hover:bg-usns-green-dark focus-visible:ring-accent",
  secondary:
    "border border-brand bg-surface text-brand hover:bg-usns-green-light focus-visible:ring-accent",
  outline:
    "border border-border bg-transparent text-foreground hover:bg-usns-green-light focus-visible:ring-accent",
  ghost:
    "bg-transparent text-foreground hover:border hover:border-border focus-visible:ring-accent",
  destructive:
    "bg-danger text-white hover:bg-danger/90 focus-visible:ring-danger",
};

export function resolveButtonVariant(
  variant: ButtonVariantInput,
): ButtonVariantResolved {
  if (variant === "brand") {
    return "primary";
  }
  return variant;
}
