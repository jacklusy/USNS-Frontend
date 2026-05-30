import type { UserRole } from "@/types/user.types";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
