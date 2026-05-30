import type { UserRole } from "@/types/user.types";

/** Shared shape for create/edit user forms (password optional on edit). */
export interface UserFormValues {
  fullName: string;
  email: string;
  role: UserRole;
  departmentId: string;
  forcePasswordChange: boolean;
  temporaryPassword?: string;
}
