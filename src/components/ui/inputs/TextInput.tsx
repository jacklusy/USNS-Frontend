import { forwardRef, type InputHTMLAttributes } from "react";
import { getInputClassName } from "@/utils/input-classes";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(
    { hasError = false, className = "", disabled, ...props },
    ref,
  ) {
    return (
      <input
        ref={ref}
        type="text"
        disabled={disabled}
        className={getInputClassName(hasError, Boolean(disabled), className)}
        {...props}
      />
    );
  },
);
