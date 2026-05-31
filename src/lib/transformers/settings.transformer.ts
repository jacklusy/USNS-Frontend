import { parseApiDate, parseOptionalApiDate, toApiTimestamp } from "@/lib/transformers/common";
import type {
  BackupHistoryEntry,
  BackupScheduleSettings,
  FeatureFlagsSettings,
  GeneralSettings,
  MailSettings,
  MaintenanceSettings,
  SecuritySettings,
  StorageSettings,
  TriggerBackupResult,
} from "@/modules/settings/types/settings.types";
import type {
  BackupHistoryEntryDto,
  BackupScheduleSettingsDto,
  FeatureFlagsSettingsDto,
  GeneralSettingsDto,
  MailSettingsDto,
  MaintenanceSettingsDto,
  SecuritySettingsDto,
  StorageSettingsDto,
  TriggerBackupResultDto,
} from "@/types/dto/settings.dto";

export function toGeneralSettings(dto: GeneralSettingsDto): GeneralSettings {
  return {
    institutionName: dto.institution_name,
    supportEmail: dto.support_email,
    defaultTimezone: dto.default_timezone,
    defaultLocale: dto.default_locale,
  };
}

export function toMailSettings(dto: MailSettingsDto): MailSettings {
  return {
    smtpHost: dto.smtp_host,
    smtpPort: dto.smtp_port,
    encryption: dto.encryption,
    smtpUsername: dto.smtp_username,
    smtpPassword: dto.smtp_password,
    fromName: dto.from_name,
    fromAddress: dto.from_address,
  };
}

export function toStorageSettings(dto: StorageSettingsDto): StorageSettings {
  return {
    driver: dto.driver,
    bucket: dto.bucket,
    rootPath: dto.root_path,
    maxUploadMb: dto.max_upload_mb,
    secretKey: dto.secret_key,
  };
}

export function toSecuritySettings(dto: SecuritySettingsDto): SecuritySettings {
  return {
    sessionTimeoutMinutes: dto.session_timeout_minutes,
    minPasswordLength: dto.min_password_length,
    lockoutAttempts: dto.lockout_attempts,
    mfaRequired: dto.mfa_required,
    apiRotationKey: dto.api_rotation_key,
  };
}

export function toFeatureFlagsSettings(
  dto: FeatureFlagsSettingsDto,
): FeatureFlagsSettings {
  return {
    announcementsEnabled: dto.announcements_enabled,
    reportsExportEnabled: dto.reports_export_enabled,
    facultyModuleEnabled: dto.faculty_module_enabled,
    staffModuleEnabled: dto.staff_module_enabled,
    academicCalendarEnabled: dto.academic_calendar_enabled,
    auditLogExportEnabled: dto.audit_log_export_enabled,
  };
}

export function toBackupScheduleSettings(
  dto: BackupScheduleSettingsDto,
): BackupScheduleSettings {
  const lastBackup = parseOptionalApiDate(dto.last_backup_at);
  return {
    frequency: dto.frequency,
    runTime: dto.run_time,
    retentionDays: dto.retention_days,
    lastBackupAt: lastBackup ? toApiTimestamp(lastBackup) : null,
    lastBackupStatus: dto.last_backup_status,
    lastBackupSizeLabel: dto.last_backup_size_label,
  };
}

export function toBackupHistoryEntry(dto: BackupHistoryEntryDto): BackupHistoryEntry {
  const completed = parseOptionalApiDate(dto.completed_at);
  return {
    id: dto.id,
    startedAt: toApiTimestamp(parseApiDate(dto.started_at)),
    completedAt: completed ? toApiTimestamp(completed) : null,
    type: dto.type,
    status: dto.status,
    sizeLabel: dto.size_label,
  };
}

export function toTriggerBackupResult(dto: TriggerBackupResultDto): TriggerBackupResult {
  return { jobId: dto.job_id };
}

export function toMaintenanceSettings(dto: MaintenanceSettingsDto): MaintenanceSettings {
  return {
    enabled: dto.enabled,
    message: dto.message,
    updatedAt: toApiTimestamp(parseApiDate(dto.updated_at)),
  };
}
