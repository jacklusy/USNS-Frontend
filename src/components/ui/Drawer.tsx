"use client";

import { X } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  DRAWER_WIDTH_CLASSES,
  type DrawerWidth,
} from "@/constants/overlay.constants";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useOverlayStore, useOverlayStackId } from "@/store/overlay.slice";
import { OverlayBackdrop } from "./overlay/OverlayBackdrop";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  width?: DrawerWidth;
  closeOnEscape?: boolean;
  closeOnBackdrop?: boolean;
}

export function Drawer({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  width = "md",
  closeOnEscape = true,
  closeOnBackdrop = true,
}: DrawerProps) {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const stackIdRef = useRef(useOverlayStackId());
  const register = useOverlayStore((s) => s.register);
  const unregister = useOverlayStore((s) => s.unregister);
  const [zIndex, setZIndex] = useState(50);

  useScrollLock(open);
  useFocusTrap(open, panelRef);

  useEffect(() => {
    if (!open) return;
    const stackId = stackIdRef.current;
    const z = register(stackId);
    setZIndex(z);
    return () => {
      unregister(stackId);
    };
  }, [open, register, unregister]);

  useEffect(() => {
    if (!open || !closeOnEscape) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, closeOnEscape, onClose]);

  if (!open || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <>
      <OverlayBackdrop
        zIndex={zIndex}
        onClick={closeOnBackdrop ? onClose : undefined}
      />
      <div
        className="fixed inset-y-0 right-0 flex motion-reduce:transition-none"
        style={{ zIndex: zIndex + 1 }}
      >
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={description ? descriptionId : undefined}
          tabIndex={-1}
          className={`flex h-full flex-col border-l border-border bg-surface-elevated shadow-[var(--shadow-e3)] transition-transform duration-[240ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none ${DRAWER_WIDTH_CLASSES[width]}`}
        >
          <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
            <div className="min-w-0">
              <h2
                id={titleId}
                className="text-[18px] font-semibold text-foreground md:text-[24px]"
              >
                {title}
              </h2>
              {description ? (
                <p
                  id={descriptionId}
                  className="mt-1 text-[13px] text-muted-fg"
                >
                  {description}
                </p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-muted-fg transition-colors hover:bg-usns-green-light hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              aria-label="Close drawer"
            >
              <X className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
          {footer ? (
            <div className="border-t border-border px-5 py-4">{footer}</div>
          ) : null}
        </div>
      </div>
    </>,
    document.body,
  );
}
