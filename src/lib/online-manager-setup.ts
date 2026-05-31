import { onlineManager, type QueryClient } from "@tanstack/react-query";

function subscribeOnline(callback: (online: boolean) => void): () => void {
  const onOnline = () => callback(true);
  const onOffline = () => callback(false);
  window.addEventListener("online", onOnline);
  window.addEventListener("offline", onOffline);
  return () => {
    window.removeEventListener("online", onOnline);
    window.removeEventListener("offline", onOffline);
  };
}

function getOnlineSnapshot(): boolean {
  return typeof navigator !== "undefined" ? navigator.onLine : true;
}

export function setupOnlineManager(queryClient: QueryClient): () => void {
  onlineManager.setEventListener((setOnline) => subscribeOnline(setOnline));
  onlineManager.setOnline(getOnlineSnapshot());

  return onlineManager.subscribe((isOnline) => {
    if (!isOnline) {
      return;
    }
    void queryClient.resumePausedMutations();
    void queryClient.invalidateQueries();
  });
}
