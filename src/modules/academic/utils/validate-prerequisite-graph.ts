export function wouldCreatePrerequisiteCycle(
  courseId: string | undefined,
  prerequisiteIds: string[],
  adjacency: ReadonlyMap<string, readonly string[]>,
): boolean {
  if (prerequisiteIds.length === 0) {
    return false;
  }

  const visited = new Set<string>();
  const stack = [...prerequisiteIds];

  while (stack.length > 0) {
    const current = stack.pop();
    if (!current) continue;
    if (courseId && current === courseId) {
      return true;
    }
    if (visited.has(current)) continue;
    visited.add(current);
    const next = adjacency.get(current) ?? [];
    for (const id of next) {
      stack.push(id);
    }
  }

  return false;
}

export function buildPrerequisiteAdjacency(
  courses: readonly { id: string; prerequisiteIds: readonly string[] }[],
): Map<string, string[]> {
  const map = new Map<string, string[]>();
  for (const course of courses) {
    map.set(course.id, [...course.prerequisiteIds]);
  }
  return map;
}
