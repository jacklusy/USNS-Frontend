"use client";

import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/Button";
import { DEFAULT_TOAST_DURATION_MS, TOAST_COPY } from "@/constants/toast.constants";
import {
  useToastStore,
  type ToastItem,
  type ToastVariant,
} from "@/store/toast.slice";

const variantConfig: Record<
  ToastVariant,
  { border: string; icon: LucideIcon; iconClass: string }
> = {
  success: {
    border: "border-l-brand",
    icon: CheckCircle,
    iconClass: "text-success",
  },
  error: {
    border: "border-l-danger",
    icon: AlertCircle,
    iconClass: "text-danger",
  },
  warning: {
    border: "border-l-warn",
    icon: AlertTriangle,
    iconClass: "text-warn",
  },
  info: {
    border: "border-l-accent",
    icon: Info,
    iconClass: "text-accent",
  },
};

function ToastCard({ toast }: { toast: ToastItem }) {
  const removeToast = useToastStore((s) => s.removeToast);
  const config = variantConfig[toast.variant];
  const Icon = config.icon;
  const duration = toast.durationMs ?? DEFAULT_TOAST_DURATION_MS;
  const liveMode = toast.variant === "error" ? "assertive" : "polite";

  useEffect(() => {
    const timer = setTimeout(() => removeToast(toast.id), duration);
    return () => clearTimeout(timer);
  }, [toast.id, duration, removeToast]);

  return (
    <div
      role="status"
      aria-live={liveMode}
      className={`flex w-full max-w-sm flex-col gap-2 rounded-lg border border-border border-l-4 bg-surface-elevated p-4 shadow-[0_4px_12px_rgba(15,31,24,0.06)] ${config.border}`}
    >
      <div className="flex items-start gap-3">
        <Icon
          className={`mt-0.5 h-5 w-5 shrink-0 ${config.iconClass}`}
          strokeWidth={1.75}
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="text-[15px] font-medium text-foreground">{toast.title}</p>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-fg transition-colors hover:bg-usns-green-light hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              aria-label={TOAST_COPY.dismissLabel}
            >
              <X className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>
          {toast.description ? (
            <p className="mt-1 text-[13px] leading-[1.5] text-muted-fg">
              {toast.description}
            </p>
          ) : null}
          {toast.action ? (
            <div className="mt-3">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="min-w-0 px-2"
                onClick={() => {
                  toast.action?.onClick();
                  removeToast(toast.id);
                }}
              >
                {toast.action.label}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  const mounted = typeof document !== "undefined";

  if (!mounted || toasts.length === 0) {
    return null;
  }

  return createPortal(
    <div
      aria-live="polite"
      aria-atomic="false"
      className="pointer-events-none fixed top-4 right-4 z-[100] flex w-full max-w-sm flex-col items-end gap-3 px-4 md:px-0"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto w-full">
          <ToastCard toast={toast} />
        </div>
      ))}
    </div>,
    document.body,
  );
}
