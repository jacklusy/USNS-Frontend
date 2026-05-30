import {
  AlertCircle,
  CheckCircle,
  Clock,
  type LucideIcon,
} from "lucide-react";
import type { BadgeVariantResolved } from "@/constants/badge.constants";

export type EntityStatus = "active" | "pending" | "inactive";

export interface StatusBadgeConfig {
  label: string;
  variant: BadgeVariantResolved;
  icon: LucideIcon;
}

export const STATUS_BADGE_CONFIG: Record<EntityStatus, StatusBadgeConfig> = {
  active: {
    label: "Active",
    variant: "success",
    icon: CheckCircle,
  },
  pending: {
    label: "Pending",
    variant: "warning",
    icon: Clock,
  },
  inactive: {
    label: "Inactive",
    variant: "default",
    icon: AlertCircle,
  },
};

export function normalizeEntityStatus(value: string): EntityStatus | null {
  const normalized = value.trim().toLowerCase();
  if (normalized === "active") return "active";
  if (normalized === "pending") return "pending";
  if (normalized === "inactive") return "inactive";
  return null;
}
