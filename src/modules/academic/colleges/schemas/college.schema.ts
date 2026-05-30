import { z } from "zod";

const statusSchema = z.enum(["active", "inactive", "pending"]);

export const createCollegeSchema = z.object({
  name: z.string().trim().min(2).max(120),
  code: z.string().trim().min(2).max(20),
  deanUserId: z.string().min(1, "Select a dean"),
  description: z.string().trim().max(500),
  status: statusSchema,
});

export const editCollegeSchema = createCollegeSchema;

export type CreateCollegeFormData = z.infer<typeof createCollegeSchema>;
export type EditCollegeFormData = z.infer<typeof editCollegeSchema>;
