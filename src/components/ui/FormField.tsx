import { AlertCircle } from "lucide-react";
import type { ReactNode } from "react";

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  children: ReactNode;
}

export function FormField({
  id,
  label,
  required = false,
  helperText,
  error,
  children,
}: FormFieldProps) {
  const errorId = error ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  const describedBy =
    [errorId, helperId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[13px] font-medium text-foreground">
        {label}
        {required ? (
          <span className="text-danger" aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
      </label>
      <div aria-describedby={describedBy}>{children}</div>
      {helperText && !error ? (
        <p id={helperId} className="text-[13px] text-muted-fg">
          {helperText}
        </p>
      ) : null}
      {error ? (
        <p
          id={errorId}
          role="alert"
          className="flex items-center gap-1.5 text-[13px] text-danger"
        >
          <AlertCircle
            className="h-4 w-4 shrink-0"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          {error}
        </p>
      ) : null}
    </div>
  );
}
