import {
  toAccountPreferences,
  toUserProfile,
} from "@/lib/transformers/profile.transformer";
import { get, post, put } from "@/services/api-client";
import { ENDPOINTS } from "@/services/endpoints";
import type { ApiResponse } from "@/types/api.types";
import type {
  AccountPreferencesDto,
  UserProfileDto,
} from "@/types/dto/profile.dto";
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
    const data = await get<UserProfileDto>(ENDPOINTS.profile.me);
    return { data: toUserProfile(data) };
  }

  async updateProfile(
    input: UpdateProfileInput,
  ): Promise<ApiResponse<UserProfile>> {
    const data = await put<UserProfileDto, UpdateProfileInput>(
      ENDPOINTS.profile.update,
      input,
    );
    return { data: toUserProfile(data) };
  }

  async uploadAvatar(
    input: UploadAvatarInput,
  ): Promise<ApiResponse<UserProfile>> {
    const data = await post<UserProfileDto, UploadAvatarInput>(
      ENDPOINTS.profile.avatar,
      input,
    );
    return { data: toUserProfile(data) };
  }

  async changePassword(
    input: ChangePasswordInput,
  ): Promise<ApiResponse<null>> {
    await post<null, ChangePasswordInput>(
      ENDPOINTS.profile.changePassword,
      input,
    );
    return { data: null };
  }

  async getPreferences(): Promise<ApiResponse<AccountPreferences>> {
    const data = await get<AccountPreferencesDto>(ENDPOINTS.profile.preferences);
    return { data: toAccountPreferences(data) };
  }

  async updatePreferences(
    input: AccountPreferences,
  ): Promise<ApiResponse<AccountPreferences>> {
    const data = await put<AccountPreferencesDto, AccountPreferences>(
      ENDPOINTS.profile.preferences,
      input,
    );
    return { data: toAccountPreferences(data) };
  }
}

export const realProfileService = new RealProfileService();
