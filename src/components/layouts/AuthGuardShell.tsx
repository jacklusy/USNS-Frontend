import type { ReactNode } from "react";

interface AuthGuardShellProps {
  children?: ReactNode;
}

export function AuthGuardShell({ children }: AuthGuardShellProps) {
  return (
    <div
      className="flex min-h-[200px] flex-1 items-center justify-center"
      aria-busy="true"
      aria-label="Loading"
    >
      {children ?? (
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-brand" />
      )}
    </div>
  );
}
