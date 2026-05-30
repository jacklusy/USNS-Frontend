"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

export function useSelectPopover() {
  const [open, setOpen] = useState(false);
  const listboxId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const openPopover = useCallback(() => {
    setOpen(true);
  }, []);

  const closePopover = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        closePopover();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [open, closePopover]);

  return {
    open,
    setOpen,
    listboxId,
    containerRef,
    triggerRef,
    openPopover,
    closePopover,
  };
}
