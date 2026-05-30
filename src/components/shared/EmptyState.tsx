import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  children?: ReactNode;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  children,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
      <Icon
        className="h-12 w-12 text-muted-fg"
        strokeWidth={1.75}
        aria-hidden="true"
      />
      <h3 className="mt-4 text-[18px] font-semibold text-foreground">{title}</h3>
      <p className="mt-2 max-w-sm text-[13px] text-muted-fg">{description}</p>
      {actionLabel && onAction ? (
        <div className="mt-6">
          <Button type="button" variant="brand" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      ) : null}
      {children ? <div className="mt-4">{children}</div> : null}
    </div>
  );
}
