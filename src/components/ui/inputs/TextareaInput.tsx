import { forwardRef, type TextareaHTMLAttributes } from "react";
import { getTextareaClassName } from "@/utils/input-classes";

interface TextareaInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const TextareaInput = forwardRef<HTMLTextAreaElement, TextareaInputProps>(
  function TextareaInput(
    { hasError = false, className = "", disabled, ...props },
    ref,
  ) {
    return (
      <textarea
        ref={ref}
        disabled={disabled}
        className={getTextareaClassName(hasError, Boolean(disabled), className)}
        {...props}
      />
    );
  },
);
