import { Skeleton } from "@/components/ui/Skeleton";

interface SkeletonTextProps {
  lines?: number;
  lastLineWidth?: string | number;
  className?: string;
}

const LINE_WIDTHS = ["100%", "92%", "78%"] as const;

export function SkeletonText({
  lines = 3,
  lastLineWidth = "60%",
  className = "",
}: SkeletonTextProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`} aria-hidden="true">
      {Array.from({ length: lines }).map((_, index) => {
        const isLast = index === lines - 1;
        const width = isLast
          ? lastLineWidth
          : LINE_WIDTHS[index % LINE_WIDTHS.length];
        return (
          <Skeleton
            key={index}
            height={14}
            width={width}
            borderRadius="sm"
          />
        );
      })}
    </div>
  );
}
