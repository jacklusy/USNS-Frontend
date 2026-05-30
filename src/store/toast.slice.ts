import { create } from "zustand";

export type ToastVariant = "success" | "error" | "warning" | "info";

export interface ToastItem {
  id: string;
  variant: ToastVariant;
  title: string;
  description?: string;
}

interface ToastState {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, "id">) => string;
  removeToast: (id: string) => void;
}

const MAX_VISIBLE_TOASTS = 3;

function generateToastId(): string {
  return `toast_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = generateToastId();
    set((state) => {
      const next = [...state.toasts, { ...toast, id }];
      if (next.length > MAX_VISIBLE_TOASTS) {
        return { toasts: next.slice(next.length - MAX_VISIBLE_TOASTS) };
      }
      return { toasts: next };
    });
    return id;
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
