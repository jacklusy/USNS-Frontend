import { create } from "zustand";

const BASE_Z_INDEX = 50;

interface OverlayState {
  stack: string[];
  openCount: number;
  register: (id: string) => number;
  unregister: (id: string) => void;
}

export const useOverlayStore = create<OverlayState>((set, get) => ({
  stack: [],
  openCount: 0,
  register: (id) => {
    set((state) => {
      const alreadyInStack = state.stack.includes(id);
      const stack = alreadyInStack ? state.stack : [...state.stack, id];
      const openCount = alreadyInStack ? state.openCount : state.openCount + 1;
      return { stack, openCount };
    });
    const index = get().stack.indexOf(id);
    return BASE_Z_INDEX + Math.max(0, index) * 10;
  },
  unregister: (id) =>
    set((state) => {
      const wasPresent = state.stack.includes(id);
      if (!wasPresent) return state;
      return {
        stack: state.stack.filter((item) => item !== id),
        openCount: Math.max(0, state.openCount - 1),
      };
    }),
}));

export function useOverlayStackId(): string {
  return `overlay_${Math.random().toString(36).slice(2, 9)}`;
}
