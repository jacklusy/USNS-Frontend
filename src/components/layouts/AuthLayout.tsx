import { AUTH_BRAND_TAGLINE } from "@/constants/auth.constants";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const year = new Date().getFullYear();

  return (
    <div className="flex min-h-full flex-1 flex-col lg:flex-row">
      <aside
        aria-hidden="true"
        className="relative flex min-h-[25vh] flex-col justify-between overflow-hidden bg-usns-green-dark p-6 lg:min-h-full lg:w-[45%] lg:p-10"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-1/4 top-1/4 h-64 w-64 rounded-full bg-usns-green-light/15 blur-3xl" />
          <div className="absolute -right-1/4 bottom-1/4 h-48 w-48 rounded-full bg-usns-accent-bg/15 blur-3xl" />
        </div>
        <div className="relative z-10">
          <span className="text-lg font-semibold text-white">USNS</span>
        </div>
        <p className="relative z-10 max-w-[18ch] text-[36px] font-semibold leading-[1.1] tracking-[-0.015em] text-white lg:text-[56px] lg:leading-[1.05]">
          {AUTH_BRAND_TAGLINE}
        </p>
        <p className="relative z-10 text-[13px] text-white/60">
          © USNS {year}
        </p>
      </aside>
      <div className="flex flex-1 flex-col bg-surface">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <main
          id="main"
          className="flex flex-1 flex-col px-6 py-10 lg:w-full lg:px-16"
        >
          <div className="mx-auto w-full max-w-[420px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
