import { parseApiDate } from "@/lib/transformers/common";
import type { Course } from "@/modules/academic/types/academic.types";
import type { CourseListQueryParams } from "@/modules/academic/types/academic.types";
import type { CourseSection } from "@/modules/academic/types/academic.types";
import type { PaginatedResponse } from "@/types/api.types";
import { findDepartmentById } from "@/mock/academic/departments.mock";
import { matchesSearch, paginate } from "@/mock/academic/academic-mock-utils";

const DEPT_IDS = [
  "dept_computer_science",
  "dept_mathematics",
  "dept_electrical",
  "dept_engineering",
  "dept_english",
  "dept_marketing",
  "dept_finance",
] as const;

const COURSE_TOPICS = [
  "Introduction",
  "Advanced",
  "Laboratory",
  "Seminar",
  "Capstone",
  "Topics in",
  "Research Methods",
  "Statistics",
  "Algorithms",
  "Systems",
] as const;

function buildSeedCourses(): Course[] {
  const courses: Course[] = [];
  let index = 1;
  for (const deptId of DEPT_IDS) {
    for (let slot = 0; slot < 7; slot += 1) {
      const topic = COURSE_TOPICS[(index + slot) % COURSE_TOPICS.length];
      const code = `${deptId.split("_").pop()?.slice(0, 3).toUpperCase() ?? "CRS"}${100 + index}`;
      const id = `course_${String(index).padStart(3, "0")}`;
      const prerequisiteIds: string[] =
        slot > 0 && courses.length > 0
          ? [courses[courses.length - 1].id]
          : [];
      courses.push({
        id,
        code,
        name: `${topic} ${deptId.replace("dept_", "").replace(/_/g, " ")}`,
        creditHours: 2 + (index % 4),
        departmentId: deptId,
        departmentName: "",
        description: `Mock course ${index} for curriculum and prerequisite testing.`,
        prerequisiteIds,
        status: index % 11 === 0 ? "inactive" : "active",
        sectionCount: 1 + (index % 3),
        enrollmentCount: 20 + (index % 40),
        programIds: [],
        createdAt: parseApiDate(
          `2024-0${(index % 9) + 1}-15T10:00:00.000Z`,
        ),
      });
      index += 1;
      if (index > 50) return courses;
    }
  }
  return courses;
}

const SEED_COURSES: Course[] = buildSeedCourses();

const SEED_SECTIONS: CourseSection[] = SEED_COURSES.flatMap((course) =>
  Array.from({ length: course.sectionCount }, (_, sectionIndex) => ({
    id: `section_${course.id}_${sectionIndex + 1}`,
    courseId: course.id,
    termLabel: `2025-${sectionIndex % 2 === 0 ? "Fall" : "Spring"}`,
    capacity: 30 + sectionIndex * 5,
    enrolled: Math.min(
      course.enrollmentCount,
      25 + sectionIndex * 3,
    ),
  })),
);

let coursesStore: Course[] = structuredClone(SEED_COURSES);
let sectionsStore: CourseSection[] = structuredClone(SEED_SECTIONS);

export function getCoursesStore(): Course[] {
  return coursesStore;
}

export function getCourseSectionsStore(): CourseSection[] {
  return sectionsStore;
}

export function resetCoursesStore(): void {
  coursesStore = structuredClone(SEED_COURSES);
  sectionsStore = structuredClone(SEED_SECTIONS);
}

export function findCourseById(id: string): Course | undefined {
  return coursesStore.find((course) => course.id === id);
}

export function courseCodeExists(code: string, excludeId?: string): boolean {
  const normalized = code.trim().toUpperCase();
  return coursesStore.some(
    (course) =>
      course.code.toUpperCase() === normalized && course.id !== excludeId,
  );
}

export function generateCourseId(): string {
  return `course_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
}

export function recomputeCourseDisplayFields(): void {
  for (const course of coursesStore) {
    const dept = findDepartmentById(course.departmentId);
    course.departmentName = dept?.name ?? course.departmentId;
    course.sectionCount = sectionsStore.filter(
      (s) => s.courseId === course.id,
    ).length;
  }
}

function filterCourses(params: CourseListQueryParams): Course[] {
  recomputeCourseDisplayFields();
  return coursesStore.filter((course) => {
    if (params.departmentId && course.departmentId !== params.departmentId) {
      return false;
    }
    if (params.status && course.status !== params.status) return false;
    return matchesSearch(params.search, [
      course.name,
      course.code,
      course.departmentName,
      course.description,
    ]);
  });
}

export function listCoursesPaginated(
  params: CourseListQueryParams,
): PaginatedResponse<Course> {
  return paginate(filterCourses(params), params.page, params.per_page);
}

export function coursesByDepartmentId(departmentId: string): Course[] {
  recomputeCourseDisplayFields();
  return coursesStore.filter((c) => c.departmentId === departmentId);
}

export function coursesByProgramId(programId: string): Course[] {
  recomputeCourseDisplayFields();
  return coursesStore.filter((c) => c.programIds.includes(programId));
}

export function listCourseOptions(excludeId?: string): { value: string; label: string }[] {
  recomputeCourseDisplayFields();
  return coursesStore
    .filter((c) => c.id !== excludeId && c.status === "active")
    .map((c) => ({ value: c.id, label: `${c.code} — ${c.name}` }));
}

export function sectionsForCourse(courseId: string): CourseSection[] {
  return sectionsStore.filter((s) => s.courseId === courseId);
}
