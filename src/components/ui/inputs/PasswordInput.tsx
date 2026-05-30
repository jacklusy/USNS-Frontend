"use client";

import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { getInputClassName } from "@/utils/input-classes";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(
    { hasError = false, className = "", disabled, id, ...props },
    ref,
  ) {
    const [visible, setVisible] = useState(false);

    return (
      <div className="relative">
        <input
          ref={ref}
          id={id}
          type={visible ? "text" : "password"}
          disabled={disabled}
          className={`${getInputClassName(hasError, Boolean(disabled), className)} pr-12`}
          {...props}
        />
        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            setVisible((prev) => !prev);
          }}
          className="absolute right-0 top-0 inline-flex h-11 w-11 items-center justify-center rounded-md text-muted-fg transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
        >
          {visible ? (
            <EyeOff className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          ) : (
            <Eye className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          )}
        </button>
      </div>
    );
  },
);
