import { getUsersStore } from "@/mock/users/users.mock";

export function findUserNameById(userId: string): string {
  const user = getUsersStore().find((entry) => entry.id === userId);
  return user?.fullName ?? userId;
}
