import { ROLE_DISPLAY_LABELS, USER_ROLE_VALUES } from "@/constants/roles.constants";
import { ROLE_PERMISSIONS } from "@/constants/role-permissions.constants";
import type { ManagedRole } from "@/modules/roles/types/role-management.types";
import type { RoleListQueryParams } from "@/modules/roles/types/role-management.types";
import { paginate } from "@/mock/lib/mock-query";
import { getUsersStore } from "@/mock/users/users.mock";
import type { PaginatedResponse } from "@/types/api.types";
import type { Permission } from "@/types/permission.types";
import type { UserRole } from "@/types/user.types";

function countUsersForSlug(slug: string): number {
  return getUsersStore().filter((user) => user.role === slug).length;
}

function buildSystemRoles(): ManagedRole[] {
  return USER_ROLE_VALUES.map((role) => ({
    id: `role_system_${role}`,
    slug: role,
    name: ROLE_DISPLAY_LABELS[role],
    description: `Built-in ${ROLE_DISPLAY_LABELS[role]} access for the administration dashboard.`,
    isSystem: true,
    permissions: [...ROLE_PERMISSIONS[role]],
    userCount: countUsersForSlug(role),
    createdAt: "2024-01-01T00:00:00.000Z",
  }));
}

const CUSTOM_SEED: ManagedRole[] = [
  {
    id: "role_custom_dept_lead",
    slug: "department-lead",
    name: "Department Lead",
    description:
      "Coordinates department operations with elevated academic and staff visibility.",
    isSystem: false,
    permissions: [
      "dashboard.view",
      "users.view",
      "faculty.view",
      "staff.view",
      "reports.view",
    ] as Permission[],
    userCount: 0,
    createdAt: "2025-02-15T10:00:00.000Z",
  },
  {
    id: "role_custom_auditor",
    slug: "compliance-auditor",
    name: "Compliance Auditor",
    description: "Read-only access for audit and reporting review.",
    isSystem: false,
    permissions: [
      "dashboard.view",
      "audit.view",
      "audit.export",
      "reports.view",
      "reports.export",
    ] as Permission[],
    userCount: 0,
    createdAt: "2025-03-20T14:30:00.000Z",
  },
];

const GENERATED_CUSTOM_ROLES: ManagedRole[] = [
  "Curriculum Coordinator",
  "Enrollment Analyst",
  "Faculty Affairs Specialist",
  "Finance Reviewer",
  "HR Operations",
  "IT Support Lead",
  "Library Services",
  "Marketing Coordinator",
  "Research Grants",
  "Student Success Coach",
  "Systems Integrator",
  "Teaching Assistant Admin",
].map((name, index) => {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const permissionSets: Permission[][] = [
    ["dashboard.view", "users.view", "faculty.view"],
    ["dashboard.view", "reports.view", "reports.export"],
    ["dashboard.view", "audit.view"],
    ["dashboard.view", "settings.view"],
    ["dashboard.view", "users.view", "staff.view"],
    ["dashboard.view", "academic.colleges.manage", "academic.departments.manage"],
    ["dashboard.view", "academic.courses.manage", "academic.programs.manage"],
    ["dashboard.view", "notifications.view"],
  ];
  return {
    id: `role_custom_gen_${String(index + 1).padStart(2, "0")}`,
    slug: `custom-${slug}`,
    name,
    description: `Custom role for ${name.toLowerCase()} workflows in the administration dashboard.`,
    isSystem: false,
    permissions: permissionSets[index % permissionSets.length] as Permission[],
    userCount: 0,
    createdAt: `2025-0${(index % 9) + 1}-10T10:00:00.000Z`,
  };
});

const SEED_ROLES: ManagedRole[] = [
  ...buildSystemRoles(),
  ...CUSTOM_SEED,
  ...GENERATED_CUSTOM_ROLES,
];

let rolesStore: ManagedRole[] = structuredClone(SEED_ROLES);

export function getRolesStore(): ManagedRole[] {
  return rolesStore;
}

export function resetRolesStore(): void {
  rolesStore = structuredClone(SEED_ROLES);
}

export function recomputeUserCounts(): void {
  for (const role of rolesStore) {
    if (USER_ROLE_VALUES.includes(role.slug as UserRole)) {
      role.userCount = countUsersForSlug(role.slug);
    }
  }
}

export function generateRoleId(): string {
  return `role_custom_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
}

function slugifyName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function generateUniqueSlug(name: string, excludeId?: string): string {
  const base = slugifyName(name) || "custom-role";
  let candidate = base;
  let suffix = 1;
  while (slugExists(candidate, excludeId)) {
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
  return candidate;
}

export function slugExists(slug: string, excludeId?: string): boolean {
  return rolesStore.some(
    (role) => role.slug === slug && role.id !== excludeId,
  );
}

export function nameExists(name: string, excludeId?: string): boolean {
  const normalized = name.trim().toLowerCase();
  return rolesStore.some(
    (role) =>
      role.name.trim().toLowerCase() === normalized && role.id !== excludeId,
  );
}

export function filterRolesBySearch(
  roles: ManagedRole[],
  search?: string,
): ManagedRole[] {
  const query = search?.trim().toLowerCase();
  if (!query) return roles;
  return roles.filter(
    (role) =>
      role.name.toLowerCase().includes(query) ||
      role.description.toLowerCase().includes(query) ||
      role.slug.toLowerCase().includes(query),
  );
}

export function paginateRoles(
  roles: ManagedRole[],
  page: number,
  perPage: number,
): PaginatedResponse<ManagedRole> {
  return paginate(roles, page, perPage);
}

export function findRoleById(id: string): ManagedRole | undefined {
  return rolesStore.find((role) => role.id === id);
}

export function listSystemRoleOptions(): { value: string; label: string }[] {
  return USER_ROLE_VALUES.map((role) => ({
    value: role,
    label: ROLE_DISPLAY_LABELS[role],
  }));
}

export function refreshRolesListParams(
  params: RoleListQueryParams,
): PaginatedResponse<ManagedRole> {
  recomputeUserCounts();
  const filtered = filterRolesBySearch(rolesStore, params.search);
  return paginateRoles(filtered, params.page, params.per_page);
}
