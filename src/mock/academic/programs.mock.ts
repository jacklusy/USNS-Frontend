import type { Program } from "@/modules/academic/types/academic.types";
import type { ProgramListQueryParams } from "@/modules/academic/types/academic.types";
import type { ProgramType } from "@/modules/academic/types/academic.types";
import type { PaginatedResponse } from "@/types/api.types";
import { findDepartmentById } from "@/mock/academic/departments.mock";
import { getCoursesStore } from "@/mock/academic/courses.mock";
import { matchesSearch, paginate } from "@/mock/academic/academic-mock-utils";

const PROGRAM_TYPES: ProgramType[] = ["bachelor", "master", "phd"];

const SEED_PROGRAMS: Program[] = Array.from({ length: 20 }, (_, index) => {
  const num = index + 1;
  const departmentIds = [
    "dept_computer_science",
    "dept_electrical",
    "dept_mathematics",
    "dept_engineering",
    "dept_english",
    "dept_marketing",
    "dept_finance",
  ];
  const departmentId = departmentIds[index % departmentIds.length];
  const type = PROGRAM_TYPES[index % PROGRAM_TYPES.length];
  const coursePool = getCoursesStore().filter(
    (c) => c.departmentId === departmentId,
  );
  const courseIds = coursePool.slice(0, 3 + (index % 3)).map((c) => c.id);
  return {
    id: `program_${String(num).padStart(3, "0")}`,
    code: `PRG${100 + num}`,
    name: `${type === "bachelor" ? "BS" : type === "master" ? "MS" : "PhD"} Program ${num}`,
    type,
    departmentId,
    departmentName: "",
    durationYears: type === "bachelor" ? 4 : type === "master" ? 2 : 5,
    description: `Degree program ${num} linked to department curriculum.`,
    status: index % 9 === 0 ? "inactive" : "active",
    enrolledCount: 40 + index * 7,
    courseCount: courseIds.length,
    courseIds,
    createdAt: `2024-03-${String((index % 28) + 1).padStart(2, "0")}T12:00:00.000Z`,
  };
});

let programsStore: Program[] = structuredClone(SEED_PROGRAMS);

export function getProgramsStore(): Program[] {
  return programsStore;
}

export function resetProgramsStore(): void {
  programsStore = structuredClone(SEED_PROGRAMS);
}

export function findProgramById(id: string): Program | undefined {
  return programsStore.find((p) => p.id === id);
}

export function programCodeExists(code: string, excludeId?: string): boolean {
  const normalized = code.trim().toUpperCase();
  return programsStore.some(
    (p) => p.code.toUpperCase() === normalized && p.id !== excludeId,
  );
}

export function generateProgramId(): string {
  return `program_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
}

export function syncProgramCourseLinks(): void {
  const courses = getCoursesStore();
  for (const course of courses) {
    course.programIds = [];
  }
  for (const program of programsStore) {
    const dept = findDepartmentById(program.departmentId);
    program.departmentName = dept?.name ?? program.departmentId;
    program.courseCount = program.courseIds.length;
    for (const courseId of program.courseIds) {
      const course = courses.find((c) => c.id === courseId);
      if (course && !course.programIds.includes(program.id)) {
        course.programIds.push(program.id);
      }
    }
  }
}

function filterPrograms(params: ProgramListQueryParams): Program[] {
  syncProgramCourseLinks();
  return programsStore.filter((program) => {
    if (
      params.departmentId &&
      program.departmentId !== params.departmentId
    ) {
      return false;
    }
    if (params.status && program.status !== params.status) return false;
    return matchesSearch(params.search, [
      program.name,
      program.code,
      program.departmentName,
      program.description,
    ]);
  });
}

export function listProgramsPaginated(
  params: ProgramListQueryParams,
): PaginatedResponse<Program> {
  return paginate(filterPrograms(params), params.page, params.per_page);
}

export function programsByDepartmentId(departmentId: string): Program[] {
  syncProgramCourseLinks();
  return programsStore.filter((p) => p.departmentId === departmentId);
}
