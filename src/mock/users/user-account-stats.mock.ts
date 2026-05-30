import type { UserAccountStats } from "@/modules/users/types/user-management.types";

const SEED_ACCOUNT_STATS: Record<string, UserAccountStats> = {
  usr_president: {
    lastLoginAt: "2026-05-30T08:12:00.000Z",
    loginCount: 412,
    failedLoginAttempts: 0,
  },
  usr_admin: {
    lastLoginAt: "2026-05-31T07:45:00.000Z",
    loginCount: 287,
    failedLoginAttempts: 1,
  },
  usr_dean: {
    lastLoginAt: "2026-05-29T16:20:00.000Z",
    loginCount: 156,
    failedLoginAttempts: 0,
  },
  usr_dba: {
    lastLoginAt: "2026-05-31T06:30:00.000Z",
    loginCount: 523,
    failedLoginAttempts: 2,
  },
  usr_faculty: {
    lastLoginAt: "2026-05-28T11:05:00.000Z",
    loginCount: 94,
    failedLoginAttempts: 0,
  },
  usr_006: {
    lastLoginAt: "2026-04-10T09:00:00.000Z",
    loginCount: 48,
    failedLoginAttempts: 3,
  },
  usr_007: {
    lastLoginAt: "2026-05-30T14:22:00.000Z",
    loginCount: 201,
    failedLoginAttempts: 0,
  },
  usr_008: {
    lastLoginAt: "2026-05-15T10:00:00.000Z",
    loginCount: 67,
    failedLoginAttempts: 5,
  },
  usr_009: {
    lastLoginAt: "2026-05-31T05:18:00.000Z",
    loginCount: 178,
    failedLoginAttempts: 0,
  },
  usr_010: {
    lastLoginAt: "2026-05-27T13:40:00.000Z",
    loginCount: 112,
    failedLoginAttempts: 1,
  },
  usr_011: {
    lastLoginAt: "2026-03-01T08:00:00.000Z",
    loginCount: 89,
    failedLoginAttempts: 0,
  },
  usr_012: {
    lastLoginAt: "2026-05-29T09:55:00.000Z",
    loginCount: 134,
    failedLoginAttempts: 0,
  },
  usr_013: {
    lastLoginAt: "2026-05-30T12:10:00.000Z",
    loginCount: 245,
    failedLoginAttempts: 0,
  },
  usr_014: {
    lastLoginAt: "2026-05-20T15:30:00.000Z",
    loginCount: 76,
    failedLoginAttempts: 4,
  },
  usr_015: {
    lastLoginAt: "2026-05-31T04:50:00.000Z",
    loginCount: 198,
    failedLoginAttempts: 0,
  },
  usr_016: {
    lastLoginAt: "2026-02-14T11:00:00.000Z",
    loginCount: 31,
    failedLoginAttempts: 0,
  },
  usr_017: {
    lastLoginAt: "2026-05-30T18:05:00.000Z",
    loginCount: 167,
    failedLoginAttempts: 0,
  },
  usr_018: {
    lastLoginAt: "2026-05-28T07:30:00.000Z",
    loginCount: 102,
    failedLoginAttempts: 1,
  },
  usr_019: {
    lastLoginAt: "2026-05-31T08:00:00.000Z",
    loginCount: 221,
    failedLoginAttempts: 0,
  },
  usr_020: {
    lastLoginAt: "2026-01-05T10:15:00.000Z",
    loginCount: 44,
    failedLoginAttempts: 2,
  },
};

const DEFAULT_STATS: UserAccountStats = {
  lastLoginAt: null,
  loginCount: 0,
  failedLoginAttempts: 0,
};

let accountStatsStore: Record<string, UserAccountStats> = structuredClone(
  SEED_ACCOUNT_STATS,
);

export function getAccountStatsForUser(userId: string): UserAccountStats {
  return (
    accountStatsStore[userId] ?? {
      ...DEFAULT_STATS,
    }
  );
}

export function resetAccountStatsStore(): void {
  accountStatsStore = structuredClone(SEED_ACCOUNT_STATS);
}

export function seedAccountStatsForUser(userId: string): UserAccountStats {
  const stats: UserAccountStats = {
    lastLoginAt: null,
    loginCount: 0,
    failedLoginAttempts: 0,
  };
  accountStatsStore[userId] = stats;
  return stats;
}
