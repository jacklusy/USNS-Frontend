import type {
  BulkUserStatusAction,
  UserStatusAction,
} from "../types/user-management.types";
import { UserStatus } from "@/types/user.types";

export function statusFromUserStatusAction(
  action: UserStatusAction,
): UserStatus {
  if (action === "activate") return UserStatus.Active;
  if (action === "deactivate") return UserStatus.Inactive;
  return UserStatus.Suspended;
}

export function isBulkUserStatusAction(
  value: string,
): value is BulkUserStatusAction {
  return value === "activate" || value === "deactivate" || value === "suspend";
}
