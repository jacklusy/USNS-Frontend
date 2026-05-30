import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ hasError = false, className = "", ...props }, ref) {
    return (
      <input
        ref={ref}
        className={`h-11 w-full rounded-md border bg-surface px-3 text-[16px] text-foreground transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 md:text-[15px] ${
          hasError ? "border-danger" : "border-border"
        } ${className}`}
        {...props}
      />
    );
  },
);
