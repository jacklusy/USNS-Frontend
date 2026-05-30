import { forwardRef, type InputHTMLAttributes } from "react";
import { getInputClassName } from "@/utils/input-classes";

interface NumberInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  function NumberInput(
    { hasError = false, className = "", disabled, ...props },
    ref,
  ) {
    return (
      <input
        ref={ref}
        type="number"
        disabled={disabled}
        className={getInputClassName(hasError, Boolean(disabled), className)}
        {...props}
      />
    );
  },
);
