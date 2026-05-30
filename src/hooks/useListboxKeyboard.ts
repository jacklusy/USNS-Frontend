"use client";

import { useCallback, useState, type KeyboardEvent } from "react";

interface UseListboxKeyboardOptions {
  optionCount: number;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSelect: (index: number) => void;
  disabled?: boolean;
}

export function useListboxKeyboard({
  optionCount,
  isOpen,
  onOpen,
  onClose,
  onSelect,
  disabled = false,
}: UseListboxKeyboardOptions) {
  const [activeIndex, setActiveIndex] = useState(-1);

  const resetActiveIndex = useCallback(() => {
    setActiveIndex(-1);
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (disabled) {
        return;
      }

      if (!isOpen) {
        if (
          event.key === "ArrowDown" ||
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();
          onOpen();
          setActiveIndex(optionCount > 0 ? 0 : -1);
        }
        return;
      }

      switch (event.key) {
        case "ArrowDown": {
          event.preventDefault();
          if (optionCount === 0) return;
          setActiveIndex((prev) => {
            const next = prev + 1;
            return next >= optionCount ? 0 : next;
          });
          break;
        }
        case "ArrowUp": {
          event.preventDefault();
          if (optionCount === 0) return;
          setActiveIndex((prev) => {
            if (prev <= 0) return optionCount - 1;
            return prev - 1;
          });
          break;
        }
        case "Home": {
          event.preventDefault();
          setActiveIndex(optionCount > 0 ? 0 : -1);
          break;
        }
        case "End": {
          event.preventDefault();
          setActiveIndex(optionCount > 0 ? optionCount - 1 : -1);
          break;
        }
        case "Enter": {
          event.preventDefault();
          if (activeIndex >= 0 && activeIndex < optionCount) {
            onSelect(activeIndex);
          }
          break;
        }
        case "Escape": {
          event.preventDefault();
          onClose();
          resetActiveIndex();
          break;
        }
        case "Tab": {
          onClose();
          resetActiveIndex();
          break;
        }
        default:
          break;
      }
    },
    [
      activeIndex,
      disabled,
      isOpen,
      onClose,
      onOpen,
      onSelect,
      optionCount,
      resetActiveIndex,
    ],
  );

  return {
    activeIndex,
    setActiveIndex,
    resetActiveIndex,
    handleKeyDown,
  };
}
