import type { EntityStatus } from "@/constants/status-badge.constants";
import { UserStatus } from "@/types/user.types";

export function userStatusToBadgeStatus(status: UserStatus): EntityStatus {
  if (status === UserStatus.Active) return "active";
  if (status === UserStatus.Inactive) return "inactive";
  return "inactive";
}

export function formatUserStatusLabel(status: UserStatus): string {
  if (status === UserStatus.Active) return "Active";
  if (status === UserStatus.Inactive) return "Inactive";
  return "Suspended";
}
