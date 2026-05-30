import type { EntityStatus } from "@/constants/status-badge.constants";
import type { DataTableRowBase } from "@/types/data-table.types";

export type ProgramType = "bachelor" | "master" | "phd";
export type SemesterType = "fall" | "spring" | "summer";
export type SemesterStatus = "draft" | "active" | "closed";

export interface College extends DataTableRowBase {
  code: string;
  name: string;
  description: string;
  deanUserId: string;
  deanName: string;
  status: EntityStatus;
  departmentCount: number;
  studentCount: number;
  createdAt: string;
}

export interface Department extends DataTableRowBase {
  code: string;
  name: string;
  collegeId: string;
  collegeName: string;
  headUserId: string;
  headName: string;
  description: string;
  status: EntityStatus;
  courseCount: number;
  staffCount: number;
  createdAt: string;
}

export interface DepartmentOption {
  value: string;
  label: string;
}

export interface Program extends DataTableRowBase {
  code: string;
  name: string;
  type: ProgramType;
  departmentId: string;
  departmentName: string;
  durationYears: number;
  description: string;
  status: EntityStatus;
  enrolledCount: number;
  courseCount: number;
  courseIds: string[];
  createdAt: string;
}

export interface Course extends DataTableRowBase {
  code: string;
  name: string;
  creditHours: number;
  departmentId: string;
  departmentName: string;
  description: string;
  prerequisiteIds: string[];
  status: EntityStatus;
  sectionCount: number;
  enrollmentCount: number;
  programIds: string[];
  createdAt: string;
}

export interface CourseSection {
  id: string;
  courseId: string;
  termLabel: string;
  capacity: number;
  enrolled: number;
}

export interface AcademicYear extends DataTableRowBase {
  label: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  semesterCount: number;
  hasLinkedData: boolean;
  createdAt: string;
}

export interface Semester extends DataTableRowBase {
  academicYearId: string;
  name: string;
  type: SemesterType;
  startDate: string;
  endDate: string;
  status: SemesterStatus;
  activeRegistrationCount: number;
}

export interface CollegeListQueryParams {
  page: number;
  per_page: number;
  search?: string;
  status?: EntityStatus;
}

export interface DepartmentListQueryParams {
  page: number;
  per_page: number;
  search?: string;
  collegeId?: string;
  status?: EntityStatus;
}

export interface ProgramListQueryParams {
  page: number;
  per_page: number;
  search?: string;
  departmentId?: string;
  status?: EntityStatus;
}

export interface CourseListQueryParams {
  page: number;
  per_page: number;
  search?: string;
  departmentId?: string;
  status?: EntityStatus;
}

export interface CreateCollegeInput {
  code: string;
  name: string;
  description: string;
  deanUserId: string;
  status: EntityStatus;
}

export interface UpdateCollegeInput extends CreateCollegeInput {}

export interface CreateDepartmentInput {
  code: string;
  name: string;
  collegeId: string;
  headUserId: string;
  description: string;
  status: EntityStatus;
}

export interface UpdateDepartmentInput extends CreateDepartmentInput {}

export interface CreateProgramInput {
  code: string;
  name: string;
  type: ProgramType;
  departmentId: string;
  durationYears: number;
  description: string;
  status: EntityStatus;
  courseIds: string[];
}

export interface UpdateProgramInput extends CreateProgramInput {}

export interface CreateCourseInput {
  code: string;
  name: string;
  creditHours: number;
  departmentId: string;
  description: string;
  prerequisiteIds: string[];
  status: EntityStatus;
}

export interface UpdateCourseInput extends CreateCourseInput {}

export interface CreateAcademicYearInput {
  label: string;
  startDate: string;
  endDate: string;
}

export interface UpdateAcademicYearInput extends CreateAcademicYearInput {}

export interface CreateSemesterInput {
  academicYearId: string;
  name: string;
  type: SemesterType;
  startDate: string;
  endDate: string;
}

export interface UpdateSemesterInput {
  name: string;
  type: SemesterType;
  startDate: string;
  endDate: string;
}

export interface CollegeDetail {
  college: College;
  departments: Department[];
}

export interface DepartmentDetail {
  department: Department;
  courses: Course[];
}

export interface ProgramDetail {
  program: Program;
  courses: Course[];
}

export interface CourseDetail {
  course: Course;
  sections: CourseSection[];
}

export interface AcademicYearDetail {
  year: AcademicYear;
  semesters: Semester[];
}

export type EntityStatusAction = "activate" | "deactivate";
