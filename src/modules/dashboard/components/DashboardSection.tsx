import { RefreshCw } from "lucide-react";
import type { ReactNode } from "react";

interface DashboardSectionProps {
  title: string;
  description?: string;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  loadingFallback?: ReactNode;
  children: ReactNode;
}

export function DashboardSection({
  title,
  description,
  isLoading = false,
  isError = false,
  errorMessage = "Unable to load this section.",
  onRefresh,
  isRefreshing = false,
  loadingFallback,
  children,
}: DashboardSectionProps) {
  return (
    <section className="flex flex-col gap-4" aria-labelledby={`section-${title.replace(/\s+/g, "-").toLowerCase()}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2
            id={`section-${title.replace(/\s+/g, "-").toLowerCase()}`}
            className="text-[18px] font-semibold leading-[1.3] tracking-[-0.005em] text-foreground md:text-[24px] md:leading-[1.2]"
          >
            {title}
          </h2>
          {description ? (
            <p className="mt-1 text-[13px] text-muted-fg">{description}</p>
          ) : null}
        </div>
        {onRefresh ? (
          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="inline-flex h-11 items-center gap-2 rounded-md border border-border bg-surface px-3 text-[15px] font-medium text-foreground transition-colors hover:bg-usns-green-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label={`Refresh ${title}`}
          >
            <RefreshCw
              className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <span>Refresh</span>
          </button>
        ) : null}
      </div>
      {isError ? (
        <div
          className="rounded-lg border border-border bg-surface-elevated p-6"
          role="alert"
        >
          <p className="text-[15px] text-danger">{errorMessage}</p>
          {onRefresh ? (
            <button
              type="button"
              onClick={onRefresh}
              className="mt-4 inline-flex h-11 items-center justify-center rounded-md bg-brand px-4 text-[15px] font-medium text-white hover:bg-usns-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Try again
            </button>
          ) : null}
        </div>
      ) : null}
      {!isError && isLoading ? (loadingFallback ?? children) : null}
      {!isError && !isLoading ? children : null}
    </section>
  );
}
