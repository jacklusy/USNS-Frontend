const settingsRoot = ["settings"] as const;

export const settingsQueryKeys = {
  root: settingsRoot,
  general: [...settingsRoot, "general"] as const,
  mail: [...settingsRoot, "mail"] as const,
  storage: [...settingsRoot, "storage"] as const,
  security: [...settingsRoot, "security"] as const,
  features: [...settingsRoot, "features"] as const,
  backup: [...settingsRoot, "backup"] as const,
  backupHistory: [...settingsRoot, "backupHistory"] as const,
  maintenance: [...settingsRoot, "maintenance"] as const,
  emailTemplates: {
    all: [...settingsRoot, "emailTemplates"] as const,
    detail: (id: string) =>
      [...settingsRoot, "emailTemplates", "detail", id] as const,
  },
};
