import type { DepartmentOption } from "@/modules/users/types/user-management.types";

export const MOCK_DEPARTMENTS: DepartmentOption[] = [
  { value: "executive", label: "Executive" },
  { value: "engineering", label: "Engineering" },
  { value: "it", label: "IT" },
  { value: "operations", label: "Operations" },
  { value: "computer-science", label: "Computer Science" },
  { value: "mathematics", label: "Mathematics" },
  { value: "registrar", label: "Registrar" },
  { value: "finance", label: "Finance" },
];

export function findDepartmentLabel(departmentId: string): string {
  return (
    MOCK_DEPARTMENTS.find((item) => item.value === departmentId)?.label ??
    departmentId
  );
}
