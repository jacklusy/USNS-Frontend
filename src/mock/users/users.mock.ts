import {
  managedUserDtoFromSeed,
  toManagedUser,
  toManagedUserDto,
  type ManagedUserSeedRecord,
} from "@/lib/transformers/user.transformer";
import type { ManagedUser } from "@/modules/users/types/user-management.types";
import type { ManagedUserDto } from "@/types/dto/user.dto";
import type { UserListQueryParams } from "@/modules/users/types/user-management.types";
import { matchesSearch, paginate } from "@/mock/lib/mock-query";
import type { PaginatedResponse } from "@/types/api.types";
import { UserStatus } from "@/types/user.types";
import { findDepartmentLabel } from "@/mock/academic/departments.mock";

const SEED_USERS: ManagedUserSeedRecord[] = [
  {
    id: "usr_president",
    fullName: "Dr. Layla Hassan",
    email: "president@usns.edu",
    role: "president",
    departmentId: "dept_executive",
    departmentName: "Executive Administration",
    status: UserStatus.Active,
    createdAt: "2024-01-15T10:00:00.000Z",
    forcePasswordChange: false,
  },
  {
    id: "usr_admin",
    fullName: "James Okonkwo",
    email: "admin@usns.edu",
    role: "admin",
    departmentId: "dept_it",
    departmentName: "IT",
    status: UserStatus.Active,
    createdAt: "2024-02-01T09:30:00.000Z",
    forcePasswordChange: false,
  },
  {
    id: "usr_dean",
    fullName: "Sara Mitchell",
    email: "dean@usns.edu",
    role: "dean",
    departmentId: "dept_engineering",
    departmentName: "Engineering",
    status: UserStatus.Active,
    createdAt: "2024-02-10T14:00:00.000Z",
    forcePasswordChange: false,
  },
  {
    id: "usr_dba",
    fullName: "Omar Farouk",
    email: "dba@usns.edu",
    role: "dba",
    departmentId: "dept_it",
    departmentName: "IT",
    status: UserStatus.Active,
    createdAt: "2024-03-05T11:15:00.000Z",
    forcePasswordChange: false,
  },
  {
    id: "usr_faculty",
    fullName: "Elena Vasquez",
    email: "faculty@usns.edu",
    role: "faculty",
    departmentId: "dept_computer_science",
    departmentName: "Computer Science",
    status: UserStatus.Active,
    createdAt: "2024-04-12T08:45:00.000Z",
    forcePasswordChange: true,
  },
  {
    id: "usr_006",
    fullName: "Fatima Hassan",
    email: "fatima@usns.edu",
    role: "faculty",
    departmentId: "dept_mathematics",
    departmentName: "Mathematics",
    status: UserStatus.Inactive,
    createdAt: "2024-05-20T16:20:00.000Z",
    forcePasswordChange: false,
  },
  {
    id: "usr_007",
    fullName: "Marcus Chen",
    email: "marcus@usns.edu",
    role: "staff",
    departmentId: "dept_registrar",
    departmentName: "Registrar",
    status: UserStatus.Active,
    createdAt: "2024-06-01T12:00:00.000Z",
    forcePasswordChange: false,
  },
  {
    id: "usr_008",
    fullName: "Priya Nair",
    email: "priya@usns.edu",
    role: "staff",
    departmentId: "dept_finance",
    departmentName: "Finance",
    status: UserStatus.Suspended,
    createdAt: "2024-06-18T09:10:00.000Z",
    forcePasswordChange: false,
  },
  {
    id: "usr_009",
    fullName: "Ahmed Al-Rashidi",
    email: "ahmed@usns.edu",
    role: "staff",
    departmentId: "dept_operations",
    departmentName: "Operations",
    status: UserStatus.Active,
    createdAt: "2024-07-02T13:40:00.000Z",
    forcePasswordChange: false,
  },
  {
    id: "usr_010",
    fullName: "Nina Kowalski",
    email: "nina@usns.edu",
    role: "faculty",
    departmentId: "dept_engineering",
    departmentName: "Engineering",
    status: UserStatus.Active,
    createdAt: "2024-07-15T10:05:00.000Z",
    forcePasswordChange: true,
  },
  {
    id: "usr_011",
    fullName: "David Okafor",
    email: "david@usns.edu",
    role: "admin",
    departmentId: "dept_operations",
    departmentName: "Operations",
    status: UserStatus.Inactive,
    createdAt: "2024-08-01T15:30:00.000Z",
    forcePasswordChange: false,
  },
  {
    id: "usr_012",
    fullName: "Yuki Tanaka",
    email: "yuki@usns.edu",
    role: "faculty",
    departmentId: "dept_computer_science",
    departmentName: "Computer Science",
    status: UserStatus.Active,
    createdAt: "2024-08-22T11:00:00.000Z",
    forcePasswordChange: false,
  },
  {
    id: "usr_013",
    fullName: "Rachel Brooks",
    email: "rachel@usns.edu",
    role: "staff",
    departmentId: "dept_executive",
    departmentName: "Executive Administration",
    status: UserStatus.Active,
    createdAt: "2024-09-03T09:50:00.000Z",
    forcePasswordChange: false,
  },
  {
    id: "usr_014",
    fullName: "Carlos Mendez",
    email: "carlos@usns.edu",
    role: "dean",
    departmentId: "dept_mathematics",
    departmentName: "Mathematics",
    status: UserStatus.Suspended,
    createdAt: "2024-09-14T14:25:00.000Z",
    forcePasswordChange: false,
  },
  {
    id: "usr_015",
    fullName: "Amira Saleh",
    email: "amira@usns.edu",
    role: "staff",
    departmentId: "dept_finance",
    departmentName: "Finance",
    status: UserStatus.Active,
    createdAt: "2024-10-01T08:15:00.000Z",
    forcePasswordChange: false,
  },
  {
    id: "usr_016",
    fullName: "Tom Bradley",
    email: "tom@usns.edu",
    role: "faculty",
    departmentId: "dept_engineering",
    departmentName: "Engineering",
    status: UserStatus.Inactive,
    createdAt: "2024-10-20T17:00:00.000Z",
    forcePasswordChange: false,
  },
  {
    id: "usr_017",
    fullName: "Lina Petrova",
    email: "lina@usns.edu",
    role: "staff",
    departmentId: "dept_registrar",
    departmentName: "Registrar",
    status: UserStatus.Active,
    createdAt: "2024-11-05T12:45:00.000Z",
    forcePasswordChange: true,
  },
  {
    id: "usr_018",
    fullName: "Hassan Ali",
    email: "hassan@usns.edu",
    role: "faculty",
    departmentId: "dept_mathematics",
    departmentName: "Mathematics",
    status: UserStatus.Active,
    createdAt: "2024-11-18T10:30:00.000Z",
    forcePasswordChange: false,
  },
  {
    id: "usr_019",
    fullName: "Grace Lin",
    email: "grace@usns.edu",
    role: "admin",
    departmentId: "dept_finance",
    departmentName: "Finance",
    status: UserStatus.Active,
    createdAt: "2024-12-02T09:00:00.000Z",
    forcePasswordChange: false,
  },
  {
    id: "usr_020",
    fullName: "Mohammed Rahman",
    email: "mohammed@usns.edu",
    role: "staff",
    departmentId: "dept_it",
    departmentName: "IT",
    status: UserStatus.Inactive,
    createdAt: "2025-01-10T13:15:00.000Z",
    forcePasswordChange: false,
  },
  {
    id: "usr_021",
    fullName: "Victoria Steele",
    email: "victoria@usns.edu",
    role: "president",
    departmentId: "dept_executive",
    departmentName: "Executive Administration",
    status: UserStatus.Active,
    createdAt: "2025-01-20T10:00:00.000Z",
    forcePasswordChange: false,
  },
  {
    id: "usr_022",
    fullName: "Ian Morrison",
    email: "ian@usns.edu",
    role: "dba",
    departmentId: "dept_it",
    departmentName: "IT",
    status: UserStatus.Active,
    createdAt: "2025-02-05T11:30:00.000Z",
    forcePasswordChange: false,
  },
  {
    id: "usr_023",
    fullName: "Sofia Berg",
    email: "sofia@usns.edu",
    role: "dean",
    departmentId: "dept_computer_science",
    departmentName: "Computer Science",
    status: UserStatus.Active,
    createdAt: "2025-02-18T14:45:00.000Z",
    forcePasswordChange: false,
  },
  {
    id: "usr_024",
    fullName: "Kevin Park",
    email: "kevin@usns.edu",
    role: "faculty",
    departmentId: "dept_electrical",
    departmentName: "Electrical Engineering",
    status: UserStatus.Active,
    createdAt: "2025-03-01T09:15:00.000Z",
    forcePasswordChange: false,
  },
  {
    id: "usr_025",
    fullName: "Olivia Grant",
    email: "olivia@usns.edu",
    role: "staff",
    departmentId: "dept_marketing",
    departmentName: "Marketing",
    status: UserStatus.Active,
    createdAt: "2025-03-12T08:50:00.000Z",
    forcePasswordChange: false,
  },
  {
    id: "usr_026",
    fullName: "Daniel Weiss",
    email: "daniel@usns.edu",
    role: "admin",
    departmentId: "dept_registrar",
    departmentName: "Registrar",
    status: UserStatus.Suspended,
    createdAt: "2025-03-25T16:00:00.000Z",
    forcePasswordChange: true,
  },
  {
    id: "usr_027",
    fullName: "Mei Chen",
    email: "mei@usns.edu",
    role: "faculty",
    departmentId: "dept_english",
    departmentName: "English",
    status: UserStatus.Inactive,
    createdAt: "2025-04-02T12:20:00.000Z",
    forcePasswordChange: false,
  },
  {
    id: "usr_028",
    fullName: "Robert Singh",
    email: "robert@usns.edu",
    role: "staff",
    departmentId: "dept_operations",
    departmentName: "Operations",
    status: UserStatus.Active,
    createdAt: "2025-04-15T07:40:00.000Z",
    forcePasswordChange: false,
  },
];

