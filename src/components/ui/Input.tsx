import { forwardRef, type InputHTMLAttributes } from "react";
import { getInputClassName } from "@/utils/input-classes";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { hasError = false, className = "", disabled, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      disabled={disabled}
      className={getInputClassName(hasError, Boolean(disabled), className)}
      {...props}
    />
  );
});
