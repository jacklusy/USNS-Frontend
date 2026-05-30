import type { FacultyRank } from "@/modules/faculty/types/faculty.types";

export const ACTIVE_SEMESTER_ID = "sem_2025_fall";
export const ACTIVE_SEMESTER_LABEL = "Fall 2025";
export const FACULTY_MAX_CREDIT_HOURS = 18;

export const FACULTY_RANK_LABELS: Record<FacultyRank, string> = {
  instructor: "Instructor",
  assistant_professor: "Assistant Professor",
  associate_professor: "Associate Professor",
  professor: "Professor",
};

export const FACULTY_RANK_OPTIONS = (
  Object.entries(FACULTY_RANK_LABELS) as [FacultyRank, string][]
).map(([value, label]) => ({ value, label }));

export const FACULTY_COPY = {
  pageTitle: "Faculty",
  pageDescription:
    "Manage academic faculty members, teaching assignments, and workload.",
  createButton: "Add faculty member",
  columnName: "Name",
  columnEmployeeId: "Employee ID",
  columnDepartment: "Department",
  columnSpecialization: "Specialization",
  columnRank: "Rank",
  columnStatus: "Status",
  fieldEmployeeId: "Employee ID",
  fieldFirstName: "First name",
  fieldLastName: "Last name",
  fieldEmail: "Email",
  fieldPhone: "Phone",
  fieldDepartment: "Department",
  fieldSpecialization: "Specialization",
  fieldRank: "Academic rank",
  fieldStatus: "Status",
  fieldCourses: "Assigned courses",
  fieldPublications: "Publications count",
  drawerCreateTitle: "Add faculty member",
  drawerEditTitle: "Edit faculty member",
  drawerViewTitle: "Faculty member",
  sectionSemesterCourses: "Assigned courses this semester",
  sectionSemesterSubtitle: ACTIVE_SEMESTER_LABEL,
  sectionPublications: "Publications",
  sectionWorkload: "Teaching workload",
  workloadAssigned: "Credit hours assigned",
  workloadMax: "Maximum credit hours",
  workloadOver: "Workload exceeds recommended maximum",
  emptyTitle: "No faculty members yet",
  emptyDescription: "Add your first faculty member to manage teaching assignments.",
  deleteTitle: "Delete faculty member",
  deleteDescription:
    "This removes the faculty record from the directory. Assigned course links will be cleared.",
  statusActivateTitle: "Activate faculty member",
  statusDeactivateTitle: "Deactivate faculty member",
  statusActivateDescription: "The member will appear as active in lists and reports.",
  statusDeactivateDescription:
    "The member will be hidden from active assignment workflows.",
  notFoundTitle: "Faculty member not found",
  notFoundDescription: "Unable to load this faculty profile.",
  backToList: "Back to faculty",
  createSuccess: "Faculty member created",
  updateSuccess: "Faculty member updated",
  deleteSuccess: "Faculty member deleted",
  statusSuccess: "Status updated",
} as const;

export const FACULTY_SHARED_COPY = {
  viewAction: "View",
  editAction: "Edit",
  deleteAction: "Delete",
  activateAction: "Activate",
  deactivateAction: "Deactivate",
  errorTitle: "Unable to load faculty",
  errorDescription: "Check your connection and try again.",
  saveAction: "Save",
  cancelAction: "Cancel",
} as const;
