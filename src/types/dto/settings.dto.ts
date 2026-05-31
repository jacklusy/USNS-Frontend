import type { ApiTimestamp } from "@/types/dto/common.dto";
import type {
  BackupFrequency,
  BackupRunStatus,
  BackupRunType,
  MailEncryption,
  StorageDriver,
} from "@/modules/settings/types/settings.types";

export interface GeneralSettingsDto {
  institution_name: string;
  support_email: string;
  default_timezone: string;
  default_locale: string;
}

export interface MailSettingsDto {
  smtp_host: string;
  smtp_port: number;
  encryption: MailEncryption;
  smtp_username: string;
  smtp_password: string;
  from_name: string;
  from_address: string;
}

export interface StorageSettingsDto {
  driver: StorageDriver;
  bucket: string;
  root_path: string;
  max_upload_mb: number;
  secret_key: string;
}

export interface SecuritySettingsDto {
  session_timeout_minutes: number;
  min_password_length: number;
  lockout_attempts: number;
  mfa_required: boolean;
  api_rotation_key: string;
}

export interface FeatureFlagsSettingsDto {
  announcements_enabled: boolean;
  reports_export_enabled: boolean;
  faculty_module_enabled: boolean;
  staff_module_enabled: boolean;
  academic_calendar_enabled: boolean;
  audit_log_export_enabled: boolean;
}

export interface BackupScheduleSettingsDto {
  frequency: BackupFrequency;
  run_time: string;
  retention_days: number;
  last_backup_at: ApiTimestamp | null;
  last_backup_status: BackupRunStatus;
  last_backup_size_label: string;
}

export interface BackupHistoryEntryDto {
  id: string;
  started_at: ApiTimestamp;
  completed_at: ApiTimestamp | null;
  type: BackupRunType;
  status: BackupRunStatus;
  size_label: string;
}

export interface TriggerBackupResultDto {
  job_id: string;
}

export interface MaintenanceSettingsDto {
  enabled: boolean;
  message: string;
  updated_at: ApiTimestamp;
}
