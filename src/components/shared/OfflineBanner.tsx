"use client";

import { WifiOff } from "lucide-react";
import { OFFLINE_COPY } from "@/constants/offline.constants";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";

export function OfflineBanner() {
  const isOnline = useOnlineStatus();

  if (isOnline) {
    return null;
  }

  return (
    <div
      className="flex items-center justify-center gap-2 border-b border-warn/30 bg-warn/10 px-4 py-3 text-[15px] text-foreground"
      role="status"
      aria-live="polite"
    >
      <WifiOff className="h-5 w-5 shrink-0 text-warn" strokeWidth={1.75} aria-hidden="true" />
      <span>{OFFLINE_COPY.message}</span>
    </div>
  );
}
