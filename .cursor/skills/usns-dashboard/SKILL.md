---
name: usns-dashboard
description: >
  Senior Frontend Architect skill for the USNS Administration Dashboard — a Next.js (TypeScript) enterprise web application used by high-level roles such as Presidents, Deans, DBA users, and other administrative users. Use this skill for ANY code generation, component creation, page scaffolding, service layer work, hook writing, state management, form building, mock data creation, folder structure decisions, or architecture guidance related to the USNS dashboard. Trigger whenever the user asks to build, modify, refactor, scaffold, or review any part of the USNS admin dashboard, even if they don't explicitly say "USNS" — if the context is the administration dashboard project, always use this skill.
---

# USNS Administration Dashboard — Senior Frontend Architect Skill

## Project Context

- **Backend**: Laravel APIs (completed, integration later)
- **Mobile App**: React Native CLI (completed)
- **Current Focus**: Administration Dashboard in **Next.js (TypeScript)**
- **Phase**: Mock-data-driven development — no real API calls yet
- **Users**: Presidents, Deans, DBA users, administrative staff

---

## Non-Negotiable Rules

Before generating any code, internalize these rules. Violating any of them is unacceptable.

### No Comments

Code must be self-explanatory through naming. No inline comments, no JSDoc, no `//`, no `/* */`.

### Strict TypeScript

- Never use `any`
- Never use `@ts-ignore` or `@ts-nocheck`
- Every prop, return type, parameter, and data structure must be explicitly typed
- Create proper interfaces and types — no implicit inference where explicitness is needed
- Zero TypeScript warnings or errors allowed

### No Hardcoded Data in Components

All data — even static — comes from mock services or constants. Nothing hardcoded inline in JSX or component bodies.

### No Direct Fetch in Pages or Components

All API/mock communication goes through the service layer. Pages and components never call `fetch`, `axios`, or mock data directly.

---

## Folder Structure

```
src/
├── app/                    # Next.js App Router pages and layouts
├── components/
│   ├── ui/                 # Primitive UI components (Button, Input, Badge…)
│   ├── shared/             # Cross-feature reusable components
│   ├── layouts/            # Layout wrappers (DashboardLayout, AuthLayout…)
│   └── features/           # Feature-specific presentational components
├── modules/                # Feature modules (auth, users, dashboard, settings…)
│   └── [feature]/
│       ├── components/     # Feature-private components
│       ├── hooks/          # Feature-private hooks
│       ├── services/       # Feature service (calls api-client or mock)
│       ├── types/          # Feature-specific types
│       └── index.ts        # Public barrel export
├── services/
│   ├── api-client.ts       # Central HTTP client
│   ├── endpoints.ts        # All endpoint constants
│   └── [feature]/          # Feature service implementations
├── hooks/                  # Global/shared custom hooks
├── store/                  # Global state (Zustand or similar), modular slices
├── providers/              # React context providers
├── lib/                    # Third-party lib wrappers (e.g., axios instance)
├── types/                  # Global shared TypeScript types and interfaces
├── constants/              # App-wide constants (roles, statuses, routes…)
├── utils/                  # Pure utility functions
├── mock/
│   ├── auth/
│   ├── dashboard/
│   ├── users/
│   └── settings/
├── config/                 # App config (env variable accessors, feature flags)
└── styles/                 # Global styles, Tailwind base overrides
```

---

## Architecture Patterns

### Service Layer Pattern

Every feature has a service that abstracts data access. During mock phase, it returns mock data shaped exactly like the expected Laravel API response.

```
services/
├── api-client.ts        ← central Axios/fetch instance, interceptors, error handling
├── endpoints.ts         ← all URL constants as an object
└── [feature]/
    ├── [feature].service.ts       ← currently delegates to mock
    └── [feature].service.mock.ts  ← returns mock data
```

**api-client.ts** must:

- Hold the base URL from env
- Attach auth headers
- Handle 401 → token refresh
- Normalize error responses into a unified `ApiError` type

**endpoints.ts** must:

- Export a single `ENDPOINTS` object
- No raw URL strings anywhere else in the codebase

**Service interface rule**: Every feature service must export an interface (e.g., `IUserService`) that both the mock and real implementation satisfy. Swap is a one-line import change.

### Mock Data Strategy

```typescript
// mock/users/users.mock.ts
import type { UserListResponse } from "@/types/user.types";

export const mockUserListResponse: UserListResponse = {
  data: [...],
  meta: { total: 42, page: 1, per_page: 10, last_page: 5 },
};
```

- Mock data must match the Laravel API response envelope exactly
- Store in `mock/[feature]/[resource].mock.ts`
- Never import mock data inside components — only inside mock service implementations
- Simulate async behavior with a small artificial delay when needed

### Component Architecture

