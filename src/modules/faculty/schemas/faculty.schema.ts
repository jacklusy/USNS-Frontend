import { z } from "zod";

const statusSchema = z.enum(["active", "inactive", "pending"]);

const rankSchema = z.enum([
  "instructor",
  "assistant_professor",
  "associate_professor",
  "professor",
]);

export const createFacultySchema = z.object({
  employeeId: z.string().trim().min(3).max(20),
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().email(),
  phone: z.string().trim().min(5).max(30),
  departmentId: z.string().min(1, "Select a department"),
  specialization: z.string().trim().min(2).max(120),
  rank: rankSchema,
  status: statusSchema,
  assignedCourseIds: z.array(z.string()),
  publicationsCount: z.number().int().min(0).max(9999),
});

export const editFacultySchema = createFacultySchema;

export type CreateFacultyFormData = z.infer<typeof createFacultySchema>;
export type EditFacultyFormData = z.infer<typeof editFacultySchema>;
