import { z } from "zod";

export const profileEditSchema = z.object({
  displayName: z
    .string()
    .min(1, "Display name is required")
    .max(80, "Display name is too long"),
  phone: z.string().max(32, "Phone number is too long"),
  bio: z.string().max(500, "Bio must be 500 characters or fewer"),
});

export type ProfileEditFormData = z.infer<typeof profileEditSchema>;
