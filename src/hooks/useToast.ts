import { useToastStore, type ToastVariant } from "@/store/toast.slice";

interface ToastInput {
  title: string;
  description?: string;
}

function push(variant: ToastVariant, input: ToastInput): void {
  useToastStore.getState().addToast({
    variant,
    title: input.title,
    description: input.description,
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
