import { z } from "zod";

const statusSchema = z.enum(["active", "inactive", "pending"]);

const dashboardRoleSchema = z.enum(["admin", "staff", "dba"]);

const staffFieldsSchema = z.object({
  employeeId: z.string().trim().min(3).max(20),
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().email(),
  phone: z.string().trim().min(5).max(30),
  departmentId: z.string().optional(),
  office: z.string().trim().max(120),
  position: z.string().trim().min(2).max(120),
  dashboardRole: dashboardRoleSchema,
  status: statusSchema,
});

function refineDepartmentOrOffice<T extends z.ZodType<z.infer<typeof staffFieldsSchema>>>(
  schema: T,
) {
  return schema.superRefine((data, ctx) => {
    const hasDept = Boolean(data.departmentId?.trim());
    const hasOffice = Boolean(data.office.trim());
    if (!hasDept && !hasOffice) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Select a department or enter an office",
        path: ["office"],
      });
    }
  });
}

export const createStaffSchema = refineDepartmentOrOffice(staffFieldsSchema);
export const editStaffSchema = refineDepartmentOrOffice(staffFieldsSchema);

export type CreateStaffFormData = z.infer<typeof createStaffSchema>;
export type EditStaffFormData = z.infer<typeof editStaffSchema>;
