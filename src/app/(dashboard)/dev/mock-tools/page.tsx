"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Button } from "@/components/ui/Button";
import { MOCK_DEV_COPY, MOCK_DEV_ERROR_OPTIONS } from "@/constants/mock-dev.constants";
import { ROUTES } from "@/constants/routes.constants";
import { collectMockSeedStats } from "@/mock/lib/seed-stats";
import { useMockDevStore } from "@/store/mock-dev.slice";
import type { AppErrorCode } from "@/types/error.types";

export default function MockToolsPage() {
  const simulatedErrorCode = useMockDevStore((s) => s.simulatedErrorCode);
  const delayOverrideMs = useMockDevStore((s) => s.delayOverrideMs);
  const setSimulatedErrorCode = useMockDevStore((s) => s.setSimulatedErrorCode);
  const setDelayOverrideMs = useMockDevStore((s) => s.setDelayOverrideMs);
  const clearMockDevSettings = useMockDevStore((s) => s.clearMockDevSettings);

  const seedStats = useMemo(() => collectMockSeedStats(), []);

  const handleErrorChange = (value: string) => {
    if (value === "") {
      setSimulatedErrorCode(null);
      return;
    }
    setSimulatedErrorCode(value as AppErrorCode);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-[24px] font-semibold text-foreground md:text-[32px]">
          {MOCK_DEV_COPY.title}
        </h1>
        <p className="mt-2 text-[15px] text-muted-fg">{MOCK_DEV_COPY.description}</p>
        <p className="mt-4 text-[13px] text-muted-fg">
          <Link
            href={ROUTES.DEV_ERRORS}
            className="text-accent underline-offset-2 hover:underline"
          >
            Error screen catalog
          </Link>
        </p>
      </div>

      <section className="space-y-3 rounded-lg border border-border bg-surface-elevated p-6">
        <h2 className="text-[18px] font-semibold text-foreground">
          {MOCK_DEV_COPY.errorSectionTitle}
        </h2>
        <p className="text-[13px] text-muted-fg">
          {MOCK_DEV_COPY.errorSectionDescription}
        </p>
        <select
          className="h-11 w-full rounded-md border border-border bg-surface px-3 text-[15px] text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          value={simulatedErrorCode ?? ""}
          onChange={(event) => handleErrorChange(event.target.value)}
          aria-label={MOCK_DEV_COPY.errorSectionTitle}
        >
          {MOCK_DEV_ERROR_OPTIONS.map((option) => (
            <option key={option.label} value={option.value ?? ""}>
              {option.label}
            </option>
          ))}
        </select>
      </section>

      <section className="space-y-3 rounded-lg border border-border bg-surface-elevated p-6">
        <h2 className="text-[18px] font-semibold text-foreground">
          {MOCK_DEV_COPY.delaySectionTitle}
        </h2>
        <p className="text-[13px] text-muted-fg">
          {MOCK_DEV_COPY.delaySectionDescription}
        </p>
        <label className="block text-[13px] font-medium text-foreground">
          {MOCK_DEV_COPY.delayMsLabel}
          <input
            type="number"
            min={0}
            max={5000}
            step={50}
            className="mt-2 h-11 w-full rounded-md border border-border bg-surface px-3 text-[15px] text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            value={delayOverrideMs ?? ""}
            onChange={(event) => {
              const raw = event.target.value;
              if (!raw) {
                setDelayOverrideMs(null);
                return;
              }
              const parsed = Number.parseInt(raw, 10);
              setDelayOverrideMs(Number.isNaN(parsed) ? null : parsed);
            }}
          />
        </label>
      </section>

      <Button type="button" variant="secondary" onClick={clearMockDevSettings}>
        {MOCK_DEV_COPY.clearLabel}
      </Button>

      <section className="space-y-3 rounded-lg border border-border bg-surface-elevated p-6">
        <h2 className="text-[18px] font-semibold text-foreground">
          {MOCK_DEV_COPY.seedStatsTitle}
        </h2>
        <ul className="divide-y divide-border text-[15px]">
          {seedStats.map((stat) => (
            <li
              key={`${stat.module}-${stat.resource}`}
              className="flex justify-between py-2"
            >
              <span className="text-muted-fg">
                {stat.module} / {stat.resource}
              </span>
              <span className="font-mono tabular-nums text-foreground">
                {stat.count}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