- **ui/**: no business logic, no service calls, no global state. Pure presentational primitives.
- **shared/**: may accept callbacks and typed props. No direct service calls.
- **features/**: calls hooks, not services directly. No service calls in JSX.
- **modules/[feature]/components/**: feature-coupled, may use feature hooks freely.

One responsibility per component. If a component has more than ~150 lines, it should be split.

### State Management

- Local state stays local (`useState`, `useReducer`)
- Server/async state: React Query (TanStack Query) — preferred for all data fetching hooks
- Global UI state (sidebar open, theme, active role): Zustand slice per domain
- No prop drilling beyond 2 levels — lift or use context/store

### Forms

- **Library**: React Hook Form + Zod
- Schema defined in `modules/[feature]/schemas/[form].schema.ts`
- Form component receives typed `defaultValues` and an `onSubmit` typed to the Zod output
- Validation errors displayed consistently via a shared `FormField` wrapper component
- No ad-hoc validation logic in components

---

## TypeScript Standards

### Response Envelope

All API responses (mock or real) must conform to:

```typescript
// types/api.types.ts
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface PaginationMeta {
  total: number;
  page: number;
  per_page: number;
  last_page: number;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status: number;
}
```

### Naming Conventions

| Artifact       | Convention                                              | Example                |
| -------------- | ------------------------------------------------------- | ---------------------- |
| Component file | PascalCase                                              | `UserTable.tsx`        |
| Hook file      | camelCase with `use` prefix                             | `useUserList.ts`       |
| Service file   | camelCase with `.service`                               | `user.service.ts`      |
| Type file      | camelCase with `.types`                                 | `user.types.ts`        |
| Mock file      | camelCase with `.mock`                                  | `users.mock.ts`        |
| Constants file | camelCase with `.constants`                             | `roles.constants.ts`   |
| Interface      | Prefixed with `I` (services) or no prefix (data shapes) | `IUserService`, `User` |
| Type alias     | PascalCase                                              | `UserRole`             |
| Enum           | PascalCase                                              | `UserStatus`           |
| Zustand slice  | camelCase with `Slice` suffix                           | `sidebarSlice.ts`      |

---

## Authentication Architecture

Prepare but do not implement real auth yet:

```
modules/auth/
├── components/      # Login form, etc.
├── hooks/
│   ├── useAuth.ts         # Exposes user, role, isAuthenticated
│   └── usePermissions.ts  # Role-based permission checks
├── services/
│   ├── auth.service.ts
│   └── auth.service.mock.ts
├── store/
│   └── auth.slice.ts      # Zustand: token, user, role
├── types/
│   └── auth.types.ts
└── guards/
    └── RouteGuard.tsx     # Wraps protected routes
```

- Token storage: abstracted behind `tokenStorage` utility (no direct `localStorage` calls in components)
- Role checks: always through `usePermissions` hook, never inline string comparisons
- `RouteGuard` wraps layout — not individual pages

---

## Error Handling

Unified error structure used everywhere:

```typescript
// types/error.types.ts
export type AppErrorCode =
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "NETWORK_ERROR"
  | "SERVER_ERROR";

export interface AppError {
  code: AppErrorCode;
  message: string;
  details?: Record<string, string[]>;
}
```

- API client maps all HTTP errors → `AppError` before throwing
- React Query `onError` handlers receive `AppError`
- UI shows errors via a shared `ErrorMessage` component or toast system
- No raw `try/catch` blocks in components — handle in hooks/services

---

## Environment Variables

All env access goes through `config/env.ts`:

```typescript
// config/env.ts
export const env = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "",
  isMockMode: process.env.NEXT_PUBLIC_MOCK_MODE === "true",
} as const;
```

Never access `process.env` directly outside `config/env.ts`.

---

## Performance Standards

- Use `next/dynamic` for heavy dashboard widgets and chart libraries
- Memoize with `useMemo` / `useCallback` only when profiling shows a benefit — not preemptively
- React Query handles caching and deduplication — do not re-fetch manually
- Images via `next/image`
- Fonts via `next/font`
- Minimize `"use client"` — prefer server components where no interactivity is needed

---

## Code Quality Checklist (apply before every output)

- [ ] No `any` types
- [ ] No comments
- [ ] No hardcoded data in components
- [ ] No direct fetch/axios in pages or components
- [ ] All mock data in `mock/` directory
- [ ] Service interface defined and used
- [ ] Folder placement follows structure above
- [ ] Naming conventions followed
- [ ] Forms use React Hook Form + Zod
- [ ] Error handling goes through `AppError`
- [ ] Env vars accessed via `config/env.ts`

---

## Reference Files

For detailed examples, see:

- `references/file-examples.md` — Canonical example implementations for service, hook, component, mock, and store patterns
