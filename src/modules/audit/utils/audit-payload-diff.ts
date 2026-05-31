export function getPayloadChangedKeys(
  before?: Record<string, string>,
  after?: Record<string, string>,
): string[] {
  const keys = new Set([
    ...Object.keys(before ?? {}),
    ...Object.keys(after ?? {}),
  ]);
  const changed: string[] = [];
  for (const key of keys) {
    const prev = before?.[key];
    const next = after?.[key];
    if (prev !== next) {
      changed.push(key);
    }
  }
  return changed.sort();
}

export function formatPayloadRecord(
  record?: Record<string, string>,
): string {
  if (!record || Object.keys(record).length === 0) {
    return "{}";
  }
  return JSON.stringify(record, null, 2);
}
