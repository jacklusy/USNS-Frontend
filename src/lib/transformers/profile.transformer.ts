import { parseApiDate, toApiTimestamp } from "@/lib/transformers/common";
import type {
  AccountPreferences,
  UserProfile,
} from "@/modules/profile/types/profile.types";
import type {
  AccountPreferencesDto,
  UserProfileDto,
} from "@/types/dto/profile.dto";

export function toUserProfile(dto: UserProfileDto): UserProfile {
  return {
    userId: dto.user_id,
    fullName: dto.full_name,
    displayName: dto.display_name,
    email: dto.email,
    role: dto.role,
    departmentName: dto.department_name,
    joinDate: toApiTimestamp(parseApiDate(dto.join_date)),
    phone: dto.phone,
    bio: dto.bio,
    avatarUrl: dto.avatar_url,
  };
}

export function toAccountPreferences(dto: AccountPreferencesDto): AccountPreferences {
  return {
    language: dto.language,
    timezone: dto.timezone,
    dateFormat: dto.date_format,
    theme: dto.theme,
  };
}

export function toUserProfileDto(profile: UserProfile): UserProfileDto {
  return {
    user_id: profile.userId,
    full_name: profile.fullName,
    display_name: profile.displayName,
    email: profile.email,
    role: profile.role,
    department_name: profile.departmentName,
    join_date: profile.joinDate,
    phone: profile.phone,
    bio: profile.bio,
    avatar_url: profile.avatarUrl,
  };
}

export function toAccountPreferencesDto(
  prefs: AccountPreferences,
): AccountPreferencesDto {
  return {
    language: prefs.language,
    timezone: prefs.timezone,
    date_format: prefs.dateFormat,
    theme: prefs.theme,
  };
}
