"use client";

import { useEffect } from "react";
import { useOverlayStore } from "@/store/overlay.slice";

export function useScrollLock(active: boolean): void {
  const openCount = useOverlayStore((s) => s.openCount);

  useEffect(() => {
    if (openCount > 0) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [openCount]);

  useEffect(() => {
    if (!active) return;
    return () => {
      if (useOverlayStore.getState().openCount === 0) {
        document.body.style.overflow = "";
      }
    };
  }, [active]);
}
