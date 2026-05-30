import { z } from "zod";

export const courseFormSchema = z.object({
  code: z.string().trim().min(2).max(20),
  name: z.string().trim().min(2).max(120),
  creditHours: z.number().min(1).max(12),
  departmentId: z.string().min(1),
  description: z.string().trim().max(1000),
  prerequisiteIds: z.array(z.string()),
  status: z.enum(["active", "inactive", "pending"]),
});

export type CourseFormData = z.infer<typeof courseFormSchema>;
