import type { DateFormatPreset } from "@/types/date-picker.types";
import type { UserRole } from "@/types/user.types";
import type { ThemeMode } from "@/store/ui.slice";

export interface UserProfile {
  userId: string;
  fullName: string;
  displayName: string;
  email: string;
  role: UserRole;
  departmentName: string;
  joinDate: string;
  phone: string;
  bio: string;
  avatarUrl: string | null;
}

export interface UpdateProfileInput {
  displayName: string;
  phone: string;
  bio: string;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export interface AccountPreferences {
  language: string;
  timezone: string;
  dateFormat: DateFormatPreset;
  theme: ThemeMode;
}

export interface UploadAvatarInput {
  dataUrl: string;
}
