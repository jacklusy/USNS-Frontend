"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { DEV_ERRORS_COPY } from "@/constants/http-error.constants";
import { redirectToHttpError } from "@/lib/http-error-router";
import type { AppErrorCode } from "@/types/error.types";

const ERROR_TRIGGER_CODES = [
  "BAD_REQUEST",
  "FORBIDDEN",
  "CONFLICT",
  "VALIDATION_ERROR",
  "RATE_LIMITED",
  "SERVER_ERROR",
  "SERVICE_UNAVAILABLE",
] as const satisfies readonly AppErrorCode[];

const ERROR_TRIGGER_LABELS: Record<
  (typeof ERROR_TRIGGER_CODES)[number],
  string
> = {
  BAD_REQUEST: "400 Bad Request",
  FORBIDDEN: "403 Forbidden",
  CONFLICT: "409 Conflict",
  VALIDATION_ERROR: "422 Validation",
  RATE_LIMITED: "429 Rate limit",
  SERVER_ERROR: "500 Server error",
  SERVICE_UNAVAILABLE: "502/503 Unavailable",
};

function BoundaryCrashTrigger(): never {
  throw new Error("Dev error boundary test");
}

export default function DevErrorsPage() {
  const [crashBoundary, setCrashBoundary] = useState(false);

  if (crashBoundary) {
    return <BoundaryCrashTrigger />;
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-[24px] font-semibold text-foreground md:text-[32px]">
          {DEV_ERRORS_COPY.title}
        </h1>
        <p className="mt-2 text-[15px] text-muted-fg">
          {DEV_ERRORS_COPY.description}
        </p>
      </div>
      <Button
        type="button"
        variant="brand"
        className="w-full justify-start"
        onClick={() => setCrashBoundary(true)}
      >
        Trigger error boundary (ERR-01)
      </Button>
      <ul className="flex flex-col gap-3">
        {ERROR_TRIGGER_CODES.map((code) => (
          <li key={code}>
            <Button
              type="button"
              variant="secondary"
              className="w-full justify-start"
              onClick={() =>
                redirectToHttpError(
                  code,
                  code === "RATE_LIMITED" ? { retryAfterSeconds: 15 } : undefined,
                )
              }
            >
              {ERROR_TRIGGER_LABELS[code]}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
