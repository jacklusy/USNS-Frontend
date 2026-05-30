const DISMISS_PREFIX = "usns-dismissed-announcement-";

export function getAnnouncementDismissKey(announcementId: string): string {
  return `${DISMISS_PREFIX}${announcementId}`;
}

export function isAnnouncementDismissed(announcementId: string): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  return sessionStorage.getItem(getAnnouncementDismissKey(announcementId)) === "1";
}

export function dismissAnnouncement(announcementId: string): void {
  sessionStorage.setItem(getAnnouncementDismissKey(announcementId), "1");
}
