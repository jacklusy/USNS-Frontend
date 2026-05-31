import { getCollegesStore } from "@/mock/academic/colleges.mock";
import { getCoursesStore } from "@/mock/academic/courses.mock";
import { getDepartmentsStore } from "@/mock/academic/departments.mock";
import { getProgramsStore } from "@/mock/academic/programs.mock";
import { getAuditLogStoreCount } from "@/mock/audit/audit-logs.mock";
import { getLoginHistoryStoreCount } from "@/mock/audit/login-history.mock";
import { getSystemEventStoreCount } from "@/mock/audit/system-events.mock";
import { getFacultyStore } from "@/mock/faculty/faculty.mock";
import { getNotificationsStoreCount } from "@/mock/notifications/notifications.mock";
import { getRolesStore } from "@/mock/roles/roles.mock";
import { getStaffStore } from "@/mock/staff/staff.mock";
import { getUsersStore } from "@/mock/users/users.mock";

export interface MockSeedStat {
  module: string;
  resource: string;
  count: number;
}

export function collectMockSeedStats(): MockSeedStat[] {
  return [
    { module: "users", resource: "users", count: getUsersStore().length },
    { module: "roles", resource: "roles", count: getRolesStore().length },
    { module: "academic", resource: "colleges", count: getCollegesStore().length },
    {
      module: "academic",
      resource: "departments",
      count: getDepartmentsStore().length,
    },
    { module: "academic", resource: "programs", count: getProgramsStore().length },
    { module: "academic", resource: "courses", count: getCoursesStore().length },
    { module: "faculty", resource: "faculty", count: getFacultyStore().length },
    { module: "staff", resource: "staff", count: getStaffStore().length },
    { module: "audit", resource: "audit_logs", count: getAuditLogStoreCount() },
    {
      module: "audit",
      resource: "login_history",
      count: getLoginHistoryStoreCount(),
    },
    {
      module: "audit",
      resource: "system_events",
      count: getSystemEventStoreCount(),
    },
    {
      module: "notifications",
      resource: "notifications",
      count: getNotificationsStoreCount(),
    },
  ];
}
