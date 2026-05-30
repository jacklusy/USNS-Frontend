"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useId, useMemo } from "react";
import {
  DEFAULT_PAGE_SIZE_OPTIONS,
  PAGINATION_COPY,
} from "@/constants/pagination.constants";
import type { PaginationProps } from "@/types/pagination.types";
import {
  clampPage,
  getLastPage,
  getVisiblePageNumbers,
} from "@/utils/pagination";

export function Pagination({
  page,
  total,
  perPage,
  onPageChange,
  onPerPageChange,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  disabled = false,
  className = "",
}: PaginationProps) {
  const perPageSelectId = useId();
  const lastPage = getLastPage(total, perPage);
  const safePage = clampPage(page, lastPage);
  const pageNumbers = useMemo(
    () => getVisiblePageNumbers(safePage, lastPage),
    [safePage, lastPage],
  );

  const perPageOptions = useMemo(
    () =>
      pageSizeOptions.map((size) => ({
        label: String(size),
        value: String(size),
      })),
    [pageSizeOptions],
  );

  return (
    <nav
      className={`flex flex-wrap items-center justify-between gap-4 border-t border-border px-4 py-3 ${className}`}
      aria-label={PAGINATION_COPY.navLabel}
    >
      <p className="text-[13px] text-muted-fg">
        {PAGINATION_COPY.showingTotal(total)}
      </p>
      <div className="flex flex-wrap items-center gap-4">
        {onPerPageChange ? (
          <div className="flex items-center gap-2">
            <label
              htmlFor={perPageSelectId}
              className="text-[13px] text-muted-fg"
            >
              {PAGINATION_COPY.perPageLabel}
            </label>
            <select
              id={perPageSelectId}
              disabled={disabled}
              value={String(perPage)}
              onChange={(event) => {
                onPerPageChange(Number(event.target.value));
              }}
              className="h-11 min-w-[72px] rounded-md border border-border bg-surface px-3 text-[15px] text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {perPageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ) : null}
        <ul className="flex items-center gap-1">
          <li>
            <button
              type="button"
              disabled={disabled || safePage <= 1}
              onClick={() => {
                onPageChange(safePage - 1);
              }}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-usns-green-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label={PAGINATION_COPY.previousPage}
            >
              <ChevronLeft
                className="h-5 w-5"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </button>
          </li>
          {pageNumbers.map((item, index) =>
            item === "ellipsis" ? (
              <li key={`ellipsis-${index}`}>
                <span
                  className="inline-flex h-11 min-w-11 items-center justify-center px-2 text-[13px] text-muted-fg"
                  aria-hidden="true"
                >
                  …
                </span>
              </li>
            ) : (
              <li key={item}>
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    onPageChange(item);
                  }}
                  aria-label={PAGINATION_COPY.pageNumber(item)}
                  aria-current={item === safePage ? "page" : undefined}
                  className={`inline-flex h-11 min-w-11 items-center justify-center rounded-md px-3 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                    item === safePage
                      ? "bg-brand text-white"
                      : "border border-border text-foreground hover:bg-usns-green-light"
                  }`}
                >
                  {item}
                </button>
              </li>
            ),
          )}
          <li>
            <button
              type="button"
              disabled={disabled || safePage >= lastPage}
              onClick={() => {
                onPageChange(safePage + 1);
              }}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-usns-green-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label={PAGINATION_COPY.nextPage}
            >
              <ChevronRight
                className="h-5 w-5"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
