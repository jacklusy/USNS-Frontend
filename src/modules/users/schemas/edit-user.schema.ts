import { z } from "zod";
import { USER_ROLE_VALUES } from "@/constants/roles.constants";

export const editUserSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(120, "Full name is too long"),
  email: z.string().trim().email("Enter a valid email address"),
  role: z.enum(USER_ROLE_VALUES as [string, ...string[]]),
  departmentId: z.string().min(1, "Select a department"),
  forcePasswordChange: z.boolean(),
});

export type EditUserFormData = z.infer<typeof editUserSchema>;
