import { MockServiceBase } from "@/lib/mock-service-base";
import {
  DEMO_ACCESS_TOKEN_SESSION_EXPIRED,
  DEMO_REFRESH_TOKEN_SESSION_EXPIRED,
} from "@/constants/auth-tokens.constants";
import {
  MOCK_AUTH_USERS,
  MOCK_ACCESS_TOKEN_PREFIX,
  MOCK_REFRESH_TOKEN_PREFIX,
  MOCK_RESET_TOKENS,
  buildMockLoginResponse,
} from "@/mock/auth/auth.mock";
import type { ApiResponse } from "@/types/api.types";
import type { AppError } from "@/types/error.types";
import { tokenStorage } from "@/utils/token-storage";
import type {
  AuthTokens,
  AuthUser,
  ForgotPasswordInput,
  LoginCredentials,
  LoginResponse,
  ResetPasswordInput,
  ValidateResetTokenResponse,
} from "../types/auth.types";
import type { IAuthService } from "./auth.service";

function unauthorized(message: string): AppError {
  return {
    code: "UNAUTHORIZED",
    message,
  };
}

function notFound(message: string): AppError {
  return {
    code: "NOT_FOUND",
    message,
  };
}

export class MockAuthService extends MockServiceBase implements IAuthService {
  async login(
    credentials: LoginCredentials,
  ): Promise<ApiResponse<LoginResponse>> {
    await this.delay(300);
    const email = credentials.email.trim().toLowerCase();
    const record = MOCK_AUTH_USERS[email];
    if (!record || record.password !== credentials.password) {
      throw unauthorized("Invalid email or password. Please try again.");
    }
    return buildMockLoginResponse(record.user);
  }

  async logout(): Promise<void> {
    await this.delay(150);
    tokenStorage.clearTokens();
  }

  async refreshTokens(refreshToken: string): Promise<ApiResponse<AuthTokens>> {
    await this.delay(250);
    if (refreshToken === DEMO_REFRESH_TOKEN_SESSION_EXPIRED) {
      throw unauthorized("Session expired. Please sign in again.");
    }
    const userId = refreshToken.replace(MOCK_REFRESH_TOKEN_PREFIX, "");
    const user = Object.values(MOCK_AUTH_USERS).find(
      (record) => record.user.id === userId,
    )?.user;
    if (!user) {
      throw unauthorized("Session expired. Please sign in again.");
    }
    return {
      data: {
        access_token: `${MOCK_ACCESS_TOKEN_PREFIX}${user.id}`,
        refresh_token: `${MOCK_REFRESH_TOKEN_PREFIX}${user.id}`,
      },
    };
  }

  async getMe(): Promise<ApiResponse<AuthUser>> {
    await this.delay(200);
    const accessToken = tokenStorage.getAccessToken();
    if (!accessToken) {
      throw unauthorized("Session expired. Please sign in again.");
    }
    if (accessToken === DEMO_ACCESS_TOKEN_SESSION_EXPIRED) {
      throw unauthorized("Session expired. Please sign in again.");
    }
    const userId = accessToken.replace(MOCK_ACCESS_TOKEN_PREFIX, "");
    const user = Object.values(MOCK_AUTH_USERS).find(
      (record) => record.user.id === userId,
    )?.user;
    if (!user) {
      throw unauthorized("Session expired. Please sign in again.");
    }
    return { data: user };
  }

  async forgotPassword(
    input: ForgotPasswordInput,
  ): Promise<ApiResponse<null>> {
    await this.delay(400);
    const email = input.email.trim().toLowerCase();
    if (!MOCK_AUTH_USERS[email]) {
      throw notFound(
        "We could not find an account with that email address. Please check and try again.",
      );
    }
    return { data: null, message: "Reset instructions sent." };
  }

  async validateResetToken(
    token: string,
  ): Promise<ApiResponse<ValidateResetTokenResponse>> {
    await this.delay(250);
    const status = MOCK_RESET_TOKENS[token]?.status ?? "invalid";
    return { data: { status } };
  }

  async resetPassword(input: ResetPasswordInput): Promise<ApiResponse<null>> {
    await this.delay(350);
    const validation = MOCK_RESET_TOKENS[input.token];
    if (!validation || validation.status !== "valid") {
      throw unauthorized(
        "This reset link is invalid or has expired. Request a new link from the sign-in page.",
      );
    }
    const record = Object.values(MOCK_AUTH_USERS)[0];
    if (record) {
      record.password = input.password;
    }
    return { data: null, message: "Password updated." };
  }
}

export const mockAuthService = new MockAuthService();
