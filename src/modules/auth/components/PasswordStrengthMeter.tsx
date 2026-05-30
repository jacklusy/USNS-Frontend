"use client";

import { getPasswordStrength } from "@/utils/password-strength";

interface PasswordStrengthMeterProps {
  password: string;
}

const SEGMENT_COUNT = 4;

export function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  const { score, label } = getPasswordStrength(password);

  return (
    <div className="flex flex-col gap-2" aria-live="polite">
      <div className="flex gap-1" role="progressbar" aria-valuenow={score} aria-valuemin={0} aria-valuemax={SEGMENT_COUNT} aria-label={`Password strength: ${label}`}>
        {Array.from({ length: SEGMENT_COUNT }, (_, index) => (
          <span
            key={index}
            className={`h-1.5 flex-1 rounded-pill transition-colors ${
              index <= score ? "bg-brand" : "bg-border"
            }`}
          />
        ))}
      </div>
      <p className="text-[13px] text-muted-fg">{label}</p>
    </div>
  );
}
