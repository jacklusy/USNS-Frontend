import { ROLE_DISPLAY_LABELS } from "@/constants/roles.constants";
import { USER_ROLE_VALUES } from "@/constants/roles.constants";
import type { FilterFieldConfig } from "@/types/filter.types";
import { UserStatus } from "@/types/user.types";

export const USERS_FILTER_CONFIG: FilterFieldConfig[] = [
  {
    id: "roles",
    type: "select",
    label: "Role",
    urlKey: "role",
    multiple: true,
    options: USER_ROLE_VALUES.map((role) => ({
      label: ROLE_DISPLAY_LABELS[role],
      value: role,
    })),
    placeholder: "Any role",
  },
  {
    id: "status",
    type: "select",
    label: "Status",
    urlKey: "status",
    options: [
      { label: "Active", value: UserStatus.Active },
      { label: "Inactive", value: UserStatus.Inactive },
      { label: "Suspended", value: UserStatus.Suspended },
    ],
    placeholder: "Any status",
  },
];
