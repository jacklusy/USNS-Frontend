import { forwardRef, type InputHTMLAttributes } from "react";
import { getInputClassName } from "@/utils/input-classes";

interface EmailInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  function EmailInput(
    { hasError = false, className = "", disabled, ...props },
    ref,
  ) {
    return (
      <input
        ref={ref}
        type="email"
        disabled={disabled}
        className={getInputClassName(hasError, Boolean(disabled), className)}
        {...props}
      />
    );
  },
);
