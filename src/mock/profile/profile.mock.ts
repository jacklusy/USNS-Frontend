import { MOCK_AUTH_USERS } from "@/mock/auth/auth.mock";
import type {
  AccountPreferences,
  ChangePasswordInput,
  UpdateProfileInput,
  UserProfile,
} from "@/modules/profile/types/profile.types";
import type { AppError } from "@/types/error.types";
import { MOCK_ACCESS_TOKEN_PREFIX } from "@/mock/auth/auth.mock";
import { tokenStorage } from "@/utils/token-storage";

interface ProfileStoreEntry {
  profile: UserProfile;
  preferences: AccountPreferences;
}

const DEFAULT_PREFERENCES: AccountPreferences = {
  language: "en-US",
  timezone: "America/New_York",
  dateFormat: "medium",
  theme: "light",
};

const SEED_PROFILES: Record<string, Omit<UserProfile, "userId">> = {
  usr_president: {
    fullName: "Dr. Layla Hassan",
    displayName: "Dr. Layla Hassan",
    email: "president@usns.edu",
    role: "president",
    departmentName: "Executive Administration",
    joinDate: "2020-08-15T00:00:00.000Z",
    phone: "+1 (555) 010-1000",
    bio: "Institutional leadership and strategic planning.",
    avatarUrl: null,
  },
  usr_admin: {
    fullName: "James Okonkwo",
    displayName: "James Okonkwo",
    email: "admin@usns.edu",
    role: "admin",
    departmentName: "Information Technology",
    joinDate: "2021-03-01T00:00:00.000Z",
    phone: "+1 (555) 010-2000",
    bio: "Campus systems and user administration.",
    avatarUrl: null,
  },
  usr_dean: {
    fullName: "Sara Mitchell",
    displayName: "Sara Mitchell",
    email: "dean@usns.edu",
    role: "dean",
    departmentName: "College of Engineering",
    joinDate: "2019-09-01T00:00:00.000Z",
    phone: "+1 (555) 010-3000",
    bio: "Academic programs and faculty affairs.",
    avatarUrl: null,
  },
  usr_dba: {
    fullName: "Omar Farouk",
    displayName: "Omar Farouk",
    email: "dba@usns.edu",
    role: "dba",
    departmentName: "Information Technology",
    joinDate: "2018-01-10T00:00:00.000Z",
    phone: "+1 (555) 010-4000",
    bio: "Database operations and infrastructure.",
    avatarUrl: null,
  },
  usr_faculty: {
    fullName: "Elena Vasquez",
    displayName: "Elena Vasquez",
    email: "faculty@usns.edu",
    role: "faculty",
    departmentName: "Computer Science",
    joinDate: "2022-08-20T00:00:00.000Z",
    phone: "+1 (555) 010-5000",
    bio: "Teaching and research in computing.",
    avatarUrl: null,
  },
};

let profileStore: Record<string, ProfileStoreEntry> = buildInitialStore();

function buildInitialStore(): Record<string, ProfileStoreEntry> {
  const store: Record<string, ProfileStoreEntry> = {};
  for (const [userId, seed] of Object.entries(SEED_PROFILES)) {
    store[userId] = {
      profile: { userId, ...structuredClone(seed) },
      preferences: structuredClone(DEFAULT_PREFERENCES),
    };
  }
  return store;
}

function unauthorized(message: string): AppError {
  return { code: "UNAUTHORIZED", message };
}

function validationError(
  message: string,
  details: Record<string, string[]>,
): AppError {
  return { code: "VALIDATION_ERROR", message, details };
}

export function resolveSessionUserId(): string {
  const accessToken = tokenStorage.getAccessToken();
  if (!accessToken) {
    throw unauthorized("Session expired. Please sign in again.");
  }
  const userId = accessToken.replace(MOCK_ACCESS_TOKEN_PREFIX, "");
  if (!profileStore[userId]) {
    throw unauthorized("Session expired. Please sign in again.");
  }
  return userId;
}

export function getProfileFromStore(userId: string): UserProfile {
  const entry = profileStore[userId];
  if (!entry) {
    throw unauthorized("Profile not found.");
  }
  return structuredClone(entry.profile);
}

export function updateProfileInStore(
  userId: string,
  input: UpdateProfileInput,
): UserProfile {
  const entry = profileStore[userId];
  if (!entry) {
    throw unauthorized("Profile not found.");
  }
  entry.profile = {
    ...entry.profile,
    displayName: input.displayName.trim(),
    phone: input.phone.trim(),
    bio: input.bio.trim(),
  };
  return structuredClone(entry.profile);
}

export function updateAvatarInStore(
  userId: string,
  dataUrl: string,
): UserProfile {
  const entry = profileStore[userId];
  if (!entry) {
    throw unauthorized("Profile not found.");
  }
  entry.profile = {
    ...entry.profile,
    avatarUrl: dataUrl,
  };
  return structuredClone(entry.profile);
}

export function changePasswordInStore(
  userId: string,
  input: ChangePasswordInput,
): void {
  const authRecord = Object.values(MOCK_AUTH_USERS).find(
    (record) => record.user.id === userId,
  );
  if (!authRecord) {
    throw unauthorized("Session expired. Please sign in again.");
  }
  if (authRecord.password !== input.currentPassword) {
    throw validationError("Current password is incorrect.", {
      currentPassword: ["Current password is incorrect."],
    });
  }
  authRecord.password = input.newPassword;
}

export function getPreferencesFromStore(userId: string): AccountPreferences {
  const entry = profileStore[userId];
  if (!entry) {
    throw unauthorized("Profile not found.");
  }
  return structuredClone(entry.preferences);
}

export function updatePreferencesInStore(
  userId: string,
  preferences: AccountPreferences,
): AccountPreferences {
  const entry = profileStore[userId];
  if (!entry) {
    throw unauthorized("Profile not found.");
  }
  entry.preferences = structuredClone(preferences);
  return structuredClone(entry.preferences);
}
