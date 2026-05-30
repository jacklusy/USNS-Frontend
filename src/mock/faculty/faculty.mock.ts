import {
  ACTIVE_SEMESTER_LABEL,
  FACULTY_MAX_CREDIT_HOURS,
} from "@/constants/faculty-management.constants";
import { findCourseById, getCoursesStore } from "@/mock/academic/courses.mock";
import { findDepartmentById } from "@/mock/academic/departments.mock";
import { matchesSearch, paginate } from "@/mock/academic/academic-mock-utils";
import type { EntityStatus } from "@/constants/status-badge.constants";
import type { PaginatedResponse } from "@/types/api.types";
import type {
  FacultyDetail,
  FacultyListQueryParams,
  FacultyMember,
  FacultyRank,
  FacultySemesterAssignment,
} from "@/modules/faculty/types/faculty.types";

const DEPT_IDS = [
  "dept_computer_science",
  "dept_mathematics",
  "dept_electrical",
  "dept_engineering",
  "dept_english",
  "dept_marketing",
  "dept_finance",
  "dept_operations",
] as const;

const RANKS: readonly FacultyRank[] = [
  "instructor",
  "assistant_professor",
  "associate_professor",
  "professor",
];

const FIRST_NAMES = [
  "Amira",
  "Omar",
  "Sara",
  "Hassan",
  "Layla",
  "Youssef",
  "Nadia",
  "Karim",
  "Fatima",
  "Tariq",
  "Maya",
  "Rashid",
  "Leila",
  "Samir",
  "Dina",
  "Fadi",
  "Hana",
  "Ziad",
  "Noor",
  "Bilal",
  "Rania",
  "Jamal",
  "Salma",
  "Ibrahim",
  "Yasmin",
] as const;

const LAST_NAMES = [
  "Hassan",
  "Khalil",
  "Nasser",
  "Farouk",
  "Saleh",
  "Mansour",
  "Aziz",
  "Hamdi",
  "Qureshi",
  "Barakat",
  "Sabbagh",
  "Rahman",
  "Darwish",
  "Fahmy",
  "Said",
  "Zaki",
  "Haddad",
  "Najjar",
  "Salem",
  "Younis",
  "Awad",
  "Khoury",
  "Issa",
  "Moussa",
  "Bishara",
] as const;

const SPECIALIZATIONS = [
  "Software Engineering",
  "Data Science",
  "Applied Mathematics",
  "Power Systems",
  "Structural Engineering",
  "Technical Communication",
  "Digital Marketing",
  "Corporate Finance",
  "Operations Research",
  "Machine Learning",
  "Cybersecurity",
  "Control Theory",
  "Literature",
  "Econometrics",
  "Human-Computer Interaction",
] as const;

function buildSeedFaculty(): FacultyMember[] {
  const courses = getCoursesStore();
  const members: FacultyMember[] = [];
  for (let index = 0; index < 26; index += 1) {
    const deptId = DEPT_IDS[index % DEPT_IDS.length];
    const deptCourses = courses.filter(
      (c) => c.departmentId === deptId && c.status === "active",
    );
    const assignedCourseIds = deptCourses
      .slice(0, 1 + (index % 3))
      .map((c) => c.id);
    const firstName = FIRST_NAMES[index % FIRST_NAMES.length];
    const lastName = LAST_NAMES[index % LAST_NAMES.length];
    const employeeNum = String(1000 + index).padStart(4, "0");
    members.push({
      id: `fac_${String(index + 1).padStart(3, "0")}`,
      employeeId: `FAC-${employeeNum}`,
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@usns.edu`,
      phone: `+1-555-01${String(index).padStart(2, "0")}`,
      departmentId: deptId,
      departmentName: "",
      specialization: SPECIALIZATIONS[index % SPECIALIZATIONS.length],
      rank: RANKS[index % RANKS.length],
      status: index % 9 === 0 ? "inactive" : "active",
      assignedCourseIds,
      publicationsCount: index % 7,
      createdAt: `2023-0${(index % 9) + 1}-10T08:00:00.000Z`,
    });
  }
  return members;
}

const SEED_FACULTY: FacultyMember[] = buildSeedFaculty();

let facultyStore: FacultyMember[] = structuredClone(SEED_FACULTY);

export function getFacultyStore(): FacultyMember[] {
  return facultyStore;
}

export function resetFacultyStore(): void {
  facultyStore = structuredClone(SEED_FACULTY);
}

export function findFacultyById(id: string): FacultyMember | undefined {
  return facultyStore.find((member) => member.id === id);
}

export function facultyEmployeeIdExists(
  employeeId: string,
  excludeId?: string,
): boolean {
  const normalized = employeeId.trim().toUpperCase();
  return facultyStore.some(
    (member) =>
      member.employeeId.toUpperCase() === normalized && member.id !== excludeId,
  );
}

export function generateFacultyId(): string {
  return `fac_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
}

export function recomputeFacultyDisplayFields(): void {
  for (const member of facultyStore) {
    const dept = findDepartmentById(member.departmentId);
    member.departmentName = dept?.name ?? member.departmentId;
    member.fullName = `${member.firstName} ${member.lastName}`.trim();
  }
}

function buildSemesterAssignments(
  assignedCourseIds: string[],
): FacultySemesterAssignment[] {
  return assignedCourseIds
    .map((courseId) => {
      const course = findCourseById(courseId);
      if (!course) return null;
      return {
        id: course.id,
        courseId: course.id,
        courseCode: course.code,
        courseName: course.name,
        creditHours: course.creditHours,
        semesterLabel: ACTIVE_SEMESTER_LABEL,
      };
    })
    .filter((row): row is FacultySemesterAssignment => row !== null);
}

export function buildFacultyDetail(member: FacultyMember): FacultyDetail {
  const semesterAssignments = buildSemesterAssignments(member.assignedCourseIds);
  const workloadCreditHours = semesterAssignments.reduce(
    (sum, row) => sum + row.creditHours,
    0,
  );
  return {
    member: { ...member },
    semesterAssignments,
    workloadCreditHours,
    maxCreditHours: FACULTY_MAX_CREDIT_HOURS,
  };
}

function filterFaculty(params: FacultyListQueryParams): FacultyMember[] {
  recomputeFacultyDisplayFields();
  return facultyStore.filter((member) => {
    if (params.departmentId && member.departmentId !== params.departmentId) {
      return false;
    }
    if (params.rank && member.rank !== params.rank) return false;
    if (params.status && member.status !== params.status) return false;
    return matchesSearch(params.search, [
      member.fullName,
      member.employeeId,
      member.email,
      member.departmentName,
      member.specialization,
    ]);
  });
}

export function listFacultyPaginated(
  params: FacultyListQueryParams,
): PaginatedResponse<FacultyMember> {
  return paginate(filterFaculty(params), params.page, params.per_page);
}

export function setFacultyStatus(
  id: string,
  status: EntityStatus,
): FacultyMember | undefined {
  const member = findFacultyById(id);
  if (!member) return undefined;
  member.status = status;
  recomputeFacultyDisplayFields();
  return member;
}

export function facultyCountByDepartmentId(departmentId: string): number {
  recomputeFacultyDisplayFields();
  return facultyStore.filter(
    (m) => m.departmentId === departmentId && m.status === "active",
  ).length;
}
