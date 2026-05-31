import { AUDIT_COPY } from "@/constants/audit-management.constants";
import {
  AUDIT_LOG_ACTION_OPTIONS,
  AUDIT_LOG_RESOURCE_TYPE_OPTIONS,
  AUDIT_LOG_RESULT_LABELS,
  LOGIN_RESULT_LABELS,
  SYSTEM_EVENT_CATEGORY_LABELS,
  SYSTEM_EVENT_SEVERITY_LABELS,
} from "@/constants/audit-log.constants";
import type { FilterFieldConfig } from "@/types/filter.types";

export const AUDIT_LOGS_FILTER_CONFIG: FilterFieldConfig[] = [
  {
    id: "occurred",
    type: "dateRange",
    label: AUDIT_COPY.filterDateRange,
    urlKey: "occurred",
  },
  {
    id: "actor",
    type: "text",
    label: AUDIT_COPY.filterActor,
    urlKey: "actor",
    placeholder: "Search by actor name",
  },
  {
    id: "action",
    type: "select",
    label: AUDIT_COPY.filterAction,
    urlKey: "action",
    options: [...AUDIT_LOG_ACTION_OPTIONS],
    placeholder: "Any action",
  },
  {
    id: "resourceType",
    type: "select",
    label: AUDIT_COPY.filterResourceType,
    urlKey: "resourceType",
    options: [...AUDIT_LOG_RESOURCE_TYPE_OPTIONS],
    placeholder: "Any resource",
  },
  {
    id: "result",
    type: "select",
    label: AUDIT_COPY.filterResult,
    urlKey: "result",
    options: [
      { label: AUDIT_LOG_RESULT_LABELS.success, value: "success" },
      { label: AUDIT_LOG_RESULT_LABELS.failure, value: "failure" },
    ],
    placeholder: "Any result",
  },
];

export const LOGIN_HISTORY_FILTER_CONFIG: FilterFieldConfig[] = [
  {
    id: "occurred",
    type: "dateRange",
    label: AUDIT_COPY.filterDateRange,
    urlKey: "occurred",
  },
  {
    id: "user",
    type: "text",
    label: AUDIT_COPY.filterUser,
    urlKey: "user",
    placeholder: "Search by name or email",
  },
  {
    id: "result",
    type: "select",
    label: AUDIT_COPY.filterLoginResult,
    urlKey: "result",
    options: [
      { label: LOGIN_RESULT_LABELS.success, value: "success" },
      { label: LOGIN_RESULT_LABELS.failed, value: "failed" },
      { label: LOGIN_RESULT_LABELS.blocked, value: "blocked" },
    ],
    placeholder: "Any result",
  },
];

export const SYSTEM_EVENTS_FILTER_CONFIG: FilterFieldConfig[] = [
  {
    id: "occurred",
    type: "dateRange",
    label: AUDIT_COPY.filterDateRange,
    urlKey: "occurred",
  },
  {
    id: "category",
    type: "select",
    label: AUDIT_COPY.filterCategory,
    urlKey: "category",
    options: [
      {
        label: SYSTEM_EVENT_CATEGORY_LABELS.system,
        value: "system",
      },
      {
        label: SYSTEM_EVENT_CATEGORY_LABELS.security,
        value: "security",
      },
      {
        label: SYSTEM_EVENT_CATEGORY_LABELS.configuration,
        value: "configuration",
      },
      {
        label: SYSTEM_EVENT_CATEGORY_LABELS.backup,
        value: "backup",
      },
    ],
    placeholder: "Any category",
  },
  {
    id: "severity",
    type: "select",
    label: AUDIT_COPY.filterSeverity,
    urlKey: "severity",
    options: [
      { label: SYSTEM_EVENT_SEVERITY_LABELS.info, value: "info" },
      { label: SYSTEM_EVENT_SEVERITY_LABELS.warning, value: "warning" },
      { label: SYSTEM_EVENT_SEVERITY_LABELS.critical, value: "critical" },
    ],
    placeholder: "Any severity",
  },
];
