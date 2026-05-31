const profileRoot = ["profile"] as const;

export const profileQueryKeys = {
  root: profileRoot,
  all: [...profileRoot] as const,
  me: [...profileRoot, "me"] as const,
  preferences: [...profileRoot, "preferences"] as const,
};
