import type { ApiTimestamp } from "@/types/dto/common.dto";
import type { DateFormatPreset } from "@/types/date-picker.types";
import type { ThemeMode } from "@/store/ui.slice";
import type { UserRole } from "@/types/user.types";

export interface UserProfileDto {
  user_id: string;
  full_name: string;
  display_name: string;
  email: string;
  role: UserRole;
  department_name: string;
  join_date: ApiTimestamp;
  phone: string;
  bio: string;
  avatar_url: string | null;
}

export interface AccountPreferencesDto {
  language: string;
  timezone: string;
  date_format: DateFormatPreset;
  theme: ThemeMode;
}
