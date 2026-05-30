import type { UserAuditActionType } from "@/modules/users/types/user-audit.types";
import type { ActivityActionIconKey } from "@/constants/activity-action.constants";

export interface UserAuditActionStyle {
  icon: ActivityActionIconKey;
  toneClass: string;
}

export const USER_AUDIT_ACTION_STYLES: Record<
  UserAuditActionType,
  UserAuditActionStyle
> = {
  status_changed: {
    icon: "pencil",
    toneClass: "text-warn",
  },
  created: {
    icon: "plus",
    toneClass: "text-success",
  },
  updated: {
    icon: "pencil",
    toneClass: "text-brand",
  },
  login: {
    icon: "check",
    toneClass: "text-success",
  },
  viewed: {
    icon: "eye",
    toneClass: "text-muted-fg",
  },
};
