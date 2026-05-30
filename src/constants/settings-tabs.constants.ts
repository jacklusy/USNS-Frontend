export const SETTINGS_TABS_COPY = {
  generalTitle: "General",
  generalDescription:
    "Core application settings and environment configuration.",
  mailTitle: "Mail",
  mailDescription: "Outbound email and SMTP delivery configuration.",
  storageTitle: "Storage",
  storageDescription: "File storage driver and upload limits.",
  securityTitle: "Security",
  securityDescription:
    "Authentication policies, session timeouts, and access controls.",
  featuresTitle: "Features",
  featuresDescription: "Feature flags for optional dashboard modules.",
  operationsTitle: "Operations",
  emailTemplatesTitle: "Email templates",
} as const;

export const SETTINGS_TAB_IDS = {
  general: "general",
  mail: "mail",
  storage: "storage",
  security: "security",
  features: "features",
  operations: "operations",
  emailTemplates: "email-templates",
} as const;