let usersDtoStore: ManagedUserDto[] = SEED_USERS.map(managedUserDtoFromSeed);

export function getUsersDtoStore(): ManagedUserDto[] {
  return usersDtoStore;
}

export function getUsersStore(): ManagedUser[] {
  return usersDtoStore.map(toManagedUser);
}

export function resetUsersStore(): void {
  usersDtoStore = SEED_USERS.map(managedUserDtoFromSeed);
}

export function prependUserToStore(user: ManagedUser): void {
  usersDtoStore.unshift(toManagedUserDto(user));
}

export function replaceUserInStore(user: ManagedUser): void {
  const index = usersDtoStore.findIndex((entry) => entry.id === user.id);
  if (index < 0) {
    return;
  }
  usersDtoStore[index] = toManagedUserDto(user);
}

export function removeUserFromStore(userId: string): void {
  usersDtoStore = usersDtoStore.filter((entry) => entry.id !== userId);
}

export function setUsersStore(users: ManagedUser[]): void {
  usersDtoStore = users.map(toManagedUserDto);
}

export function generateUserId(): string {
  return `usr_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function emailExistsInStore(
  email: string,
  excludeUserId?: string,
): boolean {
  const normalized = normalizeEmail(email);
  return usersDtoStore.some(
    (user) =>
      normalizeEmail(user.email) === normalized && user.id !== excludeUserId,
  );
}

export function filterUsers(
  users: ManagedUser[],
  params: UserListQueryParams,
): ManagedUser[] {
  const search = params.search?.trim().toLowerCase();

  return users.filter((user) => {
    if (
      search &&
      !matchesSearch(search, [user.fullName, user.email, user.departmentName])
    ) {
      return false;
    }

    if (params.roles && params.roles.length > 0) {
      if (!params.roles.includes(user.role)) return false;
    }

    if (params.status !== undefined && user.status !== params.status) {
      return false;
    }

    return true;
  });
}

export function paginateUsers(
  users: ManagedUser[],
  page: number,
  perPage: number,
): PaginatedResponse<ManagedUser> {
  return paginate(users, page, perPage);
}

export function withDepartmentName(
  departmentId: string,
  patch: Omit<ManagedUser, "departmentName"> & { departmentName?: string },
): ManagedUser {
  return {
    ...patch,
    departmentName: patch.departmentName ?? findDepartmentLabel(departmentId),
  };
}
