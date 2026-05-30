import { Skeleton } from "@/components/ui/Skeleton";
import { SkeletonText } from "./SkeletonText";

interface SkeletonCardProps {
  rows?: number;
  contentHeight?: number | string;
  className?: string;
}

export function SkeletonCard({
  rows = 3,
  contentHeight,
  className = "",
}: SkeletonCardProps) {
  return (
    <div
      className={`rounded-lg border border-border bg-surface-elevated p-5 ${className}`}
      aria-hidden="true"
    >
      <Skeleton height={20} width="40%" borderRadius="sm" />
      <div className="mt-4">
        {contentHeight !== undefined ? (
          <Skeleton height={contentHeight} width="100%" borderRadius="md" />
        ) : (
          <SkeletonText lines={rows} />
        )}
      </div>
    </div>
  );
}
