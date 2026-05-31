import { parseOptionalApiDate } from "@/lib/transformers/common";
import type { UserAccountStats } from "@/modules/users/types/user-management.types";

type UserAccountStatsSeed = {
  lastLoginAt: string | null;
  loginCount: number;
  failedLoginAttempts: number;
};

const SEED_ACCOUNT_STATS_RAW: Record<string, UserAccountStatsSeed> = {
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
    loginCount: 12,
    failedLoginAttempts: 3,
  },
  usr_007: {
    lastLoginAt: "2026-05-30T14:00:00.000Z",
    loginCount: 67,
    failedLoginAttempts: 0,
  },
  usr_008: {
    lastLoginAt: "2026-05-15T08:30:00.000Z",
    loginCount: 41,
    failedLoginAttempts: 5,
  },
  usr_009: {
    lastLoginAt: "2026-05-31T05:20:00.000Z",
    loginCount: 88,
    failedLoginAttempts: 1,
  },
  usr_010: {
    lastLoginAt: "2026-05-27T16:45:00.000Z",
    loginCount: 31,
    failedLoginAttempts: 0,
  },
  usr_011: {
    lastLoginAt: "2026-04-22T10:00:00.000Z",
    loginCount: 19,
    failedLoginAttempts: 2,
  },
  usr_012: {
    lastLoginAt: "2026-05-29T09:30:00.000Z",
    loginCount: 55,
    failedLoginAttempts: 0,
  },
  usr_013: {
    lastLoginAt: "2026-05-31T08:00:00.000Z",
    loginCount: 102,
    failedLoginAttempts: 0,
  },
  usr_014: {
    lastLoginAt: "2026-05-10T12:00:00.000Z",
    loginCount: 8,
    failedLoginAttempts: 4,
  },
  usr_015: {
    lastLoginAt: "2026-05-30T11:15:00.000Z",
    loginCount: 73,
    failedLoginAttempts: 0,
  },
  usr_016: {
    lastLoginAt: "2026-03-01T07:00:00.000Z",
    loginCount: 5,
    failedLoginAttempts: 1,
  },
  usr_017: {
    lastLoginAt: "2026-05-28T13:40:00.000Z",
    loginCount: 61,
    failedLoginAttempts: 0,
  },
  usr_018: {
    lastLoginAt: "2026-05-26T15:20:00.000Z",
    loginCount: 38,
    failedLoginAttempts: 0,
  },
  usr_019: {
    lastLoginAt: "2026-05-31T06:50:00.000Z",
    loginCount: 119,
    failedLoginAttempts: 0,
  },
  usr_020: {
    lastLoginAt: "2026-01-05T10:15:00.000Z",
    loginCount: 44,
    failedLoginAttempts: 2,
  },
};

function hydrateAccountStats(seed: UserAccountStatsSeed): UserAccountStats {
  return {
    lastLoginAt: parseOptionalApiDate(seed.lastLoginAt),
    loginCount: seed.loginCount,
    failedLoginAttempts: seed.failedLoginAttempts,
  };
}

const SEED_ACCOUNT_STATS: Record<string, UserAccountStats> = Object.fromEntries(
  Object.entries(SEED_ACCOUNT_STATS_RAW).map(([userId, seed]) => [
    userId,
    hydrateAccountStats(seed),
  ]),
);

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
