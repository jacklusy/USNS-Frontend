export const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;

export const PAGINATION_COPY = {
  navLabel: "Pagination",
  previousPage: "Previous page",
  nextPage: "Next page",
  pageNumber: (page: number) => `Page ${page}`,
  ellipsis: "More pages",
  perPageLabel: "Rows per page",
  showingTotal: (total: number) => `${total} results`,
} as const;
