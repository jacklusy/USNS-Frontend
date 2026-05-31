"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { ERROR_BOUNDARY_COPY } from "@/constants/error-boundary.constants";
import { logClientError, reportClientError } from "@/lib/error-logger";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    logClientError(error, { boundary: "global-error" });
    reportClientError(error, { boundary: "global-error" });
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-surface px-4 text-center font-sans text-foreground">
        <AlertCircle
          className="h-12 w-12 text-danger"
          strokeWidth={1.75}
          aria-hidden="true"
        />
        <h1 className="mt-4 text-[24px] font-semibold">
          {ERROR_BOUNDARY_COPY.title}
        </h1>
        <p className="mt-3 max-w-md text-[15px] text-muted-fg">
          {ERROR_BOUNDARY_COPY.description}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            className="rounded-md bg-brand px-4 py-2 text-[15px] font-medium text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            onClick={() => reset()}
          >
            {ERROR_BOUNDARY_COPY.tryAgainLabel}
          </button>
          <button
            type="button"
            className="rounded-md border border-brand px-4 py-2 text-[15px] font-medium text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            onClick={() => window.location.reload()}
          >
            {ERROR_BOUNDARY_COPY.reloadLabel}
          </button>
        </div>
      </body>
    </html>
  );
}
