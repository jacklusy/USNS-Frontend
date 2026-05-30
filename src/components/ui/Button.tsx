import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "brand" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  brand:
    "bg-brand text-white hover:bg-usns-green-dark focus-visible:ring-accent",
  secondary:
    "border border-brand bg-surface text-brand hover:bg-usns-green-light focus-visible:ring-accent",
  ghost:
    "bg-transparent text-foreground hover:border hover:border-border focus-visible:ring-accent",
};

export function Button({
  variant = "brand",
  loading = false,
  disabled,
  className = "",
  children,
  type = "button",
  ...props
}: ButtonProps) {
  const isDisabled = disabled ?? loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={loading}
      className={`inline-flex h-11 min-w-[120px] items-center justify-center gap-2 rounded-md px-5 text-[15px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-[15px] ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-current/30 border-t-current"
            aria-hidden="true"
          />
          <span className="sr-only">Loading</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
