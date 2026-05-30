import type {
  AuthUser,
  LoginResponse,
  ValidateResetTokenResponse,
} from "@/modules/auth/types/auth.types";
import type { ApiResponse } from "@/types/api.types";

export interface MockAuthRecord {
  password: string;
  user: AuthUser;
}

export const MOCK_AUTH_USERS: Record<string, MockAuthRecord> = {
  "president@usns.edu": {
    password: "Password1!",
    user: {
      id: "usr_president",
      name: "Dr. Layla Hassan",
      email: "president@usns.edu",
      role: "president",
    },
  },
  "admin@usns.edu": {
    password: "Password1!",
    user: {
      id: "usr_admin",
      name: "James Okonkwo",
      email: "admin@usns.edu",
      role: "admin",
    },
  },
  "dean@usns.edu": {
    password: "Password1!",
    user: {
      id: "usr_dean",
      name: "Sara Mitchell",
      email: "dean@usns.edu",
      role: "dean",
    },
  },
  "dba@usns.edu": {
    password: "Password1!",
    user: {
      id: "usr_dba",
      name: "Omar Farouk",
      email: "dba@usns.edu",
      role: "dba",
    },
  },
  "faculty@usns.edu": {
    password: "Password1!",
    user: {
      id: "usr_faculty",
      name: "Elena Vasquez",
      email: "faculty@usns.edu",
      role: "faculty",
    },
  },
};

export const MOCK_RESET_TOKENS: Record<string, ValidateResetTokenResponse> = {
  valid_reset_token: { status: "valid" },
  expired_reset_token: { status: "expired" },
};

export const MOCK_ACCESS_TOKEN_PREFIX = "mock_access_";
export const MOCK_REFRESH_TOKEN_PREFIX = "mock_refresh_";

export function buildMockLoginResponse(user: AuthUser): ApiResponse<LoginResponse> {
  return {
    data: {
      user,
      tokens: {
        access_token: `${MOCK_ACCESS_TOKEN_PREFIX}${user.id}`,
        refresh_token: `${MOCK_REFRESH_TOKEN_PREFIX}${user.id}`,
      },
    },
  };
}
