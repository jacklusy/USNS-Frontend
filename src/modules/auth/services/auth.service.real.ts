import { get, post } from "@/services/api-client";
import { ENDPOINTS } from "@/services/endpoints";
import type { ApiResponse } from "@/types/api.types";
import type {
  AuthUser,
  ForgotPasswordInput,
  LoginCredentials,
  LoginResponse,
  ResetPasswordInput,
  ValidateResetTokenResponse,
} from "../types/auth.types";
import type { IAuthService } from "./auth.service";

export class RealAuthService implements IAuthService {
  async login(
    credentials: LoginCredentials,
  ): Promise<ApiResponse<LoginResponse>> {
    const data = await post<LoginResponse>(ENDPOINTS.auth.login, credentials);
    return { data };
  }

  async logout(): Promise<void> {
    await post<void>(ENDPOINTS.auth.logout);
  }

  async getMe(): Promise<ApiResponse<AuthUser>> {
    const data = await get<AuthUser>(ENDPOINTS.auth.me);
    return { data };
  }

  async forgotPassword(
    input: ForgotPasswordInput,
  ): Promise<ApiResponse<null>> {
    await post<null>(ENDPOINTS.auth.forgotPassword, input);
    return { data: null };
  }

  async validateResetToken(
    token: string,
  ): Promise<ApiResponse<ValidateResetTokenResponse>> {
    const data = await post<ValidateResetTokenResponse>(
      ENDPOINTS.auth.resetPassword,
      { token, action: "validate" },
    );
    return { data };
  }

  async resetPassword(
    input: ResetPasswordInput,
  ): Promise<ApiResponse<null>> {
    await post<null>(ENDPOINTS.auth.resetPassword, input);
    return { data: null };
  }
}

export const realAuthService = new RealAuthService();
