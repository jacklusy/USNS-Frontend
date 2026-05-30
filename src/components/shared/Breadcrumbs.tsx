"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";

interface BreadcrumbsProps {
  dynamicLabels?: Record<string, string>;
}

export function Breadcrumbs({ dynamicLabels }: BreadcrumbsProps) {
  const pathname = usePathname();
  const items = useBreadcrumbs({ pathname, dynamicLabels });

  if (items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="min-w-0">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => (
          <li key={item.href} className="flex min-w-0 items-center gap-1">
            {index > 0 ? (
              <ChevronRight
                className="h-4 w-4 shrink-0 text-muted-fg"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            ) : null}
            {item.isCurrent ? (
              <span
                className="truncate text-[13px] font-medium text-foreground"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="truncate text-[13px] text-muted-fg transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
