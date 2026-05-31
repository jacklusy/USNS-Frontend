import type { EntityStatus } from "@/constants/status-badge.constants";
import type { DataTableRowBase } from "@/types/data-table.types";

export type FacultyRank =
  | "instructor"
  | "assistant_professor"
  | "associate_professor"
  | "professor";

export interface FacultyMember extends DataTableRowBase {
  employeeId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  departmentId: string;
  departmentName: string;
  specialization: string;
  rank: FacultyRank;
  status: EntityStatus;
  assignedCourseIds: string[];
  publicationsCount: number;
  createdAt: Date;
}

export interface FacultySemesterAssignment extends DataTableRowBase {
  courseId: string;
  courseCode: string;
  courseName: string;
  creditHours: number;
  semesterLabel: string;
}

export interface FacultyDetail {
  member: FacultyMember;
  semesterAssignments: FacultySemesterAssignment[];
  workloadCreditHours: number;
  maxCreditHours: number;
}

export interface FacultyListQueryParams {
  page: number;
  per_page: number;
  search?: string;
  departmentId?: string;
  rank?: FacultyRank;
  status?: EntityStatus;
}

export interface CreateFacultyInput {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  departmentId: string;
  specialization: string;
  rank: FacultyRank;
  status: EntityStatus;
  assignedCourseIds: string[];
  publicationsCount: number;
}

export type UpdateFacultyInput = CreateFacultyInput;

export type EntityStatusAction = "activate" | "deactivate";
