import { AlertCircle } from "lucide-react";
import type { ReactNode } from "react";

interface FormFieldProps {
  name: string;
  label: string;
  required?: boolean;
  helpText?: string;
  helperText?: string;
  error?: string;
  children: ReactNode;
  id?: string;
}

export function FormField({
  name,
  label,
  required = false,
  helpText,
  helperText,
  error,
  children,
  id,
}: FormFieldProps) {
  const fieldId = id ?? name;
  const resolvedHelp = helpText ?? helperText;
  const errorId = error ? `${fieldId}-error` : undefined;
  const helperId = resolvedHelp ? `${fieldId}-helper` : undefined;
  const describedBy =
    [errorId, helperId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={fieldId}
        className="text-[13px] font-medium text-foreground"
      >
        {label}
        {required ? (
          <span className="text-danger" aria-hidden="true">
            {" "}
            *
          </span>
        ) : null}
      </label>
      <div aria-describedby={describedBy}>{children}</div>
      {resolvedHelp && !error ? (
        <p id={helperId} className="text-[13px] text-muted-fg">
          {resolvedHelp}
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
