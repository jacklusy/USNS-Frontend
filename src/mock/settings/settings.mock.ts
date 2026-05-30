import { MASKED_SECRET_VALUE } from "@/constants/settings-management.constants";
import type {
  BackupHistoryEntry,
  BackupScheduleSettings,
  FeatureFlagsSettings,
  GeneralSettings,
  MailSettings,
  MaintenanceSettings,
  SecuritySettings,
  StorageSettings,
} from "@/modules/settings/types/settings.types";

const SECRET_PLACEHOLDER = MASKED_SECRET_VALUE;

interface SettingsStore {
  general: GeneralSettings;
  mail: MailSettings & { smtpPasswordPlain: string };
  storage: StorageSettings & { secretKeyPlain: string };
  security: SecuritySettings & { apiRotationKeyPlain: string };
  features: FeatureFlagsSettings;
  backup: BackupScheduleSettings;
  backupHistory: BackupHistoryEntry[];
  maintenance: MaintenanceSettings;
}

const SEED_STORE: SettingsStore = {
  general: {
    institutionName: "USNS University",
    supportEmail: "support@usns.edu",
    defaultTimezone: "America/New_York",
    defaultLocale: "en-US",
  },
  mail: {
    smtpHost: "smtp.usns.edu",
    smtpPort: 587,
    encryption: "tls",
    smtpUsername: "noreply@usns.edu",
    smtpPassword: SECRET_PLACEHOLDER,
    smtpPasswordPlain: "mock-smtp-secret",
    fromName: "USNS Notifications",
    fromAddress: "noreply@usns.edu",
  },
  storage: {
    driver: "s3",
    bucket: "usns-dashboard-prod",
    rootPath: "/uploads",
    maxUploadMb: 25,
    secretKey: SECRET_PLACEHOLDER,
    secretKeyPlain: "mock-storage-secret",
  },
  security: {
    sessionTimeoutMinutes: 60,
    minPasswordLength: 8,
    lockoutAttempts: 5,
    mfaRequired: true,
    apiRotationKey: SECRET_PLACEHOLDER,
    apiRotationKeyPlain: "mock-api-rotation-key",
  },
  features: {
    announcementsEnabled: true,
    reportsExportEnabled: true,
    facultyModuleEnabled: true,
    staffModuleEnabled: true,
    academicCalendarEnabled: true,
    auditLogExportEnabled: true,
  },
  backup: {
    frequency: "daily",
    runTime: "03:00",
    retentionDays: 14,
    lastBackupAt: "2026-05-30T03:00:00.000Z",
    lastBackupStatus: "success",
    lastBackupSizeLabel: "2.4 GB",
  },
  backupHistory: [
    {
      id: "backup_001",
      startedAt: "2026-05-30T03:00:00.000Z",
      completedAt: "2026-05-30T03:12:00.000Z",
      type: "scheduled",
      status: "success",
      sizeLabel: "2.4 GB",
    },
    {
      id: "backup_002",
      startedAt: "2026-05-29T03:00:00.000Z",
      completedAt: "2026-05-29T03:11:00.000Z",
      type: "scheduled",
      status: "success",
      sizeLabel: "2.3 GB",
    },
    {
      id: "backup_003",
      startedAt: "2026-05-28T14:22:00.000Z",
      completedAt: "2026-05-28T14:35:00.000Z",
      type: "manual",
      status: "success",
      sizeLabel: "2.3 GB",
    },
    {
      id: "backup_004",
      startedAt: "2026-05-27T03:00:00.000Z",
      completedAt: null,
      type: "scheduled",
      status: "failed",
      sizeLabel: "—",
    },
  ],
  maintenance: {
    enabled: false,
    message:
      "The system is in maintenance mode. Some features may be unavailable.",
    updatedAt: "2026-05-01T00:00:00.000Z",
  },
};

let settingsStore: SettingsStore = structuredClone(SEED_STORE);

export function getSettingsStore(): SettingsStore {
  return settingsStore;
}

export function resetSettingsStore(): void {
  settingsStore = structuredClone(SEED_STORE);
}

export function getGeneralSettings(): GeneralSettings {
  return { ...settingsStore.general };
}

export function updateGeneralSettings(input: GeneralSettings): GeneralSettings {
  settingsStore.general = { ...input };
  return getGeneralSettings();
}

export function getMailSettings(): MailSettings {
  const { smtpPasswordPlain: _p, ...mail } = settingsStore.mail;
  return { ...mail };
}

