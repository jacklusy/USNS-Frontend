export const MASKED_SECRET_VALUE = "••••••••";

export const SETTINGS_MANAGEMENT_COPY = {
  saveButton: "Save changes",
  cancelButton: "Cancel",
  confirmSaveTitle: "Save settings",
  confirmSaveDescription:
    "These changes will be applied to the system configuration. Continue?",
  confirmSaveLabel: "Save",
  saveSuccess: "Settings saved",
  loadErrorTitle: "Unable to load settings",
  loadErrorDescription: "Check your connection and try again.",
  operationsTabTitle: "Operations",
  operationsTabDescription:
    "Backup scheduling, manual backups, and maintenance mode for database administrators.",
  backupScheduleTitle: "Backup schedule",
  backupLastRun: "Last backup",
  backupManualTitle: "Manual backup",
  backupManualDescription: "Run an on-demand backup of application data.",
  backupManualButton: "Run backup now",
  backupManualConfirmTitle: "Run manual backup",
  backupManualConfirmDescription:
    "This starts an immediate backup job. The operation may take several minutes.",
  backupProgressLabel: "Backup in progress",
  backupHistoryTitle: "Backup history",
  maintenanceTitle: "Maintenance mode",
  maintenanceDescription:
    "When enabled, a warning banner is shown across the dashboard for all users.",
  maintenanceEnableFirstTitle: "Enable maintenance mode",
  maintenanceEnableFirstDescription:
    "Users will see a prominent warning while maintenance mode is active. Administrative work should be limited to essential tasks.",
  maintenanceEnableSecondTitle: "Confirm maintenance mode",
  maintenanceEnableSecondDescription:
    "This will display a system-wide maintenance banner until you turn maintenance mode off.",
  maintenanceDisableTitle: "Disable maintenance mode",
  maintenanceDisableDescription:
    "The maintenance banner will be removed for all users.",
  maintenanceConfirmEnable: "Enable maintenance",
  maintenanceConfirmDisable: "Disable maintenance",
  maintenanceMessageLabel: "Banner message",
  maintenanceSuccess: "Maintenance mode updated",
  backupSuccess: "Backup completed",
  fieldInstitutionName: "Institution name",
  fieldSupportEmail: "Support email",
  fieldTimezone: "Default timezone",
  fieldLocale: "Default locale",
  fieldSmtpHost: "SMTP host",
  fieldSmtpPort: "SMTP port",
  fieldEncryption: "Encryption",
  fieldSmtpUsername: "SMTP username",
  fieldSmtpPassword: "SMTP password",
  fieldFromName: "From name",
  fieldFromAddress: "From address",
  fieldStorageDriver: "Storage driver",
  fieldBucket: "Bucket",
  fieldRootPath: "Root path",
  fieldMaxUpload: "Max upload (MB)",
  fieldSecretKey: "Secret key",
  fieldSessionTimeout: "Session timeout (minutes)",
  fieldMinPasswordLength: "Minimum password length",
  fieldLockoutAttempts: "Lockout attempts",
  fieldMfaRequired: "Require MFA for admin roles",
  fieldApiRotationKey: "API rotation key",
  featureAnnouncements: "Announcements center",
  featureReportsExport: "Reports export",
  featureFacultyModule: "Faculty management",
  featureStaffModule: "Administrative staff",
  featureAcademicCalendar: "Academic calendar",
  featureAuditExport: "Audit log export",
  fieldBackupFrequency: "Frequency",
  fieldBackupTime: "Run time",
  fieldRetentionDays: "Retention (days)",
  emailTemplatesTabTitle: "Email templates",
  emailTemplatesTabDescription:
    "System email templates used for notifications and automated messages.",
  emailEditTitle: "Edit template",
  emailPreviewTitle: "Template preview",
  emailResetTitle: "Reset template",
  emailResetDescription:
    "Restore the default content for this template. Your edits will be lost.",
  emailResetConfirm: "Reset to default",
  emailSaveSuccess: "Template saved",
  emailResetSuccess: "Template reset to default",
  emailColumnName: "Template",
  emailColumnCategory: "Category",
  emailColumnModified: "Last modified",
  emailFieldSubject: "Subject",
  emailFieldPreheader: "Preheader",
  emailFieldBody: "Body",
  emailVariablesTitle: "Template variables",
  emailPreviewButton: "Preview",
  emailEmptyTitle: "No templates found",
  emailEmptyDescription: "System templates will appear here when configured.",
} as const;

export const TIMEZONE_OPTIONS = [
  { value: "America/New_York", label: "Eastern (US)" },
  { value: "America/Chicago", label: "Central (US)" },
  { value: "America/Denver", label: "Mountain (US)" },
  { value: "America/Los_Angeles", label: "Pacific (US)" },
  { value: "UTC", label: "UTC" },
  { value: "Europe/London", label: "London" },
  { value: "Asia/Dubai", label: "Dubai" },
] as const;

export const LOCALE_OPTIONS = [
  { value: "en-US", label: "English (US)" },
  { value: "en-GB", label: "English (UK)" },
  { value: "ar-AE", label: "Arabic (UAE)" },
] as const;

export const MAIL_ENCRYPTION_OPTIONS = [
  { value: "none", label: "None" },
  { value: "tls", label: "TLS" },
  { value: "ssl", label: "SSL" },
] as const;

export const STORAGE_DRIVER_OPTIONS = [
  { value: "local", label: "Local disk" },
  { value: "s3", label: "Amazon S3" },
] as const;

export const BACKUP_FREQUENCY_OPTIONS = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
] as const;

export const MAINTENANCE_BANNER_DEFAULT_MESSAGE =
  "The system is in maintenance mode. Some features may be unavailable.";
