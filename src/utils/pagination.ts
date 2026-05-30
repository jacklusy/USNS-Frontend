export type PageNumberItem = number | "ellipsis";

export function getLastPage(total: number, perPage: number): number {
  return Math.max(1, Math.ceil(total / perPage));
}

export function clampPage(page: number, lastPage: number): number {
  return Math.min(Math.max(1, page), lastPage);
}

export function getVisiblePageNumbers(
  currentPage: number,
  lastPage: number,
  siblingCount = 1,
): PageNumberItem[] {
  if (lastPage <= 1) {
    return [1];
  }

  const pages = new Set<number>();
  pages.add(1);
  pages.add(lastPage);

  for (
    let page = currentPage - siblingCount;
    page <= currentPage + siblingCount;
    page += 1
  ) {
    if (page >= 1 && page <= lastPage) {
      pages.add(page);
    }
  }

  const sorted = Array.from(pages).sort((a, b) => a - b);
  const result: PageNumberItem[] = [];

  for (let index = 0; index < sorted.length; index += 1) {
    const page = sorted[index];
    const previous = sorted[index - 1];
    if (previous !== undefined && page - previous > 1) {
      result.push("ellipsis");
    }
    result.push(page);
  }

  return result;
}
