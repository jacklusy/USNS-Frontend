import { create } from "zustand";
import {
  DEFAULT_TOAST_DURATION_MS,
  MAX_VISIBLE_TOASTS,
} from "@/constants/toast.constants";

export type ToastVariant = "success" | "error" | "warning" | "info";

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastItem {
  id: string;
  variant: ToastVariant;
  title: string;
  description?: string;
  durationMs?: number;
  action?: ToastAction;
}

export type AddToastInput = Omit<ToastItem, "id">;

interface ToastState {
  toasts: ToastItem[];
  queuedToasts: AddToastInput[];
  addToast: (toast: AddToastInput) => string;
  removeToast: (id: string) => void;
}

function generateToastId(): string {
  return `toast_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function promoteQueued(
  visible: ToastItem[],
  queued: AddToastInput[],
): { toasts: ToastItem[]; queuedToasts: AddToastInput[] } {
  if (visible.length >= MAX_VISIBLE_TOASTS || queued.length === 0) {
    return { toasts: visible, queuedToasts: queued };
  }
  const [next, ...rest] = queued;
  const promoted: ToastItem = {
    ...next,
    id: generateToastId(),
    durationMs: next.durationMs ?? DEFAULT_TOAST_DURATION_MS,
  };
  return promoteQueued([...visible, promoted], rest);
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  queuedToasts: [],
  addToast: (toast) => {
    const id = generateToastId();
    const item: ToastItem = {
      ...toast,
      id,
      durationMs: toast.durationMs ?? DEFAULT_TOAST_DURATION_MS,
    };
    set((state) => {
      if (state.toasts.length < MAX_VISIBLE_TOASTS) {
        return { toasts: [...state.toasts, item] };
      }
      return { queuedToasts: [...state.queuedToasts, toast] };
    });
    return id;
  },
  removeToast: (id) =>
    set((state) => {
      const nextVisible = state.toasts.filter((t) => t.id !== id);
      return promoteQueued(nextVisible, state.queuedToasts);
    }),
}));
