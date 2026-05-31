import { MockServiceBase } from "@/lib/mock-service-base";
import {
  changePasswordInStore,
  getPreferencesFromStore,
  getProfileFromStore,
  resolveSessionUserId,
  updateAvatarInStore,
  updatePreferencesInStore,
  updateProfileInStore,
} from "@/mock/profile/profile.mock";
import type { ApiResponse } from "@/types/api.types";
import type {
  AccountPreferences,
  ChangePasswordInput,
  UpdateProfileInput,
  UploadAvatarInput,
  UserProfile,
} from "../types/profile.types";
import type { IProfileService } from "./profile.service";

export class MockProfileService extends MockServiceBase implements IProfileService {
  async getProfile(): Promise<ApiResponse<UserProfile>> {
    await this.delay();
    const userId = resolveSessionUserId();
    return { data: getProfileFromStore(userId) };
  }

  async updateProfile(
    input: UpdateProfileInput,
  ): Promise<ApiResponse<UserProfile>> {
    await this.delay();
    const userId = resolveSessionUserId();
    return { data: updateProfileInStore(userId, input) };
  }

  async uploadAvatar(
    input: UploadAvatarInput,
  ): Promise<ApiResponse<UserProfile>> {
    await this.delay();
    const userId = resolveSessionUserId();
    return { data: updateAvatarInStore(userId, input.dataUrl) };
  }

  async changePassword(
    input: ChangePasswordInput,
  ): Promise<ApiResponse<null>> {
    await this.delay();
    const userId = resolveSessionUserId();
    changePasswordInStore(userId, input);
    return { data: null, message: "Password updated." };
  }

  async getPreferences(): Promise<ApiResponse<AccountPreferences>> {
    await this.delay();
    const userId = resolveSessionUserId();
    return { data: getPreferencesFromStore(userId) };
  }

  async updatePreferences(
    input: AccountPreferences,
  ): Promise<ApiResponse<AccountPreferences>> {
    await this.delay();
    const userId = resolveSessionUserId();
    return { data: updatePreferencesInStore(userId, input) };
  }
}

export const mockProfileService = new MockProfileService();
