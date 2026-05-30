# USNS Design System — Implementation Examples

Tailwind v4 + Next.js App Router snippets. All examples use semantic tokens from [tokens-reference.md](tokens-reference.md).

---

## Button Variants

```tsx
// Primary (brand)
<button
  type="button"
  className="inline-flex h-11 min-w-[120px] items-center justify-center gap-2 rounded-md bg-brand px-5 text-[15px] font-medium text-white transition-colors hover:bg-usns-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
>
  Save changes
</button>

// Secondary (outline)
<button
  type="button"
  className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-brand bg-surface px-5 text-[15px] font-medium text-brand transition-colors hover:bg-usns-green-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
>
  Cancel
</button>

// Ghost
<button
  type="button"
  className="inline-flex h-11 items-center justify-center gap-2 rounded-md px-5 text-[15px] font-medium text-foreground transition-colors hover:border hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
>
  Learn more
</button>

// Loading state (preserve width)
<button
  type="button"
  disabled
  className="inline-flex h-11 min-w-[120px] items-center justify-center rounded-md bg-brand px-5 text-white disabled:opacity-80"
  aria-busy="true"
>
  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
  <span className="sr-only">Saving…</span>
</button>

// Destructive
<button
  type="button"
  className="inline-flex h-11 items-center justify-center rounded-md bg-danger px-5 text-[15px] font-medium text-white hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger focus-visible:ring-offset-2"
>
  Delete account
</button>
```

---

## Form Input with Error

```tsx
<div className="flex flex-col gap-1.5">
  <label htmlFor="email" className="text-[13px] font-medium text-foreground">
    Email address
  </label>
  <input
    id="email"
    type="email"
    aria-invalid="true"
    aria-describedby="email-error"
    className="h-11 w-full rounded-md border border-danger bg-surface px-3 text-[16px] text-foreground transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 md:text-[15px]"
  />
  <p id="email-error" className="flex items-center gap-1.5 text-[13px] text-danger" role="alert">
    {/* Lucide AlertCircle icon here */}
    Enter a valid email address.
  </p>
</div>
```

---

## Card with Hover Elevation

```tsx
<article className="rounded-lg border border-border bg-surface-elevated p-5 shadow-[0_1px_2px_rgba(15,31,24,0.04),0_1px_1px_rgba(15,31,24,0.03)] transition-shadow duration-[120ms] hover:shadow-[0_4px_12px_rgba(15,31,24,0.06),0_2px_4px_rgba(15,31,24,0.04)] md:p-6">
  <h3 className="text-lg font-semibold tracking-tight text-foreground">Monthly reports</h3>
  <p className="mt-1 text-[13px] leading-5 text-muted-fg">
    View and export your monthly activity summaries.
  </p>
</article>
```

---

## Toast Notification

```tsx
<div
  role="status"
  aria-live="polite"
  className="fixed bottom-6 right-6 z-50 flex max-w-sm items-start gap-3 rounded-lg border border-border bg-surface-elevated p-4 shadow-[0_10px_30px_rgba(15,31,24,0.10),0_4px_10px_rgba(15,31,24,0.06)] max-md:bottom-auto max-md:top-4 max-md:left-1/2 max-md:right-auto max-md:-translate-x-1/2"
>
  <div className="h-full w-1 shrink-0 self-stretch rounded-full bg-success" aria-hidden="true" />
  <div>
    <p className="text-[15px] font-medium text-foreground">Changes saved</p>
    <p className="mt-0.5 text-[13px] text-muted-fg">Your profile was updated successfully.</p>
  </div>
  <button type="button" aria-label="Dismiss" className="ml-auto text-muted-fg hover:text-foreground">
    ×
  </button>
</div>
```

---

## Auth Split Layout Skeleton

```tsx
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col lg:flex-row">
      {/* Brand panel — decorative */}
      <aside
        aria-hidden="true"
        className="relative flex min-h-[25vh] flex-col justify-between overflow-hidden bg-usns-green-dark p-6 lg:min-h-full lg:w-[45%] lg:p-10"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-1/4 top-1/4 h-64 w-64 rounded-full bg-usns-green-light/15 blur-3xl" />
          <div className="absolute -right-1/4 bottom-1/4 h-48 w-48 rounded-full bg-usns-accent-bg/15 blur-3xl" />
        </div>
        <div className="relative z-10">
          {/* USNS logo */}
          <span className="text-lg font-semibold text-white">USNS</span>
        </div>
        <p className="relative z-10 max-w-[18ch] text-4xl font-semibold leading-tight tracking-tight text-white lg:text-[56px] lg:leading-[1.05]">
          Your tagline here.
        </p>
        <p className="relative z-10 text-[13px] text-white/60">© USNS {new Date().getFullYear()}</p>
      </aside>

      {/* Form panel */}
      <main className="flex flex-1 flex-col bg-surface px-6 py-10 lg:w-[55%] lg:px-16">
        <div className="mx-auto w-full max-w-[420px]">{children}</div>
      </main>
    </div>
  );
}
```

