import { ROLE_DISPLAY_LABELS, USER_ROLE_VALUES } from "@/constants/roles.constants";
import { ROLE_PERMISSIONS } from "@/constants/role-permissions.constants";
import type { ManagedRole } from "@/modules/roles/types/role-management.types";
import type { RoleListQueryParams } from "@/modules/roles/types/role-management.types";
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

const SEED_ROLES: ManagedRole[] = [...buildSystemRoles(), ...CUSTOM_SEED];

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
  const lastPage = Math.max(1, Math.ceil(roles.length / perPage));
  const safePage = Math.min(Math.max(1, page), lastPage);
  const start = (safePage - 1) * perPage;
  return {
    data: roles.slice(start, start + perPage),
    meta: {
      total: roles.length,
      page: safePage,
      per_page: perPage,
      last_page: lastPage,
    },
  };
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
