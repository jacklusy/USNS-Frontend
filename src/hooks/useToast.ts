import {
  useToastStore,
  type ToastVariant,
} from "@/store/toast.slice";

export interface ToastInput {
  title: string;
  description?: string;
  durationMs?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

function push(variant: ToastVariant, input: ToastInput): string {
  return useToastStore.getState().addToast({
    variant,
    title: input.title,
    description: input.description,
    durationMs: input.durationMs,
    action: input.action,
  });
}

export function useToast() {
  return {
    success: (input: ToastInput) => push("success", input),
    error: (input: ToastInput) => push("error", input),
    warning: (input: ToastInput) => push("warning", input),
    info: (input: ToastInput) => push("info", input),
  };
}

export function showQueryErrorToast(message: string): void {
  push("error", { title: message });
}
