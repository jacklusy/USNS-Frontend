import type { StaffDashboardRole } from "@/modules/staff/types/staff.types";
import { ROLE_DISPLAY_LABELS } from "@/constants/roles.constants";

export const STAFF_DASHBOARD_ROLES: readonly StaffDashboardRole[] = [
  "admin",
  "staff",
  "dba",
];

export const STAFF_ROLE_OPTIONS = STAFF_DASHBOARD_ROLES.map((role) => ({
  value: role,
  label: ROLE_DISPLAY_LABELS[role],
}));

export const STAFF_COPY = {
  pageTitle: "Administrative staff",
  pageDescription:
    "Manage non-academic staff linked to departments and offices.",
  createButton: "Add staff member",
  columnName: "Name",
  columnEmployeeId: "Employee ID",
  columnDepartmentOffice: "Department / office",
  columnPosition: "Position",
  columnStatus: "Status",
  fieldEmployeeId: "Employee ID",
  fieldFirstName: "First name",
  fieldLastName: "Last name",
  fieldEmail: "Email",
  fieldPhone: "Phone",
  fieldDepartment: "Department",
  fieldOffice: "Office",
  fieldPosition: "Position",
  fieldDashboardRole: "Dashboard role",
  fieldStatus: "Status",
  drawerCreateTitle: "Add staff member",
  drawerEditTitle: "Edit staff member",
  drawerViewTitle: "Staff member",
  sectionPermissions: "Access permissions",
  permissionsEmpty: "No permissions are defined for this role.",
  departmentOrOfficeHint:
    "Select a department or enter an office name (at least one is required).",
  emptyTitle: "No administrative staff yet",
  emptyDescription: "Add staff members to manage offices and access roles.",
  deleteTitle: "Delete staff member",
  deleteDescription: "This removes the staff record from the directory.",
  statusActivateTitle: "Activate staff member",
  statusDeactivateTitle: "Deactivate staff member",
  statusActivateDescription: "The member will appear as active in lists.",
  statusDeactivateDescription: "The member will be marked inactive.",
  notFoundTitle: "Staff member not found",
  notFoundDescription: "Unable to load this staff profile.",
  backToList: "Back to staff",
  createSuccess: "Staff member created",
  updateSuccess: "Staff member updated",
  deleteSuccess: "Staff member deleted",
  statusSuccess: "Status updated",
} as const;

export const STAFF_SHARED_COPY = {
  viewAction: "View",
  editAction: "Edit",
  deleteAction: "Delete",
  activateAction: "Activate",
  deactivateAction: "Deactivate",
  errorTitle: "Unable to load staff",
  errorDescription: "Check your connection and try again.",
  saveAction: "Save",
  cancelAction: "Cancel",
} as const;
