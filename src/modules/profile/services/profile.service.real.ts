import type { ApiResponse } from "@/types/api.types";
import type {
  AccountPreferences,
  ChangePasswordInput,
  UpdateProfileInput,
  UploadAvatarInput,
  UserProfile,
} from "../types/profile.types";
import type { IProfileService } from "./profile.service";

export class RealProfileService implements IProfileService {
  async getProfile(): Promise<ApiResponse<UserProfile>> {
    throw new Error("Profile API not integrated");
  }

  async updateProfile(
    _input: UpdateProfileInput,
  ): Promise<ApiResponse<UserProfile>> {
    throw new Error("Profile API not integrated");
  }

  async uploadAvatar(
    _input: UploadAvatarInput,
  ): Promise<ApiResponse<UserProfile>> {
    throw new Error("Profile API not integrated");
  }

  async changePassword(
    _input: ChangePasswordInput,
  ): Promise<ApiResponse<null>> {
    throw new Error("Profile API not integrated");
  }

  async getPreferences(): Promise<ApiResponse<AccountPreferences>> {
    throw new Error("Profile API not integrated");
  }

  async updatePreferences(
    _input: AccountPreferences,
  ): Promise<ApiResponse<AccountPreferences>> {
    throw new Error("Profile API not integrated");
  }
}

export const realProfileService = new RealProfileService();