---

## Empty State

```tsx
<div className="flex flex-col items-center justify-center px-6 py-16 text-center">
  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-usns-green-light text-brand">
    {/* Lucide Inbox icon, 24px */}
  </div>
  <h3 className="mt-4 text-lg font-semibold text-foreground">No items yet</h3>
  <p className="mt-1 max-w-sm text-[13px] leading-5 text-muted-fg">
    Create your first item to get started. Items you add will appear here.
  </p>
  <button
    type="button"
    className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-brand px-5 text-[15px] font-medium text-white hover:bg-usns-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
  >
    Create item
  </button>
</div>
```

---

## Loading Skeleton

```tsx
<div className="animate-pulse space-y-4" aria-busy="true" aria-label="Loading content">
  <div className="h-4 w-1/3 rounded-md bg-border" />
  <div className="h-32 rounded-lg bg-border" />
  <div className="space-y-2">
    <div className="h-3 w-full rounded-md bg-border" />
    <div className="h-3 w-5/6 rounded-md bg-border" />
    <div className="h-3 w-4/6 rounded-md bg-border" />
  </div>
</div>
```

---

## Page-Level Error

```tsx
<div className="flex flex-col items-center justify-center px-6 py-24 text-center" role="alert">
  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-danger/10 text-danger">
    {/* Lucide AlertCircle icon */}
  </div>
  <h2 className="mt-4 text-2xl font-semibold text-foreground">Something went wrong</h2>
  <p className="mt-2 max-w-md text-[15px] leading-6 text-muted-fg">
    We could not load this page. Check your connection and try again.
  </p>
  <button
    type="button"
    className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-brand px-5 text-[15px] font-medium text-white hover:bg-usns-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
  >
    Try again
  </button>
</div>
```

---

## Dashboard Metric Card

```tsx
<div className="rounded-lg border border-border bg-surface-elevated p-5">
  <p className="text-[12px] font-medium uppercase tracking-widest text-muted-fg">Total users</p>
  <p className="mt-2 font-mono text-3xl font-medium tabular-nums text-foreground">12,847</p>
  <p className="mt-1 flex items-center gap-1 text-[13px] text-success">
    {/* Lucide TrendingUp icon, 16px */}
    <span>+12.5% from last month</span>
  </p>
</div>
```

---

## Navigation Bar

```tsx
<header className="sticky top-0 z-40 border-b border-border bg-surface">
  <nav className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-4 md:px-8" aria-label="Main">
    <a href="/" className="text-lg font-semibold text-foreground">
      USNS
    </a>
    <ul className="hidden items-center gap-6 lg:flex">
      <li>
        <a
          href="/dashboard"
          className="border-b-2 border-brand pb-0.5 text-[15px] font-medium text-brand"
          aria-current="page"
        >
          Dashboard
        </a>
      </li>
      <li>
        <a
          href="/reports"
          className="text-[15px] text-muted-fg transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          Reports
        </a>
      </li>
    </ul>
    {/* Mobile: hamburger button with aria-expanded */}
  </nav>
</header>
```

---

## Skip Link

```tsx
<a
  href="#main"
  className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
>
  Skip to content
</a>
```

---

## Reduced Motion Fallback

```tsx
// CSS approach in globals.css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

When using Framer Motion:

```tsx
import { MotionConfig } from "framer-motion";

<MotionConfig reducedMotion="user">
  {/* animated children */}
</MotionConfig>
```

---

## Table Row

```tsx
<table className="w-full text-left">
  <thead className="sticky top-0 bg-surface-elevated">
    <tr className="border-b border-border">
      <th scope="col" className="px-4 py-3 text-[12px] font-medium uppercase tracking-widest text-muted-fg">
        Name
      </th>
      <th scope="col" className="px-4 py-3 text-[12px] font-medium uppercase tracking-widest text-muted-fg">
        Status
      </th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-border transition-colors hover:bg-usns-green-light/50">
      <td className="px-4 py-3 text-[15px] text-foreground">Jane Smith</td>
      <td className="px-4 py-3">
        <span className="inline-flex items-center gap-1.5 rounded-pill bg-usns-green-light px-2.5 py-0.5 text-[13px] font-medium text-brand">
          Active
        </span>
      </td>
    </tr>
  </tbody>
</table>
```
