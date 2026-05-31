"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ErrorState } from "@/components/shared/ErrorState";
import { AUDIT_LOG_RESULT_LABELS } from "@/constants/audit-log.constants";
import { AUDIT_COPY } from "@/constants/audit-management.constants";
import { ROUTES } from "@/constants/routes.constants";
import { useAuditLogDetail } from "../../hooks/useAuditLogs";
import {
  formatAuditActionLabel,
  formatAuditTimestamp,
} from "../../utils/audit-display";
import {
  formatPayloadRecord,
  getPayloadChangedKeys,
} from "../../utils/audit-payload-diff";

interface AuditLogDetailPageContentProps {
  logId: string;
}

export function AuditLogDetailPageContent({
  logId,
}: AuditLogDetailPageContentProps) {
  const query = useAuditLogDetail(logId);
  const log = query.data?.data;

  if (query.isLoading) {
    return <div className="h-96 animate-pulse rounded-lg bg-border" />;
  }

  if (query.isError || !log) {
    return (
      <ErrorState
        title={AUDIT_COPY.loadErrorTitle}
        description={AUDIT_COPY.loadErrorDescription}
        onRetry={() => void query.refetch()}
      />
    );
  }

  const changedKeys = getPayloadChangedKeys(log.payloadBefore, log.payloadAfter);

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6">
      <Link
        href={`${ROUTES.AUDIT}?tab=logs`}
        className="inline-flex w-fit items-center gap-2 text-[15px] font-medium text-brand hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        <ArrowLeft className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
        {AUDIT_COPY.backToLogs}
      </Link>
      <div className="flex flex-col gap-1">
        <h1 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.01em] text-foreground md:text-[32px]">
          {AUDIT_COPY.logDetailTitle}
        </h1>
        <p className="text-[15px] text-muted-fg">{log.id}</p>
      </div>
      <section className="rounded-lg border border-border bg-surface-elevated p-6">
        <h2 className="text-[18px] font-semibold text-foreground">
          {AUDIT_COPY.summarySection}
        </h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-[12px] font-medium uppercase tracking-wide text-muted-fg">
              Timestamp
            </dt>
            <dd className="mt-1 text-[15px]">{formatAuditTimestamp(log.timestamp)}</dd>
          </div>
          <div>
            <dt className="text-[12px] font-medium uppercase tracking-wide text-muted-fg">
              Actor
            </dt>
            <dd className="mt-1 text-[15px]">{log.actorName}</dd>
          </div>
          <div>
            <dt className="text-[12px] font-medium uppercase tracking-wide text-muted-fg">
              Action
            </dt>
            <dd className="mt-1 text-[15px]">{formatAuditActionLabel(log.action)}</dd>
          </div>
          <div>
            <dt className="text-[12px] font-medium uppercase tracking-wide text-muted-fg">
              Result
            </dt>
            <dd className="mt-1">
              <Badge variant={log.result === "success" ? "success" : "danger"}>
                {AUDIT_LOG_RESULT_LABELS[log.result]}
              </Badge>
            </dd>
          </div>
          <div>
            <dt className="text-[12px] font-medium uppercase tracking-wide text-muted-fg">
              Resource type
            </dt>
            <dd className="mt-1 text-[15px]">{log.resourceType}</dd>
          </div>
          <div>
            <dt className="text-[12px] font-medium uppercase tracking-wide text-muted-fg">
              Resource ID
            </dt>
            <dd className="mt-1 font-mono text-[15px]">{log.resourceId}</dd>
          </div>
          <div>
            <dt className="text-[12px] font-medium uppercase tracking-wide text-muted-fg">
              IP address
            </dt>
            <dd className="mt-1 font-mono text-[15px]">{log.ipAddress}</dd>
          </div>
        </dl>
      </section>
      {changedKeys.length > 0 ? (
        <section className="rounded-lg border border-border bg-surface-elevated p-6">
          <h2 className="text-[18px] font-semibold text-foreground">
            {AUDIT_COPY.payloadChanges}
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2" role="list">
            {changedKeys.map((key) => (
              <li key={key}>
                <Badge variant="brand">{key}</Badge>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {log.payloadBefore || log.payloadAfter ? (
        <div className="grid gap-4 lg:grid-cols-2">
          <section className="rounded-lg border border-border bg-surface-elevated p-6">
            <h3 className="text-[15px] font-semibold text-foreground">
              {AUDIT_COPY.payloadBefore}
            </h3>
            <pre className="mt-3 overflow-x-auto rounded-md bg-surface p-4 font-mono text-[13px] leading-relaxed text-foreground">
              {formatPayloadRecord(log.payloadBefore)}
            </pre>
          </section>
          <section className="rounded-lg border border-border bg-surface-elevated p-6">
            <h3 className="text-[15px] font-semibold text-foreground">
              {AUDIT_COPY.payloadAfter}
            </h3>
            <pre className="mt-3 overflow-x-auto rounded-md bg-surface p-4 font-mono text-[13px] leading-relaxed text-foreground">
              {formatPayloadRecord(log.payloadAfter)}
            </pre>
          </section>
        </div>
      ) : null}
    </div>
  );
}
