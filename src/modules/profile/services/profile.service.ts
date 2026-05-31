import type { ApiResponse } from "@/types/api.types";
import type {
  AccountPreferences,
  ChangePasswordInput,
  UpdateProfileInput,
  UploadAvatarInput,
  UserProfile,
} from "../types/profile.types";

export interface IProfileService {
  getProfile(): Promise<ApiResponse<UserProfile>>;
  updateProfile(input: UpdateProfileInput): Promise<ApiResponse<UserProfile>>;
  uploadAvatar(input: UploadAvatarInput): Promise<ApiResponse<UserProfile>>;
  changePassword(input: ChangePasswordInput): Promise<ApiResponse<null>>;
  getPreferences(): Promise<ApiResponse<AccountPreferences>>;
  updatePreferences(
    input: AccountPreferences,
  ): Promise<ApiResponse<AccountPreferences>>;
}
