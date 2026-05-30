import type { Department } from "@/modules/academic/types/academic.types";
import type { DepartmentListQueryParams } from "@/modules/academic/types/academic.types";
import type { PaginatedResponse } from "@/types/api.types";
import type { EntityStatus } from "@/constants/status-badge.constants";
import { getUsersStore } from "@/mock/users/users.mock";
import { administrativeStaffCountByDepartmentId } from "@/mock/staff/staff.mock";
import { findCollegeById, getCollegesStore } from "@/mock/academic/colleges.mock";
import { findUserNameById } from "@/mock/academic/user-labels.mock";
import { getCoursesStore } from "@/mock/academic/courses.mock";
import { matchesSearch, paginate } from "@/mock/academic/academic-mock-utils";

const SEED_DEPARTMENTS: Department[] = [
  {
    id: "dept_executive",
    code: "EXE",
    name: "Executive Administration",
    collegeId: "col_business",
    collegeName: "College of Business",
    headUserId: "usr_president",
    headName: "Dr. Layla Hassan",
    description: "Executive leadership and institutional strategy.",
    status: "active",
    courseCount: 0,
    staffCount: 0,
    createdAt: "2023-08-10T00:00:00.000Z",
  },
  {
    id: "dept_it",
    code: "IT",
    name: "Information Technology",
    collegeId: "col_engineering",
    collegeName: "College of Engineering",
    headUserId: "usr_dba",
    headName: "Omar Farouk",
    description: "Campus systems, infrastructure, and digital services.",
    status: "active",
    courseCount: 0,
    staffCount: 0,
    createdAt: "2023-08-12T00:00:00.000Z",
  },
  {
    id: "dept_engineering",
    code: "GEN",
    name: "General Engineering",
    collegeId: "col_engineering",
    collegeName: "College of Engineering",
    headUserId: "usr_dean",
    headName: "Sara Mitchell",
    description: "Cross-disciplinary engineering foundations and operations.",
    status: "active",
    courseCount: 0,
    staffCount: 0,
    createdAt: "2023-08-15T00:00:00.000Z",
  },
  {
    id: "dept_computer_science",
    code: "CS",
    name: "Computer Science",
    collegeId: "col_engineering",
    collegeName: "College of Engineering",
    headUserId: "usr_faculty",
    headName: "Elena Vasquez",
    description: "Computing theory, software engineering, and data systems.",
    status: "active",
    courseCount: 0,
    staffCount: 0,
    createdAt: "2023-09-01T00:00:00.000Z",
  },
  {
    id: "dept_mathematics",
    code: "MATH",
    name: "Mathematics",
    collegeId: "col_engineering",
    collegeName: "College of Engineering",
    headUserId: "usr_006",
    headName: "Fatima Hassan",
    description: "Applied and pure mathematics supporting STEM programs.",
    status: "inactive",
    courseCount: 0,
    staffCount: 0,
    createdAt: "2023-09-05T00:00:00.000Z",
  },
  {
    id: "dept_registrar",
    code: "REG",
    name: "Registrar",
    collegeId: "col_business",
    collegeName: "College of Business",
    headUserId: "usr_007",
    headName: "Marcus Chen",
    description: "Student records, enrollment services, and academic scheduling.",
    status: "active",
    courseCount: 0,
    staffCount: 0,
    createdAt: "2023-09-08T00:00:00.000Z",
  },
  {
    id: "dept_finance",
    code: "FIN",
    name: "Finance",
    collegeId: "col_business",
    collegeName: "College of Business",
    headUserId: "usr_008",
    headName: "Priya Nair",
    description: "Budgeting, procurement, and institutional financial planning.",
    status: "active",
    courseCount: 0,
    staffCount: 0,
    createdAt: "2023-09-10T00:00:00.000Z",
  },
  {
    id: "dept_electrical",
    code: "EE",
    name: "Electrical Engineering",
    collegeId: "col_engineering",
    collegeName: "College of Engineering",
    headUserId: "usr_faculty",
    headName: "Elena Vasquez",
    description: "Circuits, signals, and power systems engineering.",
    status: "active",
    courseCount: 0,
    staffCount: 0,
    createdAt: "2023-10-01T00:00:00.000Z",
  },
  {
    id: "dept_marketing",
    code: "MKT",
    name: "Marketing",
    collegeId: "col_business",
    collegeName: "College of Business",
    headUserId: "usr_009",
    headName: "Ahmed Al-Rashidi",
    description: "Brand strategy, communications, and market research.",
    status: "active",
    courseCount: 0,
    staffCount: 0,
    createdAt: "2023-10-05T00:00:00.000Z",
  },
  {
    id: "dept_operations",
    code: "OPS",
    name: "Operations",
    collegeId: "col_business",
    collegeName: "College of Business",
    headUserId: "usr_007",
    headName: "Marcus Chen",
    description: "Campus operations, facilities, and logistics coordination.",
    status: "active",
    courseCount: 0,
    staffCount: 0,
    createdAt: "2023-10-08T00:00:00.000Z",
  },
  {
    id: "dept_english",
    code: "ENG-LIT",
    name: "English & Literature",
    collegeId: "col_arts",
    collegeName: "College of Arts & Humanities",
    headUserId: "usr_faculty",
    headName: "Elena Vasquez",
    description: "Composition, literature, and critical writing programs.",
    status: "active",
    courseCount: 0,
    staffCount: 0,
    createdAt: "2023-10-12T00:00:00.000Z",
  },
];

