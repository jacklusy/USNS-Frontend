import type { ActivityActionType } from "@/modules/dashboard/types/dashboard.types";

export type ActivityActionIconKey =
  | "plus"
  | "pencil"
  | "trash"
  | "download"
  | "check"
  | "eye";

export interface ActivityActionStyle {
  icon: ActivityActionIconKey;
  toneClass: string;
  verbLabel: string;
}

export const ACTIVITY_ACTION_STYLES: Record<
  ActivityActionType,
  ActivityActionStyle
> = {
  created: {
    icon: "plus",
    toneClass: "text-success",
    verbLabel: "created",
  },
  updated: {
    icon: "pencil",
    toneClass: "text-brand",
    verbLabel: "updated",
  },
  deleted: {
    icon: "trash",
    toneClass: "text-danger",
    verbLabel: "deleted",
  },
  exported: {
    icon: "download",
    toneClass: "text-brand",
    verbLabel: "exported",
  },
  approved: {
    icon: "check",
    toneClass: "text-success",
    verbLabel: "approved",
  },
  viewed: {
    icon: "eye",
    toneClass: "text-muted-fg",
    verbLabel: "viewed",
  },
};
