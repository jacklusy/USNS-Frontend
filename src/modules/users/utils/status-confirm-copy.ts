import { USERS_COPY } from "@/constants/users.constants";
import type {
  BulkUserStatusAction,
  UserStatusAction,
} from "../types/user-management.types";

export function statusConfirmTitle(action: UserStatusAction): string {
  if (action === "activate") return USERS_COPY.statusConfirmActivateTitle;
  if (action === "deactivate") return USERS_COPY.statusConfirmDeactivateTitle;
  return USERS_COPY.statusConfirmSuspendTitle;
}

export function statusConfirmDescription(
  action: UserStatusAction,
  name: string,
): string {
  if (action === "activate") {
    return USERS_COPY.statusConfirmActivateDescription(name);
  }
  if (action === "deactivate") {
    return USERS_COPY.statusConfirmDeactivateDescription(name);
  }
  return USERS_COPY.statusConfirmSuspendDescription(name);
}

export function bulkStatusConfirmTitle(action: BulkUserStatusAction): string {
  if (action === "activate") {
    return USERS_COPY.bulkStatusConfirmActivateTitle;
  }
  if (action === "deactivate") {
    return USERS_COPY.bulkStatusConfirmDeactivateTitle;
  }
  return USERS_COPY.bulkStatusConfirmSuspendTitle;
}

export function bulkStatusConfirmDescription(
  action: BulkUserStatusAction,
  count: number,
): string {
  if (action === "activate") {
    return USERS_COPY.bulkStatusConfirmActivateDescription(count);
  }
  if (action === "deactivate") {
    return USERS_COPY.bulkStatusConfirmDeactivateDescription(count);
  }
  return USERS_COPY.bulkStatusConfirmSuspendDescription(count);
}

export function statusToastMessage(
  action: UserStatusAction,
  bulkCount?: number,
): string {
  if (bulkCount !== undefined && bulkCount > 1) {
    if (action === "activate") return USERS_COPY.toastBulkActivated(bulkCount);
    if (action === "deactivate") {
      return USERS_COPY.toastBulkDeactivated(bulkCount);
    }
    return USERS_COPY.toastBulkSuspended(bulkCount);
  }
  if (action === "activate") return USERS_COPY.toastActivated;
  if (action === "deactivate") return USERS_COPY.toastDeactivated;
  return USERS_COPY.toastSuspended;
}

export function isStatusActionDestructive(action: UserStatusAction): boolean {
  return action === "deactivate" || action === "suspend";
}
