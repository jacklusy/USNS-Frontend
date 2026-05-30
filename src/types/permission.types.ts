export const PERMISSIONS = {
  users: {
    view: "users.view",
    create: "users.create",
    edit: "users.edit",
    delete: "users.delete",
  },
  roles: {
    view: "roles.view",
    manage: "roles.manage",
  },
  dashboard: {
    view: "dashboard.view",
  },
  reports: {
    view: "reports.view",
    export: "reports.export",
  },
  academic: {
    collegesManage: "academic.colleges.manage",
    departmentsManage: "academic.departments.manage",
    programsManage: "academic.programs.manage",
    coursesManage: "academic.courses.manage",
  },
  faculty: {
    view: "faculty.view",
    manage: "faculty.manage",
  },
  staff: {
    view: "staff.view",
    manage: "staff.manage",
  },
  settings: {
    view: "settings.view",
    manage: "settings.manage",
  },
  notifications: {
    view: "notifications.view",
    manage: "notifications.manage",
  },
  audit: {
    view: "audit.view",
    export: "audit.export",
  },
} as const;

type PermissionLeaf<T> = T extends string
  ? T
  : { [K in keyof T]: PermissionLeaf<T[K]> }[keyof T];

export type Permission = PermissionLeaf<typeof PERMISSIONS>;
