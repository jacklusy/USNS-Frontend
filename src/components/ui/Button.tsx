import type { ButtonHTMLAttributes, ReactNode } from "react";
import {
  BUTTON_SIZE_CLASSES,
  BUTTON_VARIANT_CLASSES,
  resolveButtonVariant,
  type ButtonSize,
  type ButtonVariantInput,
} from "@/constants/button.constants";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariantInput;
  size?: ButtonSize;
  loading?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  leadingIcon,
  trailingIcon,
  disabled,
  className = "",
  children,
  type = "button",
  ...props
}: ButtonProps) {
  const isDisabled = disabled ?? loading;
  const resolvedVariant = resolveButtonVariant(variant);

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={loading}
      className={`inline-flex min-w-[120px] items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${BUTTON_SIZE_CLASSES[size]} ${BUTTON_VARIANT_CLASSES[resolvedVariant]} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-current/30 border-t-current"
            aria-hidden="true"
          />
          <span className="sr-only">Loading</span>
        </>
      ) : (
        <>
          {leadingIcon ? (
            <span className="inline-flex shrink-0" aria-hidden="true">
              {leadingIcon}
            </span>
          ) : null}
          {children}
          {trailingIcon ? (
            <span className="inline-flex shrink-0" aria-hidden="true">
              {trailingIcon}
            </span>
          ) : null}
        </>
      )}
    </button>
  );
}
