export type MailEncryption = "none" | "tls" | "ssl";
export type StorageDriver = "local" | "s3";
export type BackupFrequency = "daily" | "weekly";
export type BackupRunStatus = "success" | "failed" | "pending" | "running";
export type BackupRunType = "scheduled" | "manual";

export interface GeneralSettings {
  institutionName: string;
  supportEmail: string;
  defaultTimezone: string;
  defaultLocale: string;
}

export interface MailSettings {
  smtpHost: string;
  smtpPort: number;
  encryption: MailEncryption;
  smtpUsername: string;
  smtpPassword: string;
  fromName: string;
  fromAddress: string;
}

export interface StorageSettings {
  driver: StorageDriver;
  bucket: string;
  rootPath: string;
  maxUploadMb: number;
  secretKey: string;
}

export interface SecuritySettings {
  sessionTimeoutMinutes: number;
  minPasswordLength: number;
  lockoutAttempts: number;
  mfaRequired: boolean;
  apiRotationKey: string;
}

export interface FeatureFlagsSettings {
  announcementsEnabled: boolean;
  reportsExportEnabled: boolean;
  facultyModuleEnabled: boolean;
  staffModuleEnabled: boolean;
  academicCalendarEnabled: boolean;
  auditLogExportEnabled: boolean;
}

export interface BackupScheduleSettings {
  frequency: BackupFrequency;
  runTime: string;
  retentionDays: number;
  lastBackupAt: string | null;
  lastBackupStatus: BackupRunStatus;
  lastBackupSizeLabel: string;
}

export interface BackupHistoryEntry {
  id: string;
  startedAt: string;
  completedAt: string | null;
  type: BackupRunType;
  status: BackupRunStatus;
  sizeLabel: string;
}

export interface TriggerBackupResult {
  jobId: string;
}

export interface MaintenanceSettings {
  enabled: boolean;
  message: string;
  updatedAt: string;
}

export type UpdateMailInput = Omit<MailSettings, "smtpPassword"> & {
  smtpPassword?: string;
};

export type UpdateStorageInput = Omit<StorageSettings, "secretKey"> & {
  secretKey?: string;
};

export type UpdateSecurityInput = Omit<SecuritySettings, "apiRotationKey"> & {
  apiRotationKey?: string;
};
