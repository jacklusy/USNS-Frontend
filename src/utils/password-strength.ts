export interface PasswordStrengthResult {
  score: number;
  label: string;
}

const STRENGTH_LABELS = [
  "Very weak",
  "Weak",
  "Fair",
  "Good",
  "Strong",
] as const;

export function getPasswordStrength(password: string): PasswordStrengthResult {
  if (!password) {
    return { score: 0, label: STRENGTH_LABELS[0] };
  }

  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;

  const normalized = Math.min(4, Math.max(0, score - 1));

  return {
    score: normalized,
    label: STRENGTH_LABELS[normalized],
  };
}
