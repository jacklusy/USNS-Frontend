let sessionExpiredHandler: (() => void) | null = null;
let isHandlingSessionExpiry = false;

export function registerSessionExpiredHandler(handler: () => void): void {
  sessionExpiredHandler = handler;
}

export function triggerSessionExpired(): void {
  if (isHandlingSessionExpiry) return;
  isHandlingSessionExpiry = true;
  sessionExpiredHandler?.();
  isHandlingSessionExpiry = false;
}
