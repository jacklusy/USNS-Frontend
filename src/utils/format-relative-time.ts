const MINUTE_MS = 60 * 1000;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;

export function formatRelativeTime(isoDate: string, now: Date = new Date()): string {
  const then = new Date(isoDate).getTime();
  const diffMs = now.getTime() - then;

  if (Number.isNaN(then) || diffMs < 0) {
    return "Just now";
  }

  if (diffMs < MINUTE_MS) {
    return "Just now";
  }

  if (diffMs < HOUR_MS) {
    const minutes = Math.floor(diffMs / MINUTE_MS);
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  }

  if (diffMs < DAY_MS) {
    const hours = Math.floor(diffMs / HOUR_MS);
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }

  const days = Math.floor(diffMs / DAY_MS);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}
