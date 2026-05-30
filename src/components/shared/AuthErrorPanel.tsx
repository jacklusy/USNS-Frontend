import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";

interface AuthErrorPanelProps {
  icon: LucideIcon;
  title: string;
  description: string;
  ctaLabel: string;
  onCtaClick: () => void;
  footer?: ReactNode;
}

export function AuthErrorPanel({
  icon: Icon,
  title,
  description,
  ctaLabel,
  onCtaClick,
  footer,
}: AuthErrorPanelProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <div
        className="flex h-14 w-14 items-center justify-center rounded-full bg-usns-green-light"
        aria-hidden="true"
      >
        <Icon className="h-7 w-7 text-brand" strokeWidth={1.75} />
      </div>
      <h2 className="mt-6 text-[24px] font-semibold leading-[1.2] tracking-[-0.01em] text-foreground md:text-[32px]">
        {title}
      </h2>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted-fg">
        {description}
      </p>
      <div className="mt-8">
        <Button type="button" onClick={onCtaClick}>
          {ctaLabel}
        </Button>
      </div>
      {footer ? <div className="mt-6">{footer}</div> : null}
    </div>
  );
}
