import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
  retryLabel = "Try again",
}: ErrorStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-lg border border-border bg-surface-elevated px-6 py-12 text-center"
      role="alert"
    >
      <AlertCircle
        className="h-12 w-12 text-danger"
        strokeWidth={1.75}
        aria-hidden="true"
      />
      <h3 className="mt-4 text-[18px] font-semibold text-foreground">{title}</h3>
      <p className="mt-2 max-w-sm text-[13px] text-muted-fg">{message}</p>
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