export function updateMailSettings(
  input: Omit<MailSettings, "smtpPassword"> & { smtpPassword?: string },
): MailSettings {
  const nextPassword =
    input.smtpPassword?.trim() && input.smtpPassword !== SECRET_PLACEHOLDER
      ? input.smtpPassword
      : settingsStore.mail.smtpPasswordPlain;
  settingsStore.mail = {
    ...settingsStore.mail,
    smtpHost: input.smtpHost,
    smtpPort: input.smtpPort,
    encryption: input.encryption,
    smtpUsername: input.smtpUsername,
    smtpPassword: SECRET_PLACEHOLDER,
    smtpPasswordPlain: nextPassword,
    fromName: input.fromName,
    fromAddress: input.fromAddress,
  };
  return getMailSettings();
}

export function getStorageSettings(): StorageSettings {
  const { secretKeyPlain: _s, ...storage } = settingsStore.storage;
  return { ...storage };
}

export function updateStorageSettings(
  input: Omit<StorageSettings, "secretKey"> & { secretKey?: string },
): StorageSettings {
  const nextSecret =
    input.secretKey?.trim() && input.secretKey !== SECRET_PLACEHOLDER
      ? input.secretKey
      : settingsStore.storage.secretKeyPlain;
  settingsStore.storage = {
    ...settingsStore.storage,
    driver: input.driver,
    bucket: input.bucket,
    rootPath: input.rootPath,
    maxUploadMb: input.maxUploadMb,
    secretKey: SECRET_PLACEHOLDER,
    secretKeyPlain: nextSecret,
  };
  return getStorageSettings();
}

export function getSecuritySettings(): SecuritySettings {
  const { apiRotationKeyPlain: _k, ...security } = settingsStore.security;
  return { ...security };
}

export function updateSecuritySettings(
  input: Omit<SecuritySettings, "apiRotationKey"> & { apiRotationKey?: string },
): SecuritySettings {
  const nextKey =
    input.apiRotationKey?.trim() && input.apiRotationKey !== SECRET_PLACEHOLDER
      ? input.apiRotationKey
      : settingsStore.security.apiRotationKeyPlain;
  settingsStore.security = {
    sessionTimeoutMinutes: input.sessionTimeoutMinutes,
    minPasswordLength: input.minPasswordLength,
    lockoutAttempts: input.lockoutAttempts,
    mfaRequired: input.mfaRequired,
    apiRotationKey: SECRET_PLACEHOLDER,
    apiRotationKeyPlain: nextKey,
  };
  return getSecuritySettings();
}

export function getFeatureSettings(): FeatureFlagsSettings {
  return { ...settingsStore.features };
}

export function updateFeatureSettings(
  input: FeatureFlagsSettings,
): FeatureFlagsSettings {
  settingsStore.features = { ...input };
  return getFeatureSettings();
}

export function getBackupSettings(): BackupScheduleSettings {
  return { ...settingsStore.backup };
}

export function updateBackupSchedule(
  input: Pick<BackupScheduleSettings, "frequency" | "runTime" | "retentionDays">,
): BackupScheduleSettings {
  settingsStore.backup = {
    ...settingsStore.backup,
    ...input,
  };
  return getBackupSettings();
}

export function listBackupHistory(): BackupHistoryEntry[] {
  return settingsStore.backupHistory.map((entry) => ({ ...entry }));
}

export function appendBackupHistory(
  entry: Omit<BackupHistoryEntry, "id">,
): BackupHistoryEntry {
  const row: BackupHistoryEntry = {
    id: `backup_${Date.now()}`,
    ...entry,
  };
  settingsStore.backupHistory.unshift(row);
  settingsStore.backup.lastBackupAt = row.completedAt ?? row.startedAt;
  settingsStore.backup.lastBackupStatus = row.status;
  settingsStore.backup.lastBackupSizeLabel = row.sizeLabel;
  return row;
}

export function getMaintenanceSettings(): MaintenanceSettings {
  return { ...settingsStore.maintenance };
}

export function setMaintenanceSettings(
  input: Pick<MaintenanceSettings, "enabled" | "message">,
): MaintenanceSettings {
  settingsStore.maintenance = {
    enabled: input.enabled,
    message: input.message.trim(),
    updatedAt: new Date().toISOString(),
  };
  return getMaintenanceSettings();
}