let departmentsStore: Department[] = structuredClone(SEED_DEPARTMENTS);

export function getDepartmentsStore(): Department[] {
  return departmentsStore;
}

export function resetDepartmentsStore(): void {
  departmentsStore = structuredClone(SEED_DEPARTMENTS);
}

export function findDepartmentById(id: string): Department | undefined {
  return departmentsStore.find((dept) => dept.id === id);
}

export function findDepartmentLabel(departmentId: string): string {
  return findDepartmentById(departmentId)?.name ?? departmentId;
}

export function departmentCodeExists(
  code: string,
  excludeId?: string,
): boolean {
  const normalized = code.trim().toUpperCase();
  return departmentsStore.some(
    (dept) =>
      dept.code.toUpperCase() === normalized && dept.id !== excludeId,
  );
}

export function generateDepartmentId(): string {
  return `dept_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
}

export function recomputeDepartmentCounts(): void {
  const courses = getCoursesStore();
  const users = getUsersStore();
  for (const dept of departmentsStore) {
    const college = findCollegeById(dept.collegeId);
    dept.collegeName = college?.name ?? dept.collegeId;
    dept.headName = findUserNameById(dept.headUserId);
    dept.courseCount = courses.filter((c) => c.departmentId === dept.id).length;
    const dashboardUsers = users.filter((u) => u.departmentId === dept.id).length;
    const adminStaff = administrativeStaffCountByDepartmentId(dept.id);
    dept.staffCount = dashboardUsers + adminStaff;
  }
}

function filterDepartments(params: DepartmentListQueryParams): Department[] {
  recomputeDepartmentCounts();
  return departmentsStore.filter((dept) => {
    if (params.collegeId && dept.collegeId !== params.collegeId) return false;
    if (params.status && dept.status !== params.status) return false;
    return matchesSearch(params.search, [
      dept.name,
      dept.code,
      dept.collegeName,
      dept.headName,
      dept.description,
    ]);
  });
}

export function listDepartmentsPaginated(
  params: DepartmentListQueryParams,
): PaginatedResponse<Department> {
  return paginate(filterDepartments(params), params.page, params.per_page);
}

export function listDepartmentOptions(): { value: string; label: string }[] {
  recomputeDepartmentCounts();
  return departmentsStore
    .filter((dept) => dept.status === "active")
    .map((dept) => ({ value: dept.id, label: dept.name }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export function departmentsByCollegeId(collegeId: string): Department[] {
  recomputeDepartmentCounts();
  return departmentsStore.filter((dept) => dept.collegeId === collegeId);
}

export function setDepartmentStatus(
  id: string,
  status: EntityStatus,
): Department | undefined {
  const dept = findDepartmentById(id);
  if (!dept) return undefined;
  dept.status = status;
  recomputeDepartmentCounts();
  return dept;
}

export function getCollegeOptionsFromDepartments(): { value: string; label: string }[] {
  return getCollegesStore().map((c) => ({ value: c.id, label: c.name }));
}
