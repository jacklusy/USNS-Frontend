import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ERROR_STATE_COPY } from "@/constants/error-state.constants";
import type { StateDisplayVariant } from "@/types/state-display.types";

interface ErrorStateProps {
  title: string;
  description: string;
  variant?: StateDisplayVariant;
  errorCode?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

const VARIANT_CLASSES: Record<StateDisplayVariant, string> = {
  inPage:
    "rounded-lg border border-danger/30 bg-surface-elevated px-6 py-12 text-center",
  fullPage:
    "min-h-[50vh] rounded-lg border border-danger/30 bg-surface-elevated px-6 py-16 text-center",
};

export function ErrorState({
  title,
  description,
  variant = "inPage",
  errorCode,
  onRetry,
  retryLabel = ERROR_STATE_COPY.retryLabel,
}: ErrorStateProps) {
  return (
    <div className={VARIANT_CLASSES[variant]} role="alert">
      <AlertCircle
        className="mx-auto h-12 w-12 text-danger"
        strokeWidth={1.75}
        aria-hidden="true"
      />
      <h3 className="mt-4 text-[18px] font-semibold text-foreground">{title}</h3>
      <p className="mt-2 max-w-sm text-[13px] text-muted-fg mx-auto">
        {description}
      </p>
      {errorCode ? (
        <p className="mt-2 font-mono text-[13px] text-muted-fg">{errorCode}</p>
      ) : null}
      {onRetry ? (
        <div className="mt-6">
          <Button type="button" variant="brand" onClick={onRetry}>
            {retryLabel}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
