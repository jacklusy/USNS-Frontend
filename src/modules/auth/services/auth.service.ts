import type { ApiResponse } from "@/types/api.types";
import type {
  ForgotPasswordInput,
  LoginCredentials,
  LoginResponse,
  ResetPasswordInput,
  AuthUser,
  ValidateResetTokenResponse,
} from "../types/auth.types";

export interface IAuthService {
  login(credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>>;
  logout(): Promise<void>;
  getMe(): Promise<ApiResponse<AuthUser>>;
  forgotPassword(input: ForgotPasswordInput): Promise<ApiResponse<null>>;
  validateResetToken(
    token: string,
  ): Promise<ApiResponse<ValidateResetTokenResponse>>;
  resetPassword(input: ResetPasswordInput): Promise<ApiResponse<null>>;
}
