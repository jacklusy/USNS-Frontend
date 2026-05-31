import { z } from "zod";

export const accountPreferencesSchema = z.object({
  language: z.string().min(1, "Select a language"),
  timezone: z.string().min(1, "Select a timezone"),
  dateFormat: z.enum(["short", "medium", "long"]),
  theme: z.enum(["light", "dark", "system"]),
});

export type AccountPreferencesFormData = z.infer<typeof accountPreferencesSchema>;
