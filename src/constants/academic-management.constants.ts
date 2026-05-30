import type { EntityStatus } from "@/constants/status-badge.constants";
import type { ProgramType } from "@/modules/academic/types/academic.types";
import type { SemesterType } from "@/modules/academic/types/academic.types";

export const ACADEMIC_STATUS_OPTIONS: { value: EntityStatus; label: string }[] =
  [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" },
  ];

export const PROGRAM_TYPE_OPTIONS: { value: ProgramType; label: string }[] = [
  { value: "bachelor", label: "Bachelor" },
  { value: "master", label: "Master" },
  { value: "phd", label: "PhD" },
];

export const SEMESTER_TYPE_OPTIONS: { value: SemesterType; label: string }[] = [
  { value: "fall", label: "Fall" },
  { value: "spring", label: "Spring" },
  { value: "summer", label: "Summer" },
];

export const COLLEGES_COPY = {
  pageTitle: "Colleges",
  pageDescription:
    "Manage colleges and faculties, assign deans, and review linked departments.",
  createButton: "Create college",
  createDrawerTitle: "Create college",
  createDrawerDescription: "Add a new college or faculty to the academic structure.",
  editDrawerTitle: "Edit college",
  editDrawerDescription: "Update college details, dean assignment, and status.",
  viewDrawerTitle: "View college",
  viewDrawerDescription: "Read-only college profile and status.",
  detailBack: "Back to colleges",
  fieldName: "Name",
  fieldCode: "Code",
  fieldDean: "Dean",
  fieldDescription: "Description",
  fieldStatus: "Status",
  columnDean: "Dean",
  columnDepartments: "Departments",
  columnStudents: "Students",
  columnStatus: "Status",
  linkedDepartmentsTitle: "Linked departments",
  linkedDepartmentsEmpty: "No departments are linked to this college yet.",
  deactivateTitle: "Deactivate college?",
  deactivateDescription:
    "Deactivating this college may affect linked departments. You can optionally cascade inactivation to all departments in this college.",
  deactivateCascadeLabel: "Also deactivate linked departments",
  activateTitle: "Activate college?",
  activateDescription: "This college will be marked active in the administration dashboard.",
  deleteTitle: "Delete college?",
  deleteDescription:
    "This action cannot be undone. Colleges with linked departments cannot be deleted.",
  toastCreated: "College created",
  toastUpdated: "College updated",
  toastDeleted: "College deleted",
  toastStatusUpdated: "College status updated",
  saveLabel: "Save changes",
  cancelLabel: "Cancel",
  closeLabel: "Close",
  createLabel: "Create college",
  formErrorGeneric: "Could not save the college. Review the form and try again.",
  loadErrorTitle: "Unable to load college",
  loadErrorDescription: "The college record could not be loaded. Try again.",
} as const;

export const DEPARTMENTS_COPY = {
  pageTitle: "Departments",
  pageDescription:
    "Manage academic departments, assign heads, and link them to parent colleges.",
  createButton: "Create department",
  createDrawerTitle: "Create department",
  editDrawerTitle: "Edit department",
  viewDrawerTitle: "View department",
  detailBack: "Back to departments",
  fieldName: "Name",
  fieldCode: "Code",
  fieldCollege: "College",
  fieldHead: "Head of department",
  fieldDescription: "Description",
  fieldStatus: "Status",
  filterCollege: "College",
  filterCollegePlaceholder: "All colleges",
  columnCollege: "College",
  columnHead: "Head",
  linkedCoursesTitle: "Courses",
  staffCountTitle: "Staff in department",
  staffCountDescription: "Active dashboard users assigned to this department.",
  deactivateTitle: "Deactivate department?",
  deactivateDescription: "Inactive departments are hidden from most assignment flows.",
  deleteTitle: "Delete department?",
  deleteDescription:
    "Departments with linked courses cannot be deleted.",
  toastCreated: "Department created",
  toastUpdated: "Department updated",
  toastDeleted: "Department deleted",
  toastStatusUpdated: "Department status updated",
} as const;

