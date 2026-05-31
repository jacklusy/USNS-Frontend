"use client";

import { TabsWithUrl } from "@/components/ui/Tabs";
import {
  AUDIT_COPY,
  AUDIT_TAB_IDS,
} from "@/constants/audit-management.constants";
import { AuditLogsSection } from "./audit-logs/AuditLogsSection";
import { LoginHistorySection } from "./login-history/LoginHistorySection";
import { SystemEventsSection } from "./system-events/SystemEventsSection";

export function AuditTabs() {
  return (
    <TabsWithUrl
      items={[
        {
          id: AUDIT_TAB_IDS.logs,
          label: AUDIT_COPY.tabLogs,
          content: <AuditLogsSection />,
        },
        {
          id: AUDIT_TAB_IDS.loginHistory,
          label: AUDIT_COPY.tabLoginHistory,
          content: <LoginHistorySection />,
        },
        {
          id: AUDIT_TAB_IDS.systemEvents,
          label: AUDIT_COPY.tabSystemEvents,
          content: <SystemEventsSection />,
        },
      ]}
      urlParam="tab"
      defaultTabId={AUDIT_TAB_IDS.logs}
      className="mt-6"
    />
  );
}
