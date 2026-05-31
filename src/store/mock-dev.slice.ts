import { create } from "zustand";
import type { AppErrorCode } from "@/types/error.types";

interface MockDevState {
  simulatedErrorCode: AppErrorCode | null;
  delayOverrideMs: number | null;
  setSimulatedErrorCode: (code: AppErrorCode | null) => void;
  setDelayOverrideMs: (ms: number | null) => void;
  clearMockDevSettings: () => void;
}

export const useMockDevStore = create<MockDevState>((set) => ({
  simulatedErrorCode: null,
  delayOverrideMs: null,
  setSimulatedErrorCode: (code) => set({ simulatedErrorCode: code }),
  setDelayOverrideMs: (ms) => set({ delayOverrideMs: ms }),
  clearMockDevSettings: () =>
    set({ simulatedErrorCode: null, delayOverrideMs: null }),
}));

export function getSimulatedErrorCode(): AppErrorCode | null {
  return useMockDevStore.getState().simulatedErrorCode;
}

export function getDelayOverrideMs(): number | null {
  return useMockDevStore.getState().delayOverrideMs;
}
