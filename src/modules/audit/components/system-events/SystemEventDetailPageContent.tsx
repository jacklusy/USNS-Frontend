"use client";

import Link from "next/link";
import { AlertCircle, AlertTriangle, ArrowLeft, Info } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ErrorState } from "@/components/shared/ErrorState";
import {
  SYSTEM_EVENT_CATEGORY_LABELS,
  SYSTEM_EVENT_SEVERITY_LABELS,
} from "@/constants/audit-log.constants";
import { AUDIT_COPY } from "@/constants/audit-management.constants";
import { ROUTES } from "@/constants/routes.constants";
import { useSystemEventDetail } from "../../hooks/useSystemEvents";
import type { SystemEventSeverity } from "../../types/system-event.types";
import { formatAuditTimestamp } from "../../utils/audit-display";

function SeverityHeader({ severity }: { severity: SystemEventSeverity }) {
  const Icon =
    severity === "critical"
      ? AlertCircle
      : severity === "warning"
        ? AlertTriangle
        : Info;
  const tone =
    severity === "critical"
      ? "text-danger"
      : severity === "warning"
        ? "text-warn"
        : "text-muted-fg";
  return (
    <span className={`inline-flex items-center gap-2 ${tone}`}>
      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
      <span className="text-[15px] font-medium">
        {SYSTEM_EVENT_SEVERITY_LABELS[severity]}
      </span>
    </span>
  );
}

interface SystemEventDetailPageContentProps {
  eventId: string;
}

export function SystemEventDetailPageContent({
  eventId,
}: SystemEventDetailPageContentProps) {
  const query = useSystemEventDetail(eventId);
  const event = query.data?.data;

  if (query.isLoading) {
    return <div className="h-96 animate-pulse rounded-lg bg-border" />;
  }

  if (query.isError || !event) {
    return (
      <ErrorState
        title={AUDIT_COPY.loadErrorTitle}
        description={AUDIT_COPY.loadErrorDescription}
        onRetry={() => void query.refetch()}
      />
    );
  }

  const contextEntries = Object.entries(event.context);

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6">
      <Link
        href={`${ROUTES.AUDIT}?tab=system-events`}
        className="inline-flex w-fit items-center gap-2 text-[15px] font-medium text-brand hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        <ArrowLeft className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
        {AUDIT_COPY.backToEvents}
      </Link>
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="neutral">
            {SYSTEM_EVENT_CATEGORY_LABELS[event.category]}
          </Badge>
          <SeverityHeader severity={event.severity} />
        </div>
        <h1 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.01em] text-foreground md:text-[32px]">
          {event.title}
        </h1>
        <p className="text-[15px] text-muted-fg">{event.summary}</p>
        <p className="text-[13px] text-muted-fg">
          {formatAuditTimestamp(event.timestamp)}
        </p>
      </div>
      <section className="rounded-lg border border-border bg-surface-elevated p-6">
        <h2 className="text-[18px] font-semibold text-foreground">
          {AUDIT_COPY.contextPayload}
        </h2>
        {contextEntries.length > 0 ? (
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            {contextEntries.map(([key, value]) => (
              <div key={key}>
                <dt className="text-[12px] font-medium uppercase tracking-wide text-muted-fg">
                  {key}
                </dt>
                <dd className="mt-1 font-mono text-[13px] text-foreground">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <pre className="mt-3 font-mono text-[13px] text-muted-fg">{}</pre>
        )}
      </section>
    </div>
  );
}
