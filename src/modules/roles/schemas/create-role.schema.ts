import { z } from "zod";
import { ALL_PERMISSION_VALUES } from "@/constants/permission-display.constants";

export const createRoleSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Role name must be at least 2 characters")
    .max(80, "Role name is too long"),
  description: z.string().trim().max(500, "Description is too long"),
  permissions: z
    .array(z.enum(ALL_PERMISSION_VALUES))
    .min(1, "Select at least one permission"),
});

export type CreateRoleFormData = z.infer<typeof createRoleSchema>;
