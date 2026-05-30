import type {
  UserAuditActionType,
  UserAuditEntry,
} from "@/modules/users/types/user-audit.types";
import type { UserActivityQueryParams } from "@/modules/users/types/user-audit.types";
import type { PaginatedResponse } from "@/types/api.types";

const SEED_AUDIT: UserAuditEntry[] = [
  {
    id: "audit_001",
    userId: "usr_006",
    actorName: "James Okonkwo",
    action: "deactivated",
    actionType: "status_changed",
    description: "Account deactivated by administrator",
    createdAt: "2026-05-28T10:00:00.000Z",
  },
  {
    id: "audit_002",
    userId: "usr_006",
    actorName: "James Okonkwo",
    action: "updated",
    actionType: "updated",
    description: "Profile details updated",
    createdAt: "2026-05-20T14:30:00.000Z",
  },
  {
    id: "audit_003",
    userId: "usr_008",
    actorName: "Dr. Layla Hassan",
    action: "suspended",
    actionType: "status_changed",
    description: "Account suspended pending review",
    createdAt: "2026-05-25T09:15:00.000Z",
  },
  {
    id: "audit_004",
    userId: "usr_admin",
    actorName: "Omar Farouk",
    action: "login",
    actionType: "login",
    description: "Successful sign-in from dashboard",
    createdAt: "2026-05-31T07:45:00.000Z",
  },
  {
    id: "audit_005",
    userId: "usr_president",
    actorName: "Dr. Layla Hassan",
    action: "viewed",
    actionType: "viewed",
    description: "Viewed executive dashboard overview",
    createdAt: "2026-05-30T08:12:00.000Z",
  },
  {
    id: "audit_006",
    userId: "usr_faculty",
    actorName: "James Okonkwo",
    action: "created",
    actionType: "created",
    description: "User account provisioned",
    createdAt: "2024-04-12T08:45:00.000Z",
  },
  {
    id: "audit_007",
    userId: "usr_014",
    actorName: "James Okonkwo",
    action: "suspended",
    actionType: "status_changed",
    description: "Account suspended by administrator",
    createdAt: "2026-05-22T11:00:00.000Z",
  },
];

let auditStore: UserAuditEntry[] = structuredClone(SEED_AUDIT);

export function getUserAuditStore(): UserAuditEntry[] {
  return auditStore;
}

export function resetUserAuditStore(): void {
  auditStore = structuredClone(SEED_AUDIT);
}

export function appendUserAuditEntry(entry: Omit<UserAuditEntry, "id" | "createdAt">): UserAuditEntry {
  const record: UserAuditEntry = {
    ...entry,
    id: `audit_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    createdAt: new Date().toISOString(),
  };
  auditStore.unshift(record);
  return record;
}

export function listUserAuditEntries(
  userId: string,
  params: UserActivityQueryParams = {},
): PaginatedResponse<UserAuditEntry> {
  const perPage = params.per_page ?? 10;
  const page = params.page ?? 1;
  const filtered = auditStore
    .filter((entry) => entry.userId === userId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  const lastPage = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(Math.max(1, page), lastPage);
  const start = (safePage - 1) * perPage;

  return {
    data: filtered.slice(start, start + perPage),
    meta: {
      total: filtered.length,
      page: safePage,
      per_page: perPage,
      last_page: lastPage,
    },
  };
}

export function buildStatusAuditDescription(
  action: string,
  targetName: string,
): string {
  if (action === "activated") {
    return `${targetName} was activated and can sign in again`;
  }
  if (action === "deactivated") {
    return `${targetName} was deactivated and cannot sign in`;
  }
  if (action === "suspended") {
    return `${targetName} was suspended pending administrative review`;
  }
  return `Status changed for ${targetName}`;
}

export function statusActionToAuditAction(
  action: "activate" | "deactivate" | "suspend",
): string {
  if (action === "activate") return "activated";
  if (action === "deactivate") return "deactivated";
  return "suspended";
}

export function statusActionToAuditType(): UserAuditActionType {
  return "status_changed";
}
