"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  HTTP_ERROR_AUTO_RETRY,
  HTTP_ERROR_RATE_LIMIT_DEFAULT_SECONDS,
  type HttpErrorActionKind,
  type HttpErrorPageConfig,
} from "@/constants/http-error.constants";

interface HttpErrorScreenProps {
  config: HttpErrorPageConfig;
  retryAfterSeconds?: number;
  onGoBack: () => void;
  onGoDashboard: () => void;
  onRetry: () => void;
}

function RateLimitCountdown({
  seconds,
  onComplete,
}: {
  seconds: number;
  onComplete: () => void;
}) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    setRemaining(seconds);
  }, [seconds]);

  useEffect(() => {
    if (remaining <= 0) {
      onComplete();
      return;
    }
    const timer = window.setTimeout(() => {
      setRemaining((value) => value - 1);
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [remaining, onComplete]);

  return (
    <p
      className="mt-4 text-[13px] text-muted-fg"
      role="status"
      aria-live="polite"
    >
      You can try again in {remaining} second{remaining === 1 ? "" : "s"}.
    </p>
  );
}

function ServiceUnavailableAutoRetry({ onRetry }: { onRetry: () => void }) {
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (attempt >= HTTP_ERROR_AUTO_RETRY.maxAttempts) {
      return;
    }
    const timer = window.setTimeout(() => {
      setAttempt((value) => value + 1);
      onRetry();
    }, HTTP_ERROR_AUTO_RETRY.intervalMs);
    return () => window.clearTimeout(timer);
  }, [attempt, onRetry]);

  if (attempt >= HTTP_ERROR_AUTO_RETRY.maxAttempts) {
    return null;
  }

  return (
    <p className="mt-4 text-[13px] text-muted-fg" role="status" aria-live="polite">
      Retrying automatically ({attempt + 1} of {HTTP_ERROR_AUTO_RETRY.maxAttempts})…
    </p>
  );
}

function runAction(
  action: HttpErrorActionKind,
  handlers: {
    onGoBack: () => void;
    onGoDashboard: () => void;
    onRetry: () => void;
  },
): void {
  if (action === "goBack") {
    handlers.onGoBack();
    return;
  }
  if (action === "goDashboard") {
    handlers.onGoDashboard();
    return;
  }
  handlers.onRetry();
}

export function HttpErrorScreen({
  config,
  retryAfterSeconds: retryAfterProp,
  onGoBack,
  onGoDashboard,
  onRetry,
}: HttpErrorScreenProps) {
  const Icon = config.icon;
  const retryAfterSeconds =
    retryAfterProp ?? HTTP_ERROR_RATE_LIMIT_DEFAULT_SECONDS;
  const [countdownDone, setCountdownDone] = useState(
    config.primaryAction !== "rateLimitCountdown",
  );

  const handlers = { onGoBack, onGoDashboard, onRetry };
  const showRateLimitCountdown =
    config.primaryAction === "rateLimitCountdown" && !countdownDone;
  const primaryDisabled =
    config.primaryAction === "rateLimitCountdown" && !countdownDone;

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <div
        className="flex h-14 w-14 items-center justify-center rounded-full bg-usns-green-light"
        aria-hidden="true"
      >
        <Icon className="h-7 w-7 text-brand" strokeWidth={1.75} />
      </div>
      <h1 className="mt-6 text-[24px] font-semibold leading-[1.2] tracking-[-0.01em] text-foreground md:text-[32px]">
        {config.title}
      </h1>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted-fg">
        {config.description}
      </p>
      {showRateLimitCountdown ? (
        <RateLimitCountdown
          seconds={retryAfterSeconds}
          onComplete={() => setCountdownDone(true)}
        />
      ) : null}
      {config.pageKey === "unavailable" ? (
        <ServiceUnavailableAutoRetry onRetry={onRetry} />
      ) : null}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button
          type="button"
          variant="brand"
          disabled={primaryDisabled}
          onClick={() => runAction(config.primaryAction, handlers)}
        >
          {config.primaryLabel}
        </Button>
        {config.secondaryLabel && config.secondaryAction ? (
          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              runAction(config.secondaryAction ?? "goDashboard", handlers)
            }
          >
            {config.secondaryLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
