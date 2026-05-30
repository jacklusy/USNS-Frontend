import { ROLE_DISPLAY_LABELS } from "@/constants/roles.constants";
import { USER_ROLE_VALUES } from "@/constants/roles.constants";
import type { RoleOption } from "@/modules/users/types/user-management.types";

export const MOCK_ROLE_OPTIONS: RoleOption[] = USER_ROLE_VALUES.map((role) => ({
  value: role,
  label: ROLE_DISPLAY_LABELS[role],
}));
