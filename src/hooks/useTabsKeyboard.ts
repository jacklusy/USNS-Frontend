"use client";

import { useCallback, type KeyboardEvent, type RefObject } from "react";

interface UseTabsKeyboardOptions {
  tabIds: readonly string[];
  disabledIds: ReadonlySet<string>;
  value: string;
  onChange: (id: string) => void;
  tabRefs: RefObject<(HTMLButtonElement | null)[]>;
}

export function useTabsKeyboard({
  tabIds,
  disabledIds,
  value,
  onChange,
  tabRefs,
}: UseTabsKeyboardOptions) {
  const enabledIds = tabIds.filter((id) => !disabledIds.has(id));

  const focusTab = useCallback(
    (id: string) => {
      const index = tabIds.indexOf(id);
      if (index >= 0) {
        tabRefs.current[index]?.focus();
      }
    },
    [tabIds, tabRefs],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const currentIndex = enabledIds.indexOf(value);
      if (currentIndex < 0) return;

      let nextIndex: number | null = null;

      if (event.key === "ArrowRight") {
        nextIndex = (currentIndex + 1) % enabledIds.length;
      } else if (event.key === "ArrowLeft") {
        nextIndex =
          (currentIndex - 1 + enabledIds.length) % enabledIds.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = enabledIds.length - 1;
      }

      if (nextIndex === null) return;

      event.preventDefault();
      const nextId = enabledIds[nextIndex];
      onChange(nextId);
      focusTab(nextId);
    },
    [enabledIds, focusTab, onChange, value],
  );

  return { handleKeyDown };
}