export const COURSES_COPY = {
  pageTitle: "Courses",
  pageDescription:
    "Manage course catalog entries, credit hours, prerequisites, and department assignment.",
  createButton: "Create course",
  createDrawerTitle: "Create course",
  editDrawerTitle: "Edit course",
  fieldCode: "Course code",
  fieldName: "Name",
  fieldCredits: "Credit hours",
  fieldDepartment: "Department",
  fieldPrerequisites: "Prerequisites",
  fieldDescription: "Description",
  fieldStatus: "Status",
  columnCredits: "Credits",
  columnDepartment: "Department",
  sectionsTitle: "Sections",
  enrollmentTitle: "Enrollment summary",
  enrollmentTotal: "Total enrolled",
  enrollmentSections: "Sections",
  toastCreated: "Course created",
  toastUpdated: "Course updated",
  toastDeleted: "Course deleted",
} as const;

export const PROGRAMS_COPY = {
  pageTitle: "Programs",
  pageDescription:
    "Manage degree programs linked to departments, including duration and curriculum courses.",
  createButton: "Create program",
  fieldType: "Program type",
  fieldDuration: "Duration (years)",
  fieldCourses: "Curriculum courses",
  columnType: "Type",
  columnDuration: "Duration",
  columnDepartment: "Department",
  enrolledTitle: "Enrolled students",
  linkedCoursesTitle: "Program courses",
  statusChangeTitle: "Change program status?",
  statusActivateDescription: "This program will be available for enrollment flows.",
  statusDeactivateDescription: "Inactive programs are hidden from new enrollments.",
  toastCreated: "Program created",
  toastUpdated: "Program updated",
  toastDeleted: "Program deleted",
  toastStatusUpdated: "Program status updated",
} as const;

export const CALENDAR_COPY = {
  pageTitle: "Academic calendar",
  pageDescription:
    "Manage academic years and semester periods, including activation and registration impact.",
  createYearButton: "Create academic year",
  createYearTitle: "Create academic year",
  fieldLabel: "Year label",
  fieldStartDate: "Start date",
  fieldEndDate: "End date",
  activeYearBadge: "Active year",
  columnSemesters: "Semesters",
  columnPeriod: "Period",
  semestersTitle: "Semesters",
  addSemesterButton: "Add semester",
  createSemesterTitle: "Create semester",
  fieldSemesterName: "Semester name",
  fieldSemesterType: "Semester type",
  activateSemesterTitle: "Activate semester?",
  activateSemesterWarning:
    "Activating this semester may affect scheduling and registrations. Other active semesters will be closed.",
  activateSemesterImpact:
    "This semester has active registrations. Proceed only if you intend to change the live academic period.",
  closeSemesterTitle: "Close semester?",
  closeSemesterWarning:
    "Closing this semester prevents new registrations for this period.",
  closeSemesterImpact:
    "This semester has active registrations and cannot be closed until registrations are cleared in the upstream system.",
  deleteYearTitle: "Delete academic year?",
  deleteYearDescription:
    "Years with linked semesters or registrations cannot be deleted.",
  toastYearCreated: "Academic year created",
  toastYearUpdated: "Academic year updated",
  toastYearDeleted: "Academic year deleted",
  toastSemesterCreated: "Semester created",
  toastSemesterUpdated: "Semester updated",
  toastSemesterActivated: "Semester activated",
  toastSemesterClosed: "Semester closed",
  toastSemesterDeleted: "Semester deleted",
} as const;

export const ACADEMIC_SHARED_COPY = {
  searchPlaceholder: "Search…",
  emptyTitle: "No records found",
  emptyDescription: "Try adjusting filters or create a new record.",
  errorTitle: "Unable to load data",
  errorDescription: "Something went wrong while loading this view.",
  retryLabel: "Try again",
  viewAction: "View",
  editAction: "Edit",
  deleteAction: "Delete",
  activateAction: "Activate",
  deactivateAction: "Deactivate",
  statusActive: "Active",
  statusInactive: "Inactive",
} as const;
