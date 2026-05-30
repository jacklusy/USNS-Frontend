import type { UserRole } from "@/types/user.types";

export const USER_ROLES = {
  President: "president",
  Dean: "dean",
  Dba: "dba",
  Admin: "admin",
  Faculty: "faculty",
  Staff: "staff",
} as const satisfies Record<string, UserRole>;

export const USER_ROLE_VALUES: readonly UserRole[] = Object.values(USER_ROLES);

export const ROLE_DISPLAY_LABELS: Record<UserRole, string> = {
  president: "President",
  dean: "Dean",
  dba: "DBA",
  admin: "Admin",
  faculty: "Faculty",
  staff: "Staff",
};
