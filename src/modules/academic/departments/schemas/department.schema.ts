import { z } from "zod";

const statusSchema = z.enum(["active", "inactive", "pending"]);

export const departmentFormSchema = z.object({
  name: z.string().trim().min(2).max(120),
  code: z.string().trim().min(2).max(20),
  collegeId: z.string().min(1, "Select a college"),
  headUserId: z.string().min(1, "Select department head"),
  description: z.string().trim().max(500),
  status: statusSchema,
});

export type DepartmentFormData = z.infer<typeof departmentFormSchema>;
