import type { UserRole } from "@/types/user.types";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export interface LoginResponse {
  user: AuthUser;
  tokens: AuthTokens;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  token: string;
  password: string;
}

export type ResetPasswordTokenStatus = "valid" | "expired" | "invalid";

export interface ValidateResetTokenResponse {
  status: ResetPasswordTokenStatus;
}
