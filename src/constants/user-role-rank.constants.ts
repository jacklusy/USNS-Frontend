import type { UserRole } from "@/types/user.types";

export const USER_ROLE_RANK: Record<UserRole, number> = {
  president: 100,
  dean: 80,
  dba: 70,
  admin: 60,
  faculty: 40,
  staff: 30,
};

export function isRoleDemotion(
  currentRole: UserRole,
  nextRole: UserRole,
): boolean {
  return USER_ROLE_RANK[nextRole] < USER_ROLE_RANK[currentRole];
}
