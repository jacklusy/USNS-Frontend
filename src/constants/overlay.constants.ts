export const OVERLAY_MAX_WIDTH_CLASSES = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
} as const;

export const DRAWER_WIDTH_CLASSES = {
  sm: "w-[320px] max-w-[90vw]",
  md: "w-[400px] max-w-[90vw]",
  lg: "w-[480px] max-w-[90vw]",
} as const;

export type OverlayMaxWidth = keyof typeof OVERLAY_MAX_WIDTH_CLASSES;
export type DrawerWidth = keyof typeof DRAWER_WIDTH_CLASSES;
