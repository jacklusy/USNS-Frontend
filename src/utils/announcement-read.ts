const READ_STORAGE_KEY = "usns-read-announcements";

function readIds(): string[] {
  if (typeof window === "undefined") {
    return [];
  }
  const raw = sessionStorage.getItem(READ_STORAGE_KEY);
  if (!raw) {
    return [];
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.every((id) => typeof id === "string")) {
      return parsed;
    }
    return [];
  } catch {
    return [];
  }
}

function writeIds(ids: string[]): void {
  sessionStorage.setItem(READ_STORAGE_KEY, JSON.stringify(ids));
}

export function getReadAnnouncementIds(): string[] {
  return readIds();
}

export function isAnnouncementRead(announcementId: string): boolean {
  return readIds().includes(announcementId);
}

export function markAnnouncementRead(announcementId: string): void {
  const ids = readIds();
  if (ids.includes(announcementId)) {
    return;
  }
  writeIds([...ids, announcementId]);
}
