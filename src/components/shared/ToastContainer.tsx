"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useToastStore, type ToastItem, type ToastVariant } from "@/store/toast.slice";

const AUTO_DISMISS_MS = 4000;

const variantStyles: Record<ToastVariant, { border: string }> = {
  success: { border: "border-l-brand" },
  error: { border: "border-l-danger" },
  warning: { border: "border-l-warn" },
  info: { border: "border-l-accent" },
};

function ToastCard({ toast }: { toast: ToastItem }) {
  const removeToast = useToastStore((s) => s.removeToast);
  const styles = variantStyles[toast.variant];

  useEffect(() => {
    const timer = setTimeout(() => removeToast(toast.id), AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [toast.id, removeToast]);

  return (
    <div
      role="status"
      className={`flex w-full max-w-sm flex-col gap-1 rounded-lg border border-border border-l-4 bg-surface-elevated p-4 shadow-[0_4px_12px_rgba(15,31,24,0.06)] ${styles.border}`}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-[15px] font-medium text-foreground">{toast.title}</p>
        <button
          type="button"
          onClick={() => removeToast(toast.id)}
          className="shrink-0 rounded-md px-2 py-1 text-[13px] text-muted-fg transition-colors hover:bg-usns-green-light hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          aria-label="Dismiss notification"
        >
          Close
        </button>
      </div>
      {toast.description ? (
        <p className="text-[13px] leading-[1.5] text-muted-fg">
          {toast.description}
        </p>
      ) : null}
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
      className="pointer-events-none fixed inset-x-4 top-4 z-[100] flex flex-col items-center gap-3 md:inset-x-auto md:right-4 md:bottom-4 md:top-auto md:items-end"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto w-full max-w-sm">
          <ToastCard toast={toast} />
        </div>
      ))}
    </div>,
    document.body,
  );
}
