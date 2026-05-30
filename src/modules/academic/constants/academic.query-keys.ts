import type {
  CollegeListQueryParams,
  CourseListQueryParams,
  DepartmentListQueryParams,
  ProgramListQueryParams,
} from "../types/academic.types";

const academicRoot = ["academic"] as const;

export const academicQueryKeys = {
  root: academicRoot,
  colleges: {
    all: [...academicRoot, "colleges"] as const,
    list: (params: CollegeListQueryParams) =>
      [...academicRoot, "colleges", "list", params] as const,
    detail: (id: string) =>
      [...academicRoot, "colleges", "detail", id] as const,
  },
  departments: {
    all: [...academicRoot, "departments"] as const,
    list: (params: DepartmentListQueryParams) =>
      [...academicRoot, "departments", "list", params] as const,
    detail: (id: string) =>
      [...academicRoot, "departments", "detail", id] as const,
    options: [...academicRoot, "departments", "options"] as const,
  },
  programs: {
    all: [...academicRoot, "programs"] as const,
    list: (params: ProgramListQueryParams) =>
      [...academicRoot, "programs", "list", params] as const,
    detail: (id: string) =>
      [...academicRoot, "programs", "detail", id] as const,
  },
  courses: {
    all: [...academicRoot, "courses"] as const,
    list: (params: CourseListQueryParams) =>
      [...academicRoot, "courses", "list", params] as const,
    detail: (id: string) =>
      [...academicRoot, "courses", "detail", id] as const,
    options: [...academicRoot, "courses", "options"] as const,
  },
  calendar: {
    all: [...academicRoot, "calendar"] as const,
    years: [...academicRoot, "calendar", "years"] as const,
    yearDetail: (id: string) =>
      [...academicRoot, "calendar", "years", id] as const,
  },
};
