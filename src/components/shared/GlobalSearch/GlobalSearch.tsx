"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { EmptyState } from "@/components/shared/EmptyState";
import { Modal } from "@/components/ui/Modal";
import { SkeletonText } from "@/components/ui/loading-skeleton";
import { GLOBAL_SEARCH_COPY } from "@/constants/global-search.constants";
import { useGlobalSearch } from "@/hooks/useGlobalSearch";
import { getGlobalSearchTypeIcon } from "@/services/search/global-search.service.mock";
import type { GlobalSearchResultType } from "@/types/global-search.types";
import { getInputClassName } from "@/utils/input-classes";

const TYPE_LABELS: Record<GlobalSearchResultType, string> = {
  user: GLOBAL_SEARCH_COPY.resultTypeUser,
  page: GLOBAL_SEARCH_COPY.resultTypePage,
  action: GLOBAL_SEARCH_COPY.resultTypeAction,
};

interface GlobalSearchProps {
  className?: string;
}

export function GlobalSearch({ className = "" }: GlobalSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { results, isLoading } = useGlobalSearch(open ? query : "");

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "/" && document.activeElement?.tagName !== "INPUT") {
        event.preventDefault();
        setOpen(true);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
        }}
        className={`inline-flex min-h-11 flex-1 items-center gap-2 rounded-md border border-border bg-surface px-4 text-left text-[15px] text-muted-fg transition-colors hover:bg-usns-green-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 md:max-w-md ${className}`}
        aria-label={GLOBAL_SEARCH_COPY.triggerLabel}
      >
        <Search className="h-5 w-5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
        <span>{GLOBAL_SEARCH_COPY.placeholder}</span>
      </button>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setQuery("");
        }}
        title={GLOBAL_SEARCH_COPY.modalTitle}
        maxWidth="md"
      >
        <div className="flex flex-col gap-4">
          <input
            type="search"
            autoFocus
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
            placeholder={GLOBAL_SEARCH_COPY.placeholder}
            aria-label={GLOBAL_SEARCH_COPY.placeholder}
            className={getInputClassName(false, false)}
          />
          {isLoading ? (
            <SkeletonText lines={4} />
          ) : results.length === 0 ? (
            <EmptyState
              icon={Search}
              title={GLOBAL_SEARCH_COPY.emptyTitle}
              description={GLOBAL_SEARCH_COPY.emptyDescription}
              variant="inPage"
            />
          ) : (
            <ul className="max-h-[360px] overflow-y-auto rounded-md border border-border">
              {results.map((result) => {
                const Icon = getGlobalSearchTypeIcon(result.type);
                return (
                  <li
                    key={result.id}
                    className="border-b border-border last:border-b-0"
                  >
                    <Link
                      href={result.href}
                      onClick={() => {
                        setOpen(false);
                        setQuery("");
                      }}
                      className="flex min-h-11 items-start gap-3 px-4 py-3 transition-colors hover:bg-usns-green-light/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
                    >
                      <Icon
                        className="mt-0.5 h-5 w-5 shrink-0 text-muted-fg"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      <span className="flex flex-col text-left">
                        <span className="text-[15px] font-medium text-foreground">
                          {result.title}
                        </span>
                        <span className="text-[13px] text-muted-fg">
                          {result.subtitle}
                        </span>
                        <span className="mt-0.5 text-[12px] uppercase tracking-wide text-muted-fg">
                          {TYPE_LABELS[result.type]}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </Modal>
    </>
  );
}
